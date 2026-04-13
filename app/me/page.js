"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PostCard from '@/components/PostCard'
import { signOut } from 'next-auth/react'
import useAuthRedirect from '@/hooks/useAuthRedirect'
const Page = () => {

  const [profile, setProfile] = useState(null)
  const [followerdata, setFollowerdata] = useState([])
  const [followingdata, setFollowingdata] = useState([])
  const [post, setPost] = useState([])
  const { user, loading } = useAuthRedirect()

  const router = useRouter()

  const fetchMyProfile = async () => {
    const res = await fetch("/api/auth/session")
    const session = await res.json()

    if (!session?.user?.id) return

    const profileId = session.user.id

    const res2 = await fetch(`/api/profiles?profileId=${profileId}`)
    const data = await res2.json()

    setProfile(data.profile)
    setFollowerdata(data.followerDetails)
    setFollowingdata(data.followingDetails)
    setPost(data.postDetails)
  }

  useEffect(() => {
    fetchMyProfile()
  }, [])

  if (!profile) return <p className="text-center mt-10 text-white">Loading...</p>
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

            
            <div className="flex justify-center sm:justify-start mt-2">
              <button
                onClick={() => router.push("/profile/edit")}
                className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-full text-sm transition"
              >
                Edit Profile
              </button>
              <button
  onClick={() => signOut({ callbackUrl: "/login" })}
  className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-full text-sm transition"
>
  Logout
</button>
             
            </div>

          </div>
        </div>

        
        <div className="border-t border-gray-800 my-8" />

        
        <div>

          <h3 className="text-lg font-semibold mb-4">Your Posts</h3>

          {post.length === 0 ? (
            <p className="text-gray-400">You haven’t posted anything yet</p>
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