"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ErrorBoundary } from "@/components/error-boundary";
import { MaintenanceRequest } from "@/types";
import { formatDate, getStatusColor, getPriorityColor, formatStatus } from "@/utils/formatting";
import Link from "next/link";

const mockMaintenanceRequests: MaintenanceRequest[] = [
  {
    id: "1",
    date: "2024-02-15",
    room: "kitchen",
    description: "Dishwasher not draining properly",
    status: "new",
    priority: "medium"
  },
  {
    id: "2",
    date: "2024-02-10",
    room: "bathroom",
    description: "Leaky faucet in master bathroom",
    status: "in_progress",
    priority: "low"
  },
  {
    id: "3",
    date: "2024-01-15",
    room: "living_room",
    description: "Fixed broken window",
    status: "completed",
    priority: "high",
    completionDate: "2024-01-16",
    notes: ["Window replaced and sealed", "New locks installed"]
  }
];

export default function MaintenancePage() {
  const activeRequests = mockMaintenanceRequests.filter(
    request => request.status !== 'completed' && request.status !== 'cancelled'
  );
  const completedRequests = mockMaintenanceRequests.filter(
    request => request.status === 'completed' || request.status === 'cancelled'
  );

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <Link href="/tenant" className="text-blue-600 hover:underline">
                ← Back to Dashboard
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-800">Maintenance</h1>
              <Button>New Request</Button>
            </div>
          </div>

          <Tabs defaultValue="active" className="space-y-4">
            <TabsList>
              <TabsTrigger value="active">Active Requests</TabsTrigger>
              <TabsTrigger value="completed">Request History</TabsTrigger>
            </TabsList>

            <TabsContent value="active">
              <div className="space-y-4">
                {activeRequests.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-8 text-gray-500">
                      No active maintenance requests
                    </CardContent>
                  </Card>
                ) : (
                  activeRequests.map((request) => (
                    <Card key={request.id} className="bg-white">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="mb-1">{request.description}</CardTitle>
                            <div className="text-sm text-gray-500">
                              {request.room} • Submitted on {request.date && formatDate(request.date)}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="secondary" className={getPriorityColor(request.priority)}>
                              {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                            </Badge>
                            <Badge variant="secondary" className={getStatusColor(request.status)}>
                              {formatStatus(request.status)}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="completed">
              <div className="space-y-4">
                {completedRequests.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-8 text-gray-500">
                      No completed maintenance requests
                    </CardContent>
                  </Card>
                ) : (
                  completedRequests.map((request) => (
                    <Card key={request.id} className="bg-white">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="mb-1">{request.description}</CardTitle>
                            <div className="text-sm text-gray-500">
                              {request.room}
                            </div>
                          </div>
                          <Badge variant="secondary" className={getStatusColor(request.status)}>
                            {formatStatus(request.status)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-medium text-gray-500">Timeline</p>
                            <p className="mt-1">Submitted: {request.date && formatDate(request.date)}</p>
                            {request.completionDate && (
                              <p className="mt-1">Completed: {formatDate(request.completionDate)}</p>
                            )}
                          </div>
                          {request.notes && (
                            <div>
                              <p className="text-sm font-medium text-gray-500">Resolution Notes</p>
                              <ul className="mt-1 space-y-1">
                                {request.notes.map((note, index) => (
                                  <li key={index} className="text-sm">• {note}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ErrorBoundary>
  );
}

