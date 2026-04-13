

"use client"

import React, { useState, useEffect } from 'react'
import CommentReply from './CommentReply'

const Comments = ({ postId }) => {

  const [comments, setComments] = useState([])
  const [text, setText] = useState("")
  const [showReply, setShowReply] = useState(null)

  useEffect(() => {
    if (postId) fetchComments()
  }, [postId])

  const fetchComments = async () => {
    const res = await fetch(`/api/posts/comment?postId=${postId}`)
    const data = await res.json()
    setComments(data)
  }

  const addComments = async () => {
    if (!text.trim()) return

    await fetch("/api/posts/comment", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ postId, text })
    })

    setText("")
    fetchComments()
  }

  return (
    <div className="flex flex-col gap-3">

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e)=>setText(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 bg-[#0f0f0f] px-3 py-2 rounded-full text-sm outline-none"
        />
        <button
          onClick={addComments}
          className="bg-blue-500 px-3 py-1 rounded-full text-sm"
        >
          Post
        </button>
      </div>

      {/* Comments */}
      {comments.map(com => (
        <div key={com._id} className="text-sm">

          <p>
            <span className="font-semibold">{com.user.name}</span>{" "}
            <span className="text-gray-300">{com.text}</span>
          </p>

          <button
            onClick={() => setShowReply(prev => prev === com._id ? null : com._id)}
            className="text-xs text-gray-400"
          >
            Replies
          </button>

          {showReply === com._id && (
            <CommentReply commentId={com._id} postId={postId} />
          )}

        </div>
      ))}

    </div>
  )
}

export default Comments