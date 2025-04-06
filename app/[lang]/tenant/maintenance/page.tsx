"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ErrorBoundary } from "@/components/error-boundary";
import { MaintenanceRequest } from "@/types";
import { formatDate, getStatusColor, getPriorityColor, getTranslatedStatus, getTranslatedPriority } from "@/utils/formatting";
import Link from "next/link";
import { getDictionary } from "@/utils/i18n";

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

export default function MaintenancePage({
  params: { lang }
}: {
  params: { lang: string }
}) {
  const activeRequests = mockMaintenanceRequests.filter(
    request => request.status !== 'completed' && request.status !== 'cancelled'
  );
  const completedRequests = mockMaintenanceRequests.filter(
    request => request.status === 'completed' || request.status === 'cancelled'
  );

  const dictionary = getDictionary(lang);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <Link href={`/${lang}/tenant`} className="text-blue-600 hover:underline">
                {dictionary.common.backToDashboard}
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-800">{dictionary.tenant.maintenance}</h1>
              <Button>{dictionary.tenant.newRequest}</Button>
            </div>
          </div>

          <Tabs defaultValue="active" className="space-y-4">
            <TabsList>
              <TabsTrigger value="active">{dictionary.tenant.activeRequests}</TabsTrigger>
              <TabsTrigger value="completed">{dictionary.tenant.requestHistory}</TabsTrigger>
            </TabsList>

            <TabsContent value="active">
              <div className="space-y-4">
                {activeRequests.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-8 text-gray-500">
                      {dictionary.tenant.noActiveRequests}
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
                              {request.room} • {dictionary.tenant.submittedOn} {request.date && formatDate(request.date)}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="secondary" className={getPriorityColor(request.priority)}>
                              {getTranslatedPriority(request.priority, dictionary)}
                            </Badge>
                            <Badge variant="secondary" className={getStatusColor(request.status)}>
                              {getTranslatedStatus(request.status, dictionary)}
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
                      {dictionary.tenant.noCompletedRequests}
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
                            {getTranslatedStatus(request.status, dictionary)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-medium text-gray-500">{dictionary.tenant.timeline}</p>
                            <p className="mt-1">{dictionary.tenant.submitted} {request.date && formatDate(request.date)}</p>
                            {request.completionDate && (
                              <p className="mt-1">{dictionary.tenant.completed} {formatDate(request.completionDate)}</p>
                            )}
                          </div>
                          {request.notes && (
                            <div>
                              <p className="text-sm font-medium text-gray-500">{dictionary.tenant.resolutionNotes}</p>
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

