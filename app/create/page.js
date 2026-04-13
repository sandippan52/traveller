



"use client"

import React, { useState } from 'react'
import useAuthRedirect from '@/hooks/useAuthRedirect'

const Page = () => {

  const [category, setCategory] = useState("")
  const [content, setContent] = useState("")
  const [media, setMedia] = useState(null)
  const [preview, setPreview] = useState(null)
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const { user, loading } = useAuthRedirect()

  const postSubmit = async (e) => {
    e.preventDefault()

    let imageBase64 = null;
    if (media) {
      const reader = new FileReader()
      imageBase64 = await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result)
        reader.readAsDataURL(media)
      })
    }

    const res = await fetch("/api/posts/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category,
        content,
        image: imageBase64,
        destination: { from, to }
      })
    })

    const data = await res.json()
    alert(data.message)

    setCategory("")
    setContent("")
    setMedia(null)
    setPreview(null)
    setFrom("")
    setTo("")
  }

  const handleImageChange = (file) => {
    setMedia(file)

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result)
      reader.readAsDataURL(file)
    }
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

      <div className="max-w-xl mx-auto">

        {/* 🔥 Card */}
        <div className="bg-[#1a1a1a] p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-800">

          <h1 className="text-2xl font-semibold text-center mb-6">
            Create Post
          </h1>

          <form onSubmit={postSubmit} className="flex flex-col gap-6">

            {/* Post Type */}
            <div>
              <label className="text-sm text-gray-400">Post Type</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full mt-1 bg-[#0f0f0f] px-4 py-2 rounded-lg border border-gray-700 outline-none focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="individual">Individual</option>
                <option value="group">Group Travel</option>
              </select>
            </div>

            {/* Content */}
            <div>
              <label className="text-sm text-gray-400">Content</label>
              <textarea
                placeholder="Share your thoughts or trip plan..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                className="w-full mt-1 bg-[#0f0f0f] px-4 py-3 rounded-xl border border-gray-700 outline-none focus:border-blue-500 resize-none"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="text-sm text-gray-400">Upload Image</label>

              <div className="mt-2 flex flex-col items-center gap-3">

                {preview && (
                  <img
                    src={preview}
                    className="w-full max-h-60 object-cover rounded-xl border border-gray-700"
                  />
                )}

                <label className="text-sm text-blue-400 cursor-pointer hover:underline">
                  {preview ? "Change Image" : "Upload Image"}
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleImageChange(e.target.files[0])}
                  />
                </label>

              </div>
            </div>

            {/* Destination */}
            <div>
              <label className="text-sm text-gray-400">Destination</label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">

                <input
                  type="text"
                  placeholder="From"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="bg-[#0f0f0f] px-4 py-2 rounded-lg border border-gray-700 outline-none focus:border-blue-500"
                />

                <input
                  type="text"
                  placeholder="To"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="bg-[#0f0f0f] px-4 py-2 rounded-lg border border-gray-700 outline-none focus:border-blue-500"
                />

              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 transition py-3 rounded-xl font-medium mt-2"
            >
              Create Post
            </button>

          </form>

        </div>

      </div>

    </div>
  )
}

export default Page