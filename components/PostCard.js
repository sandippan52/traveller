

"use client"

import React, { useState, useEffect } from 'react'
import Comments from './Comments'
import Link from 'next/link'

const PostCard = ({ post }) => {

  const [likes, setLikes] = useState(post.likes || [])
  const [showComments, setShowComments] = useState(false)
  const [follow, setFollow] = useState(false)

  const handleLike = async () => {
    const res = await fetch("/api/posts/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId: post._id })
    })

    const data = await res.json()
    setLikes(data.likes)
  }

  const handleFollow = async () => {
    const res = await fetch("/api/posts/follow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ followingId: post.creator._id })
    })

    const data = await res.json()
    setFollow(data.following)
  }

  const checkFollow = async () => {
    const res = await fetch(`/api/posts/follow?creatorId=${post.creator._id}`)
    const data = await res.json()
    setFollow(data.following)
  }

  useEffect(() => {
    checkFollow()
  }, [])

  const joinGroup = async () => {
    const res = await fetch("/api/groups/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId: post._id,
        postCreator: post.creator
      })
    })

    const data = await res.json()
    alert(data.message)
  }

  return (
    <div className="bg-[#1a1a1a] rounded-2xl p-4 shadow-md">

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <Link href={`/profile/${post.creator._id}`}>
          <h3 className="font-semibold text-sm sm:text-base hover:underline">
            {post.creator?.username}
          </h3>
        </Link>

        {!follow && (
          <button
            onClick={handleFollow}
            className="text-xs bg-blue-500 px-3 py-1 rounded-full hover:bg-blue-600"
          >
            Follow
          </button>
        )}
      </div>

      {/* Content */}
      <p className="text-sm mb-3 text-gray-200">
        {post.content}
      </p>

      {/* Image */}
      {post.media?.length > 0 && (
        <img
          src={post.media[0]}
          className="w-full rounded-xl mb-3 object-cover max-h-[400px]"
        />
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 text-sm mb-2">

        <button onClick={handleLike}>
          ❤️ {likes.length}
        </button>

        <button onClick={() => setShowComments(!showComments)}>
          💬 Comment
        </button>

        {post.category === "group" && (
          <button
            onClick={joinGroup}
            className="text-blue-400"
          >
            Join Group
          </button>
        )}

      </div>

      {/* Comments */}
      {showComments && (
        <div className="mt-3 border-t border-gray-700 pt-3">
          <Comments postId={post._id} />
        </div>
      )}

    </div>
  )
}

export default PostCard