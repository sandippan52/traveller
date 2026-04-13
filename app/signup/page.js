

"use client"

import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const Page = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const a = await fetch("/api/signup", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ name, username, email, password })
    })

    const data = await a.json()
    alert(data.message)

    router.push("/login")

    setName("")
    setEmail("")
    setPassword("")
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center px-4">

      {/* Card */}
      <div className="w-full max-w-md bg-[#1a1a1a] p-6 sm:p-8 rounded-2xl shadow-lg">

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">
          Create Account
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            value={name}
            placeholder="Full Name"
            onChange={(e)=>setName(e.target.value)}
            className="bg-[#0f0f0f] px-4 py-2 rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e)=>setUsername(e.target.value)}
            className="bg-[#0f0f0f] px-4 py-2 rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e)=>setEmail(e.target.value)}
            className="bg-[#0f0f0f] px-4 py-2 rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)}
            className="bg-[#0f0f0f] px-4 py-2 rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Button */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 transition py-2 rounded-full font-medium mt-2"
          >
            Sign Up
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => router.push("/login")}
          >
            Login
          </span>
        </p>

      </div>

    </div>
  )
}

export default Page