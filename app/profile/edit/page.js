
"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import useAuthRedirect from "@/hooks/useAuthRedirect"

const Page = () => {

  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [bio, setBio] = useState("")
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const { user, loading } = useAuthRedirect()

  const router = useRouter()

  
  const fetchProfile = async () => {
    const res = await fetch("/api/auth/session")
    const session = await res.json()

    if (!session?.user?.id) return

    const res2 = await fetch(`/api/profiles?profileId=${session.user.id}`)
    const data = await res2.json()

    setName(data.profile.name || "")
    setUsername(data.profile.username || "")
    setBio(data.profile.bio || "")
    setPreview(data.profile.profilepic || null)
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  
  const handleImageChange = (file) => {
    setImage(file)

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let imageBase64 = null

    if (image) {
      const reader = new FileReader()
      imageBase64 = await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result)
        reader.readAsDataURL(image)
      })
    }

    const res = await fetch("/api/editprofiles", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        username,
        bio,
        image: imageBase64
      })
    })

    const data = await res.json()

    alert(data.message)

    router.push("/me")
  }

  if (loading) {
    return (
      <p className="text-white text-center mt-10">
        Loading...
      </p>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-4 py-10">

      <div className="max-w-lg mx-auto">

        
        <div className="bg-[#1a1a1a] p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-800">

          <h2 className="text-2xl font-semibold text-center mb-6">
            Edit Profile
          </h2>

          
          <div className="flex flex-col items-center gap-3 mb-6">
            <img
              src={preview || "/default-avatar.png"}
              className="w-24 h-24 rounded-full object-cover border border-gray-700"
            />

            <label className="text-sm text-blue-400 cursor-pointer hover:underline">
              Change Photo
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleImageChange(e.target.files[0])}
              />
            </label>
          </div>

          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            
            <div>
              <label className="text-sm text-gray-400">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 bg-[#0f0f0f] px-4 py-2 rounded-lg outline-none border border-gray-700 focus:border-blue-500"
              />
            </div>

            
            <div>
              <label className="text-sm text-gray-400">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mt-1 bg-[#0f0f0f] px-4 py-2 rounded-lg outline-none border border-gray-700 focus:border-blue-500"
              />
            </div>

            
            <div>
              <label className="text-sm text-gray-400">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full mt-1 bg-[#0f0f0f] px-4 py-2 rounded-lg outline-none border border-gray-700 focus:border-blue-500 resize-none"
              />
            </div>

            
            <button
              type="submit"
              className="mt-2 bg-blue-500 hover:bg-blue-600 py-2.5 rounded-lg transition font-medium"
            >
              Save Changes
            </button>

          </form>

        </div>

      </div>

    </div>
  )
}

export default Page