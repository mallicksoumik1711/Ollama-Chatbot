const express = require('express')
const Chat = require('../models/Chat.js')
const Message = require('../models/Message.js')
const router = express.Router()

// Dynamic import for fetch - important to fetch all the chats and their related messages
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))

// Create a new chat
router.post('/new', async (req, res) => {
  try {
    const newChat = new Chat({ title: req.body.title || 'New Chat' })
    await newChat.save()
    res.status(201).json(newChat)
  } catch (err) {
    res.status(500).json({ error: 'Error creating chat' })
  }
})

// Send message with Ollama integration
router.post('/:chatId/message', async (req, res) => {
  const { chatId } = req.params
  const { content } = req.body

  if (!content || content.trim() === '') {
    return res.status(400).json({ error: 'Message content cannot be empty' })
  }

  try {
    const userMsg = new Message({ chatId, role: 'user', content })
    await userMsg.save()

    const chat = await Chat.findById(chatId)
    if (chat && chat.title === 'New Chat') {
      const summaryTitle = content.trim().split(' ').slice(0, 6).join(' ')
      chat.title = summaryTitle
      await chat.save()
    }

    const history = await Message.find({ chatId }).sort('createdAt')
    const ollamaMessages = history.map(msg => ({
      role: msg.role,
      content: msg.content,
    }))

    const response = await fetch('http://127.0.0.1:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gemma3:1b',
        messages: ollamaMessages,
        stream: false
      }),
    })

    const data = await response.json()

    let botReply = 'Sorry, I could not generate a response.'
    if (data && data.message && data.message.content) {
      botReply = data.message.content
      // console.log(botReply);
    } else {
      console.error('Ollama response was invalid:', data)
    }

    const botMsg = new Message({
      chatId,
      role: 'assistant',
      content: botReply,
    })
    await botMsg.save()

    res.json([userMsg, botMsg])
  } catch (err) {
    console.error('Error talking to Ollama:', err)
    res.status(500).json({ error: 'Message sending failed' })
  }
})

// Get chat history
router.get('/:chatId', async (req, res) => {
  try {
    const messages = await Message.find({ chatId: req.params.chatId }).sort('createdAt')
    res.json(messages)
  } catch (err) {
    res.status(500).json({ error: 'Failed to get messages' })
  }
})

// Get all chats
router.get('/', async (req, res) => {
  try {
    const chats = await Chat.find().sort({ createdAt: -1 })
    res.json(chats)
  } catch (err) {
    res.status(500).json({ error: 'Failed to get chats' })
  }
})

// Delete a chat and its messages
router.delete('/:chatId', async (req, res) => {
  try {
    const { chatId } = req.params
    await Message.deleteMany({ chatId })
    await Chat.findByIdAndDelete(chatId)
    res.json({ message: 'Chat deleted successfully' })
  } catch (err) {
    console.error('Failed to delete chat:', err)
    res.status(500).json({ error: 'Failed to delete chat' })
  }
})


module.exports = router
