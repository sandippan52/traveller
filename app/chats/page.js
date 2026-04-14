"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import useAuthRedirect from '@/hooks/useAuthRedirect'

const page = () => {

const [chats, setChats] = useState([])
const [currentuserId, setCurrentuserId] = useState('')
const { user, loading } = useAuthRedirect()


const fetchChats = async()=>{

const res = await fetch("/api/chats")

const data = await res.json()
console.log(data)

setChats(data.allChats)
setCurrentuserId(data.currUser)


}

useEffect(() => {
  fetchChats()

   const interval = setInterval(() => {
    fetchChats()
  }, 3000) 

  return () => clearInterval(interval)
}, [])

if (loading) {
    return (
      <p className="text-white text-center mt-10">
        Loading...
      </p>
    )
  }

  return (
   <div className="h-screen bg-[#0f0f0f] text-white flex">

    
    <div className="w-full max-w-md border-r border-gray-800 p-4 overflow-y-auto">

      
      <h1 className="text-2xl font-semibold mb-6">Messages</h1>

      
      <div className="flex flex-col gap-2">

        {chats?.length === 0 ? (
          <p className="text-gray-400 text-center mt-10">
            No messages yet
          </p>
        ) : (
          chats?.map((cht) => {

  const isGroup = cht.type === "group"

  const otherUser = !isGroup
    ? cht.members.find(m => m._id !== currentuserId)
    : null

  return (
    <div
      key={cht._id}
      onClick={() => router.push(`/messages?conversationId=${cht._id}`)}
      className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#1a1a1a] cursor-pointer transition"
    >

      
      {isGroup ? (
        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold">
          G
        </div>
      ) : (
        <img
          src={otherUser?.profilepic || "/default-avatar.png"}
          className="w-12 h-12 rounded-full object-cover"
        />
      )}

  
      <div className="flex flex-col flex-1">

        <div className="flex justify-between items-center">

          <h2 className="font-medium text-sm md:text-base">

            {isGroup
              ? cht.post?.destination?.to || "Group Chat"
              : otherUser?.username}

          </h2>

          <span className="text-xs text-gray-500">
            2m
          </span>
        </div>

        <p className="text-sm text-gray-400 truncate">

          {isGroup
            ? `Group • ${cht.members.length} members`
            : "Tap to open chat..."}

        </p>

      </div>

    </div>
  )
})
        )}

      </div>

    </div>

    
    <div className="hidden md:flex flex-1 items-center justify-center text-gray-500">
      Select a chat to start messaging
    </div>

  </div>
  )
}

export default page