
const BASE_URL = 'http://localhost:3000/api/chat'

export const createNewChat = async () => {
  const res = await fetch(`${BASE_URL}/new`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}) 
  })
  if (!res.ok) throw new Error('Failed to create chat')
  return res.json()
}

export const getAllChats = async () => {
  const res = await fetch(BASE_URL)
  if (!res.ok) throw new Error('Failed to fetch chats')
  return res.json()
}

export const getChatMessages = async (chatId) => {
  const res = await fetch(`${BASE_URL}/${chatId}`)
  if (!res.ok) throw new Error('Failed to get chat history')
  return res.json()
}

export const sendMessage = async (chatId, content) => {
  const res = await fetch(`${BASE_URL}/${chatId}/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  })
  if (!res.ok) throw new Error('Failed to send message')
  return res.json() 
}

export const deleteChat = async (chatId) => {
  const res = await fetch(`${BASE_URL}/${chatId}`, {
    method: 'DELETE'
  })
  if (!res.ok) throw new Error('Failed to delete chat')
  return res.json()
}
