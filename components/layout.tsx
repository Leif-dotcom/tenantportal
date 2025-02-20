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
    </div>
  )
}

