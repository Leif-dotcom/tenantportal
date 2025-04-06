import Link from "next/link"
import { Button } from "@/components/ui/button"
import LanguageSwitcher from "@/components/LanguageSwitcher"
import { getDictionary } from "@/utils/i18n"

export default function LoginPage({
  params: { lang }
}: {
  params: { lang: string }
}) {
  const dictionary = getDictionary(lang)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold text-center text-gray-900">
          {dictionary.roles.chooseRole}
        </h1>
        <div className="space-y-4">
          <Link href={`/${lang}/tenant`} className="block">
            <Button variant="outline" className="w-full py-6 text-lg">
              {dictionary.roles.tenant}
            </Button>
          </Link>
          <Link href={`/${lang}/landlord`} className="block">
            <Button variant="outline" className="w-full py-6 text-lg">
              {dictionary.roles.landlord}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 