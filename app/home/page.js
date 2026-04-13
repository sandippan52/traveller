

"use client"

import PostCard from '@/components/PostCard'
import React from 'react'
import { useEffect, useState } from 'react'
import useAuthRedirect from '@/hooks/useAuthRedirect' 

const page = () => {

const [posts, setPosts] = useState([])
const { user, loading } = useAuthRedirect()
 


useEffect(() => {
  fetchPosts()
}, [])

const fetchPosts = async()=>{

  const res = await fetch("api/posts/feed")

  const data = await res.json()

  console.log(data)

  setPosts(data.feedPosts)

}

if (loading) {
    return (
      <p className="text-white text-center mt-10">
        Loading...
      </p>
    )
  }


  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">

      
      <div className="max-w-2xl mx-auto px-3 sm:px-6 py-6">

        <h1 className="text-xl sm:text-2xl font-semibold mb-6">
          Home Feed
        </h1>

        <div className="flex flex-col gap-6">
          {posts?.map(post => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>

      </div>

    </div>
  )
}

export default page