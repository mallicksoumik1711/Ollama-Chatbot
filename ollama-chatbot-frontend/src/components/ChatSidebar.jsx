
import React, { useEffect, useState } from 'react'
import { createNewChat, getAllChats } from '../services/api'
import { useNavigate } from 'react-router-dom'

const ChatSidebar = () => {
    const [chats, setChats] = useState([])

    const navigate = useNavigate()

    const fetchChats = async () => {
        try {
            const data = await getAllChats()
            setChats(data)
        } catch (err) {
            console.error('Failed to fetch chats', err)
        }
    }

    const handleNewChat = async () => {
        try {
            const newChat = await createNewChat()
            await fetchChats()
            if (newChat && newChat._id) {
                navigate(`/chat/${newChat._id}`)
            }
        } catch (error) {
            console.error('Failed to create chat:', error)
        }
    }

    useEffect(() => {
        fetchChats()
    }, [])

    return (
        <div className="w-1/4 bg-[#0f172a] p-4 text-white h-screen flex flex-col shadow-lg overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
            <button
                className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 px-4 rounded mb-4"
                onClick={handleNewChat}
            >
                New Chat
            </button>

            <ul className="space-y-2">
                {chats.map(chat => (
                    <li
                        key={chat._id}
                        className="p-3 bg-slate-700 rounded hover:bg-slate-600 cursor-pointer"
                        onClick={() => navigate(`/chat/${chat._id}`)}
                    >
                        {chat.title || 'Untitled Chat'}

                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ChatSidebar


