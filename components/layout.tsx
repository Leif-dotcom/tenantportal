"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-100 p-8 relative">
      <div className="mx-auto max-w-4xl">
        {children}
      </div>
      <div className="fixed bottom-6 left-6">
        <Button 
          variant="ghost" 
          className="text-blue-500 hover:text-blue-600 hover:bg-blue-50"
          onClick={() => router.back()}
        >
          ← Back
        </Button>
      </div>
    </div>
  )
}

