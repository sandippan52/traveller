

"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/home"
    })
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center px-4">

      {/* Card */}
      <div className="w-full max-w-md bg-[#1a1a1a] p-6 sm:p-8 rounded-2xl shadow-lg">

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">
          Welcome Back
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e)=>setEmail(e.target.value)}
            className="bg-[#0f0f0f] px-4 py-2 rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)}
            className="bg-[#0f0f0f] px-4 py-2 rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Button */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 transition py-2 rounded-full font-medium mt-2"
          >
            Sign In
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => router.push("/signup")}
          >
            Sign up
          </span>
        </p>

      </div>

    </div>
  )
}
