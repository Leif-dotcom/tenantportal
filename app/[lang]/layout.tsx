import '../globals.css'
import HtmlLangSetter from '@/components/HtmlLangSetter'

export const metadata = {
  title: 'Tenant Portal',
  description: 'A portal for landlords and tenants',
}

export default function LocaleLayout({
  children,
  params: { lang }
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <>
      <HtmlLangSetter lang={lang} />
      <div className="min-h-screen">
        {children}
      </div>
    </>
  )
} 