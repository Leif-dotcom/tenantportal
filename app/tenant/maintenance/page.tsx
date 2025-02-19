import Layout from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function MaintenanceHistory() {
  const maintenanceHistory = [
    { 
      date: "2023-06-15", 
      room: "Kitchen", 
      description: "Fixed leaky faucet",
      status: "Completed",
      priority: "Medium"
    },
    { 
      date: "2023-04-02", 
      room: "Living Room", 
      description: "Replaced air conditioning filter",
      status: "Completed",
      priority: "Low"
    },
    { 
      date: "2023-02-10", 
      room: "Living Room", 
      description: "Repaired broken window",
      status: "Completed",
      priority: "High"
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'in progress':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-orange-100 text-orange-800'
      case 'low':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Maintenance History</h1>
          <Button className="bg-blue-500 hover:bg-blue-600">
            New Request
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Recent Maintenance Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {maintenanceHistory.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-200 p-4 transition-all hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="font-medium text-gray-900">{item.description}</div>
                      <div className="text-sm text-gray-500">
                        {item.room} • {item.date}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </span>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

