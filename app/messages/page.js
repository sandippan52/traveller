"use client"

import { Suspense } from "react"
import MessagesComponent from "./MessagesComponent";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<p className="text-white text-center mt-10">Loading chat...</p>}>
      <MessagesComponent />
    </Suspense>
  )
}