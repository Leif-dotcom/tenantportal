"use client"

import { useState } from "react"
import Layout from "@/components/layout"

export default function ContactLandlord() {
  const [messages, setMessages] = useState<string[]>([])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, newMessage])
      setNewMessage("")
    }
  }

  return (
    <Layout>
      <h1 className="mb-8 text-3xl font-bold text-gray-800">Contact Landlord</h1>
      <div className="mb-4 h-96 overflow-y-auto rounded-lg bg-white p-4 shadow">
        {messages.map((message, index) => (
          <div key={index} className="mb-2 rounded-lg bg-blue-100 p-3 text-blue-800">
            {message}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow rounded-l-lg border p-3 text-lg"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="rounded-r-lg bg-blue-500 px-6 py-3 text-lg text-white transition-colors hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </Layout>
  )
}

