"use client"

import { useRouter, usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"

const LanguageSwitcher = () => {
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = (locale: string) => {
    // Get the current path without the locale
    const currentPathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/'
    const newPath = `/${locale}${currentPathWithoutLocale}`
    router.push(newPath)
  }

  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => switchLanguage('en')}
      >
        EN
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => switchLanguage('de')}
      >
        DE
      </Button>
    </div>
  )
}

export default LanguageSwitcher 