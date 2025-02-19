import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold text-center text-gray-900">Choose your role</h1>
        <div className="space-y-4">
          <Link href="/tenant" className="block">
            <Button variant="outline" className="w-full py-6 text-lg">Tenant</Button>
          </Link>
          <Link href="/landlord" className="block">
            <Button variant="outline" className="w-full py-6 text-lg">Landlord</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

