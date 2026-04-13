
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const useAuthRedirect = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/session")
        const data = await res.json()

        if (!data?.user) {
          router.push("/login")
        } else {
          setUser(data.user)
        }
      } catch (err) {
        console.error("Auth error:", err)
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  return { user, loading }
}

export default useAuthRedirect