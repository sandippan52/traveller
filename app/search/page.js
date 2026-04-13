"use client"

import React, { useState } from "react"
import Link from "next/link"
import PostCard from "@/components/PostCard"
import useAuthRedirect from "@/hooks/useAuthRedirect"

const Page = () => {

  const [query, setQuery] = useState("")
  const [results, setResults] = useState({ posts: [], users: [] })
  const { user, loading } = useAuthRedirect()

  const handleSearch = async (e) => {
    const q = e.target.value
    setQuery(q)

    if (!q) return setResults({ posts: [], users: [] })

    const res = await fetch(`/api/search?q=${q}`)
    const data = await res.json()

    setResults(data)
  }
  if (loading) {
    return (
      <p className="text-white text-center mt-10">
        Loading...
      </p>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-4 py-6">

      <div className="max-w-2xl mx-auto">

        
        <input
          value={query}
          onChange={handleSearch}
          placeholder="Search users or trips..."
          className="w-full px-4 py-2 rounded-full bg-[#1a1a1a] outline-none mb-6"
        />

        
        {results.users.length > 0 && (
          <div>
            <h2 className="text-lg mb-2">Users</h2>

            {results.users.map(u => (
              <Link key={u._id} href={`/profile/${u._id}`}>
                <div className="p-3 bg-[#1a1a1a] rounded-xl mb-2 hover:bg-[#222]">
                  {u.username}
                </div>
              </Link>
            ))}
          </div>
        )}

      
       {results.posts.length > 0 && (
  <div className="mt-6 flex flex-col gap-4">
    <h2 className="text-lg mb-2">Trips</h2>

   {results.posts.map(post => (
  <PostCard key={post._id} post={post} />
))}
  </div>
)}

      </div>
    </div>
  )
}

export default Page