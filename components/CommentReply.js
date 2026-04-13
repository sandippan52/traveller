

"use client"

import React, { useState, useEffect } from 'react'

const CommentReply = ({ commentId, postId }) => {

  const [replyText, setReplyText] = useState("")
  const [replies, setReplies] = useState([])

  useEffect(() => {
    fetchReplies()
  }, [])

  const fetchReplies = async () => {
    const res = await fetch(`/api/posts/commentreplies?commentId=${commentId}`)
    const data = await res.json()
    setReplies(data)
  }

  const addReply = async () => {
    if (!replyText.trim()) return

    await fetch("/api/posts/commentreplies", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ commentId, postId, replyText })
    })

    setReplyText("")
    fetchReplies()
  }

  return (
    <div className="ml-4 mt-2 flex flex-col gap-2">

      {replies.map(rep => (
        <p key={rep._id} className="text-sm text-gray-300">
          <span className="font-semibold">{rep.user.name}</span>{" "}
          {rep.text}
        </p>
      ))}

      <div className="flex gap-2">
        <input
          value={replyText}
          onChange={(e)=>setReplyText(e.target.value)}
          placeholder="Reply..."
          className="flex-1 bg-[#0f0f0f] px-3 py-1 rounded-full text-sm"
        />
        <button
          onClick={addReply}
          className="text-xs text-blue-400"
        >
          Reply
        </button>
      </div>

    </div>
  )
}

export default CommentReply