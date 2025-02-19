import Layout from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function LeaseAgreement() {
  const leaseDetails = {
    startDate: "2023-01-01",
    endDate: "2024-01-01",
    monthlyRent: "€1,000",
    deposit: "€2,000",
    status: "Active"
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Lease Agreement</h1>
          <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
            {leaseDetails.status}
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-500">Lease Period</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Start Date</span>
                  <span className="font-medium">{leaseDetails.startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">End Date</span>
                  <span className="font-medium">{leaseDetails.endDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-500">Financial Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Monthly Rent</span>
                  <span className="font-medium">{leaseDetails.monthlyRent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Security Deposit</span>
                  <span className="font-medium">{leaseDetails.deposit}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-blue-100 p-2">
                  <svg
                    className="h-5 w-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Lease Agreement Document</h3>
                  <p className="text-sm text-gray-500">PDF • 2.4 MB</p>
                </div>
              </div>
              <Button variant="outline" className="text-blue-600 hover:text-blue-700">
                Download
              </Button>
            </div>

            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="mb-2 font-medium">Need to terminate your lease?</h3>
              <p className="mb-4 text-sm text-gray-500">
                Please note that early termination requires a 60-day notice period.
              </p>
              <Button variant="destructive" className="bg-red-500 hover:bg-red-600">
                Request Termination
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

