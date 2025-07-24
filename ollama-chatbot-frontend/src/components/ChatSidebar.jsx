
import React, { useEffect, useState } from 'react'
import { createNewChat, getAllChats, deleteChat } from '../services/api'
import { useNavigate } from 'react-router-dom'
import { Trash } from 'lucide-react'
import { useLocation } from 'react-router-dom'

const ChatSidebar = () => {
    const [chats, setChats] = useState([])

    const navigate = useNavigate()

    // Inside ChatSidebar component:
    const location = useLocation()

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
        <div className="w-1/4 bg-[#0f172a] p-4 text-white h-screen flex flex-col overflow-y-auto sidebar-scroll relative z-10 shadow-[8px_0_16px_-4px_rgba(0,0,0,0.5)]">
            <button
                className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 px-4 rounded mb-4"
                onClick={handleNewChat}
            >
                New Chat
            </button>

            {/* <ul className="space-y-2">
                {chats.map(chat => (
                    <li
                        key={chat._id}
                        className="p-3 bg-slate-700 rounded hover:bg-slate-600 cursor-pointer"
                        onClick={() => navigate(`/chat/${chat._id}`)}
                    >
                        {chat.title || 'Untitled Chat'}

                    </li>
                ))}
            </ul> */}

            {/* delete cchat icon delete if wrong */}
            <ul className="space-y-2">
                {chats.map(chat => (
                    <li
                        key={chat._id}
                        className="p-3 bg-slate-700 rounded hover:bg-slate-600 flex justify-between items-center"
                    >
                        <span
                            className="cursor-pointer flex-1"
                            onClick={() => navigate(`/chat/${chat._id}`)}
                        >
                            {chat.title || 'Untitled Chat'}
                        </span>
                        {/* <button
                            className="ml-2 text-red-400 hover:text-red-600"
                            onClick={async (e) => {
                                e.stopPropagation()
                                try {
                                    await deleteChat(chat._id)
                                    fetchChats()
                                } catch (err) {
                                    console.error('Failed to delete chat:', err)
                                }
                            }}
                            title="Delete Chat"
                        >
                            <Trash/>
                        </button> */}
                        <button
                            className="ml-2"
                            onClick={async (e) => {
                                e.stopPropagation()
                                try {
                                    await deleteChat(chat._id)
                                    await fetchChats()

                                    // If the current chat is deleted, redirect to homepage
                                    if (location.pathname === `/chat/${chat._id}`) {
                                        navigate('/')
                                    }
                                } catch (err) {
                                    console.error('Failed to delete chat:', err)
                                }
                            }}
                            title="Delete Chat"
                        >
                            <Trash className='w-4 h-4 text-slate-400 hover:text-slate-200' />
                        </button>
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default ChatSidebar


