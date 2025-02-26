import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { getDictionary } from "@/utils/i18n"

function getThirdWorkingDay(year: number, month: number) {
  let date = new Date(year, month, 1)
  let workingDays = 0
  
  while (workingDays < 3) {
    // Skip weekends (0 is Sunday, 6 is Saturday)
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      workingDays++
    }
    if (workingDays < 3) {
      date.setDate(date.getDate() + 1)
    }
  }
  
  return date
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

function formatMonth(date: Date) {
  return date.toLocaleString('en-GB', { month: 'long', year: 'numeric' });
}

export default function CurrentRent({
  params: { lang }
}: {
  params: { lang: string }
}) {
  const currentRent = 1000 // Example rent amount
  const today = new Date()
  const dictionary = getDictionary(lang)
  
  // Calculate current and next month's due dates
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()
  
  const currentMonthDueDate = getThirdWorkingDay(currentYear, currentMonth)
  const currentMonthStart = new Date(currentYear, currentMonth, 1)
  
  // If we've passed this month's due date, show next month
  const isAfterDueDate = today > currentMonthDueDate
  
  const targetMonth = isAfterDueDate ? currentMonth + 1 : currentMonth
  const targetYear = currentYear + (targetMonth > 11 ? 1 : 0)
  const normalizedTargetMonth = targetMonth > 11 ? 0 : targetMonth
  
  const targetMonthStart = new Date(targetYear, normalizedTargetMonth, 1)
  const targetDueDate = getThirdWorkingDay(targetYear, normalizedTargetMonth)
  
  // Calculate days remaining
  const daysRemaining = Math.ceil((targetDueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  
  const paymentDetails = {
    dueDay: formatDate(targetDueDate),
    rentMonth: formatMonth(targetDueDate),
    bankName: "Deutsche Bank",
    iban: "DE89 3704 0044 0532 0130 00",
    bic: "DEUTDEBBXXX",
    reference: "Rent-A1234-Smith",
    currentDate: formatDate(today),
    nextMonthStart: formatDate(targetMonthStart)
  }

  const paymentHistory = [
    { date: "2023-05-01", amount: 1000, status: dictionary.tenant.paid },
    { date: "2023-04-01", amount: 1000, status: dictionary.tenant.paid },
    { date: "2023-03-01", amount: 1000, status: dictionary.tenant.paid },
  ]

  // Calculate progress percentage
  const totalDuration = targetDueDate.getTime() - currentMonthStart.getTime()
  const elapsedDuration = today.getTime() - currentMonthStart.getTime()
  const progressPercentage = Math.max(0, Math.min(100, (elapsedDuration / totalDuration) * 100))

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href={`/${lang}/tenant`} className="text-blue-600 hover:underline">
              {dictionary.common.backToDashboard}
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">{dictionary.tenant.rentOverview}</h1>
        </div>

        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-sm font-medium text-gray-500">{dictionary.tenant.paymentDetails}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-3xl font-bold text-gray-900">€{currentRent}</span>
                      <span className="text-sm text-gray-500">{dictionary.tenant.perMonth}</span>
                    </div>
                  </div>
                  <div className="space-y-2 rounded-lg bg-gray-50 p-3 text-sm">
                    <div className="space-y-1">
                      <div className="text-gray-500">{dictionary.tenant.bankDetails}</div>
                      <div className="font-medium">{paymentDetails.bankName}</div>
                      <div className="font-mono text-gray-600">IBAN: {paymentDetails.iban}</div>
                      <div className="font-mono text-gray-600">BIC: {paymentDetails.bic}</div>
                    </div>
                    <div className="space-y-1 pt-2">
                      <div className="text-gray-500">{dictionary.tenant.paymentReference}</div>
                      <div className="font-mono font-medium">{paymentDetails.reference}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-sm font-medium text-gray-500">{dictionary.tenant.nextPayment}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-between">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-500">{dictionary.tenant.paymentFor}</div>
                        <div className="text-lg font-semibold text-gray-900">{paymentDetails.rentMonth}</div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-sm text-gray-500">{dictionary.tenant.dueDate}</div>
                        <div className="text-lg font-semibold text-gray-900">{paymentDetails.dueDay}</div>
                      </div>
                    </div>
                    <div className="pt-2">
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-gray-900">{daysRemaining}</span>
                        <span className="ml-2 text-sm text-gray-500">{dictionary.tenant.daysRemaining}</span>
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        {dictionary.tenant.today} {paymentDetails.currentDate}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div 
                        className="h-2 rounded-full bg-blue-500" 
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{dictionary.tenant.periodStart} {formatDate(currentMonthStart)}</span>
                      <span>{dictionary.tenant.due} {paymentDetails.dueDay}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">{dictionary.tenant.paymentHistory}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-gray-200">
                <div className="grid grid-cols-3 gap-4 border-b border-gray-200 bg-gray-50 p-4 text-sm font-medium text-gray-500">
                  <div>{dictionary.tenant.date}</div>
                  <div>{dictionary.tenant.amount}</div>
                  <div>{dictionary.tenant.status}</div>
                </div>
                {paymentHistory.map((payment, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 gap-4 p-4 text-sm text-gray-900 transition-colors hover:bg-gray-50"
                  >
                    <div>{payment.date}</div>
                    <div>€{payment.amount}</div>
                    <div>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        {dictionary.tenant.paid}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

