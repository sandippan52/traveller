


"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import useAuthRedirect from '@/hooks/useAuthRedirect'

const Page = () => {

  const [notification, setNotification] = useState([])
  const { user, loading } = useAuthRedirect()

  const fetchNotication = async () => {
    const res = await fetch("/api/notifications/accept")
    const data = await res.json()
    // setNotification(data)
    if (Array.isArray(data)) {
    setNotification(data)
  } else {
    setNotification([]) 
    // console.error("Expected array, got:", data)
  }
  }

  useEffect(() => {
    fetchNotication()
  }, [])

  const handleAccept = async (requestId) => {
    const res = await fetch(`/api/notifications/accept?requestId=${requestId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
    const data = await res.json()
    alert(data.message)
    fetchNotication()
  }

  const handleReject = async (requestId) => {
    const res = await fetch(`/api/notifications/reject?requestId=${requestId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
    const data = await res.json()
    alert(data.message)
    fetchNotication()
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

      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">

        
        <h1 className="text-xl sm:text-2xl font-semibold mb-6">
          Notifications
        </h1>

        
        {notification?.length === 0 ? (
          <p className="text-gray-400 text-center mt-10">
            No notifications yet
          </p>
        ) : (

          <div className="flex flex-col gap-4">

            {notification?.map((n) => (

              <div
                key={n._id}
                className="bg-[#1a1a1a] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-md"
              >

                
                <div className="flex items-center gap-3">

                  
                  <img
                    src={n.sender?.profilepic || "/default-avatar.png"}
                    alt="profile"
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  
                  <div className="flex flex-col">
              <Link href={`/profile/${n.sender._id}`}>
                    <h2 className="font-medium text-sm sm:text-base">
                      {n.sender.username}
                    </h2></Link>

                    <p className="text-sm text-gray-400">
                      requested to join your group
                    </p>

                  </div>

                </div>

                {/* Actions */}
                <div className="flex gap-2 sm:gap-3">

                  <button
                    onClick={() => handleAccept(n.request._id)}
                    className="bg-green-500 hover:bg-green-600 px-4 py-1.5 rounded-full text-sm transition"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handleReject(n.request._id)}
                    className="bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded-full text-sm transition"
                  >
                    Reject
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </div>
  )
}

export default Page