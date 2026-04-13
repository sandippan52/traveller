"use client"

export const dynamic = "force-dynamic";

import React, { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { pusherClient } from '@/lib/pusherClient'
import useAuthRedirect from '@/hooks/useAuthRedirect'

const Page = () => {

  const searchParams = useSearchParams()
  const conversationId = searchParams.get("conversationId")

  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")
  const [currentUserId, setCurrentUserId] = useState("")
  const { user, loading } = useAuthRedirect()

  const bottomRef = useRef(null)


  const fetchUser = async () => {
    const res = await fetch("/api/auth/session")
    const data = await res.json()
    setCurrentUserId(data?.user?.id)
  }

  const fetchMessages = async () => {
    const res = await fetch(`/api/messages?conversationId=${conversationId}`)
    const data = await res?.json()
    setMessages(data)
  }

  

  const sendMessage = async () => {
  if (!text.trim()) return

  await fetch("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      conversationId,
      text
    })
  })

  setText("")
}

  useEffect(() => {
    if (conversationId) {
      fetchMessages()
      fetchUser()
    }
  }, [conversationId])

  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])



useEffect(() => {
  if (!conversationId || !pusherClient) return;

  const channel = pusherClient.subscribe(`chat-${conversationId}`);

  channel.bind("new-message", (newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  });

  return () => {
    pusherClient.unsubscribe(`chat-${conversationId}`);
  };
}, [conversationId]);

if (loading) {
    return (
      <p className="text-white text-center mt-10">
        Loading...
      </p>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-[#0f0f0f] text-white">

      
      <div className="p-4 border-b border-gray-800">
        <h2 className="font-semibold text-lg">Chat</h2>
      </div>

      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">

        {messages.length === 0 ? (
          <p className="text-gray-400 text-center mt-10">
            No messages yet
          </p>
        ) : (
          messages.map((msg) => {

            const isMe = msg.sender._id === currentUserId

            return (
              <div
                key={msg._id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >

                <div
                  className={`
                    max-w-xs px-4 py-2 rounded-2xl text-sm
                    ${isMe 
                      ? "bg-blue-500 text-white rounded-br-none" 
                      : "bg-gray-800 text-gray-200 rounded-bl-none"}
                  `}
                >
                  {msg.text}
                </div>

              </div>
            )
          })
        )}

        <div ref={bottomRef} />

      </div>

    
      <div className="p-3 border-t border-gray-800 flex items-center gap-2">

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-[#1a1a1a] text-white px-4 py-2 rounded-full outline-none"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-500 px-4 py-2 rounded-full hover:bg-blue-600 transition"
        >
          Send
        </button>

      </div>

    </div>
  )
}

export default Page