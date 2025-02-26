"use client"

import { useState } from "react"
import Link from "next/link"
import { getDictionary } from "@/utils/i18n"

export default function ContactLandlord({
  params: { lang }
}: {
  params: { lang: string }
}) {
  const [messages, setMessages] = useState<string[]>([])
  const [newMessage, setNewMessage] = useState("")
  const dictionary = getDictionary(lang)

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, newMessage])
      setNewMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href={`/${lang}/tenant`} className="text-blue-600 hover:underline">
              {dictionary.common.backToDashboard}
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">{dictionary.tenant.contactLandlord}</h1>
        </div>
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
            placeholder={dictionary.common.typeMessage}
          />
          <button
            onClick={handleSendMessage}
            className="rounded-r-lg bg-blue-500 px-6 py-3 text-lg text-white transition-colors hover:bg-blue-600"
          >
            {dictionary.common.send}
          </button>
        </div>
      </div>
    </div>
  )
}

