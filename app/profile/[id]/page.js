  

  "use client"

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import PostCard from '@/components/PostCard'
import { Router } from 'next/router'
import useAuthRedirect from '@/hooks/useAuthRedirect'

const Page = () => {
  const { id } = useParams()

  const [profile, setProfile] = useState(null)
  const [followerdata, setFollowerdata] = useState(null)
  const [followingdata, setFollowingdata] = useState(null)
  const [post, setPost] = useState([])
  const [convodetail, setConvodetail] = useState()
  const router = useRouter(Router)
  const [follow, setFollow] = useState(false)
  const { user, loading } = useAuthRedirect()

  const fetchProfile = async () => {
    const res = await fetch(`/api/profiles?profileId=${id}`)
    const data = await res.json()
    setProfile(data.profile)
    setFollowerdata(data.followerDetails)
    setFollowingdata(data.followingDetails)
    setPost(data.postDetails)
  }

  const handleMessage = async () => {
    const res = await fetch("/api/conversations", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ profileId: id })
    })

    const data = await res.json()
    router.push(`/messages?conversationId=${data._id}`)
  }

  const handleFollow = async () => {
    const res = await fetch("/api/posts/follow", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ followingId: id })
    })

    const data = await res.json()
    setFollow(data.following)
  }

  const checkFollow = async () => {
    const res = await fetch(`/api/posts/follow?creatorId=${id}`)
    const data = await res.json()
    setFollow(data.following)
  }

  useEffect(() => {
    if (id) {
      fetchProfile()
      checkFollow()
    }
  }, [id])

  if (!profile) return <p className="text-center mt-10">Loading...</p>
  if (loading) {
    return (
      <p className="text-white text-center mt-10">
        Loading...
      </p>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">

        
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

          
          <img
            src={profile.profilepic || "/default-avatar.png"}
            alt="profile"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border border-gray-700"
          />

        
          <div className="flex flex-col gap-3 text-center sm:text-left">

            <h2 className="text-xl sm:text-2xl font-semibold">
              {profile.username}
            </h2>

            
            <div className="flex justify-center sm:justify-start gap-6 text-sm text-gray-300">
              <p><span className="font-semibold text-white">{followerdata.length}</span> followers</p>
              <p><span className="font-semibold text-white">{followingdata.length}</span> following</p>
            </div>

          
            <p className="text-sm text-gray-400 max-w-md">
              {profile.bio || "No bio yet"}
            </p>

            
            <div className="flex justify-center sm:justify-start gap-3 mt-2">

              {!follow ? (
                <button
                  className="bg-blue-500 hover:bg-blue-600 px-5 py-1.5 rounded-full text-sm transition"
                  onClick={handleFollow}
                >
                  Follow
                </button>
              ) : (
                <button
                  className="bg-gray-700 hover:bg-gray-600 px-5 py-1.5 rounded-full text-sm transition"
                  onClick={handleFollow}
                >
                  Following
                </button>
              )}

              <button
                className="border border-gray-600 hover:bg-gray-800 px-5 py-1.5 rounded-full text-sm transition"
                onClick={handleMessage}
              >
                Message
              </button>

            </div>

          </div>
        </div>

        
        <div className="border-t border-gray-800 my-8" />

        
        <div>

          <h3 className="text-lg font-semibold mb-4">Posts</h3>

          {post.length === 0 ? (
            <p className="text-gray-400">No posts yet</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {post.map(post => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  )
}

export default Page