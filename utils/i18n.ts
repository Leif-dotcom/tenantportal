import enCommon from '@/public/locales/en/common.json'
import deCommon from '@/public/locales/de/common.json'

// This type allows us to type-check our translations access
type TranslationsType = typeof enCommon

const translations: Record<string, TranslationsType> = {
  en: enCommon,
  de: deCommon,
}

export function getDictionary(locale: string): TranslationsType {
  return translations[locale] || translations.en
} 