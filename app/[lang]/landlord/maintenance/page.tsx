"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getDictionary } from "@/utils/i18n";

interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  dateSubmitted: string;
  status: "new" | "assigned" | "in_progress" | "completed" | "cancelled";
  priority: "low" | "medium" | "high" | "urgent";
  category: "plumbing" | "electrical" | "hvac" | "appliance" | "structural" | "other";
  room: "bathroom" | "kitchen" | "bedroom" | "living_room" | "other";
  property: {
    id: string;
    name: string;
  };
  apartment: {
    id: string;
    number: string;
  };
  tenant: {
    id: string;
    name: string;
    phone: string;
  };
  suggestedHandyman?: {
    id: string;
    name: string;
    specialization: string;
    rating: number;
    availableFrom: string;
  };
}

const mockMaintenanceRequests: MaintenanceRequest[] = [
  {
    id: "1",
    title: "Leaking Faucet",
    description: "The bathroom sink faucet is constantly dripping, wasting water.",
    dateSubmitted: "2024-02-15",
    status: "new",
    priority: "medium",
    category: "plumbing",
    room: "bathroom",
    property: {
      id: "1",
      name: "Riverside Residences"
    },
    apartment: {
      id: "101",
      number: "101"
    },
    tenant: {
      id: "1",
      name: "John Doe",
      phone: "+1234567890"
    },
    suggestedHandyman: {
      id: "h1",
      name: "Mike Wilson",
      specialization: "Plumbing",
      rating: 4.8,
      availableFrom: "2024-02-16"
    }
  },
  {
    id: "2",
    title: "Heating Not Working",
    description: "The heating system is not functioning properly, room temperature is very low.",
    dateSubmitted: "2024-02-14",
    status: "in_progress",
    priority: "urgent",
    category: "hvac",
    room: "living_room",
    property: {
      id: "1",
      name: "Riverside Residences"
    },
    apartment: {
      id: "203",
      number: "203"
    },
    tenant: {
      id: "2",
      name: "Jane Smith",
      phone: "+1234567891"
    },
    suggestedHandyman: {
      id: "h2",
      name: "Bob Thompson",
      specialization: "HVAC",
      rating: 4.9,
      availableFrom: "2024-02-15"
    }
  }
];

const mockProperties = [
  { id: "1", name: "Riverside Residences" },
  { id: "2", name: "Park View Complex" },
];

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

function getPriorityColor(priority: MaintenanceRequest['priority']) {
  switch (priority) {
    case 'urgent':
      return 'bg-red-100 text-red-700';
    case 'high':
      return 'bg-orange-100 text-orange-700';
    case 'medium':
      return 'bg-yellow-100 text-yellow-700';
    case 'low':
      return 'bg-green-100 text-green-700';
  }
}

function getStatusColor(status: MaintenanceRequest['status']) {
  switch (status) {
    case 'new':
      return 'bg-blue-100 text-blue-700';
    case 'assigned':
      return 'bg-purple-100 text-purple-700';
    case 'in_progress':
      return 'bg-yellow-100 text-yellow-700';
    case 'completed':
      return 'bg-green-100 text-green-700';
    case 'cancelled':
      return 'bg-gray-100 text-gray-700';
  }
}

export default function MaintenancePage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProperty, setSelectedProperty] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [dictionary, setDictionary] = useState<any>(null);

  // Load the dictionary
  useEffect(() => {
    async function loadDictionary() {
      const dict = await getDictionary(lang);
      setDictionary(dict);
    }
    loadDictionary();
  }, [lang]);

  // Filter maintenance requests
  const filteredRequests = mockMaintenanceRequests.filter((request) => {
    const matchesSearch = 
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.tenant.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProperty = selectedProperty === "all" || request.property.id === selectedProperty;
    const matchesStatus = selectedStatus === "all" || request.status === selectedStatus;
    const matchesPriority = selectedPriority === "all" || request.priority === selectedPriority;
    
    return matchesSearch && matchesProperty && matchesStatus && matchesPriority;
  });

  if (!dictionary) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href={`/${lang}/landlord`} className="text-blue-600 hover:underline">
              {dictionary.common.backToDashboard}
            </Link>
          </div>
          <h1 className="text-3xl font-bold">{dictionary.landlord.maintenanceRequests}</h1>
        </div>

        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            placeholder={dictionary.landlord.searchRequests}
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select value={selectedProperty} onValueChange={setSelectedProperty}>
            <SelectTrigger>
              <SelectValue placeholder={dictionary.landlord.filterByProperty} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{dictionary.landlord.allProperties}</SelectItem>
              {mockProperties.map((property) => (
                <SelectItem key={property.id} value={property.id}>
                  {property.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue placeholder={dictionary.landlord.filterByStatus} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{dictionary.landlord.allStatuses}</SelectItem>
              <SelectItem value="new">{dictionary.landlord.statusNew}</SelectItem>
              <SelectItem value="assigned">{dictionary.landlord.statusAssigned}</SelectItem>
              <SelectItem value="in_progress">{dictionary.landlord.statusInProgress}</SelectItem>
              <SelectItem value="completed">{dictionary.landlord.statusCompleted}</SelectItem>
              <SelectItem value="cancelled">{dictionary.landlord.statusCancelled}</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedPriority} onValueChange={setSelectedPriority}>
            <SelectTrigger>
              <SelectValue placeholder={dictionary.landlord.filterByPriority} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{dictionary.landlord.allPriorities}</SelectItem>
              <SelectItem value="urgent">{dictionary.landlord.priorityUrgent}</SelectItem>
              <SelectItem value="high">{dictionary.landlord.priorityHigh}</SelectItem>
              <SelectItem value="medium">{dictionary.landlord.priorityMedium}</SelectItem>
              <SelectItem value="low">{dictionary.landlord.priorityLow}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Maintenance Requests List */}
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {dictionary.landlord.noMaintenanceRequests}
            </div>
          ) : (
            filteredRequests.map((request) => (
              <Card key={request.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="mb-1">{request.title}</CardTitle>
                      <div className="text-sm text-gray-500">
                        {request.property.name} - {dictionary.landlord.apt} {request.apartment.number}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className={getPriorityColor(request.priority)}>
                        {request.priority === "urgent" ? dictionary.landlord.priorityUrgent :
                          request.priority === "high" ? dictionary.landlord.priorityHigh :
                          request.priority === "medium" ? dictionary.landlord.priorityMedium :
                          dictionary.landlord.priorityLow}
                      </Badge>
                      <Badge variant="secondary" className={getStatusColor(request.status)}>
                        {request.status === "new" ? dictionary.landlord.statusNew :
                          request.status === "assigned" ? dictionary.landlord.statusAssigned :
                          request.status === "in_progress" ? dictionary.landlord.statusInProgress :
                          request.status === "completed" ? dictionary.landlord.statusCompleted :
                          dictionary.landlord.statusCancelled}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">{dictionary.landlord.description}</p>
                        <p className="mt-1">{request.description}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">{dictionary.landlord.location}</p>
                        <p className="mt-1 capitalize">
                          {request.room === "bathroom" ? dictionary.landlord.roomBathroom :
                            request.room === "kitchen" ? dictionary.landlord.roomKitchen :
                            request.room === "bedroom" ? dictionary.landlord.roomBedroom :
                            request.room === "living_room" ? dictionary.landlord.roomLivingRoom :
                            dictionary.landlord.roomOther}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">{dictionary.landlord.tenant}</p>
                        <p className="mt-1">{request.tenant.name}</p>
                        <p className="text-sm text-gray-500">{request.tenant.phone}</p>
                      </div>
                    </div>
                    
                    {request.suggestedHandyman && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-blue-800 mb-2">{dictionary.landlord.suggestedHandyman}</p>
                        <div className="space-y-2">
                          <p className="font-medium">{request.suggestedHandyman.name}</p>
                          <p className="text-sm text-blue-700">
                            {request.suggestedHandyman.specialization} • {dictionary.landlord.rating}: {request.suggestedHandyman.rating}
                          </p>
                          <p className="text-sm text-blue-600">
                            {dictionary.landlord.availableFrom}: {formatDate(request.suggestedHandyman.availableFrom)}
                          </p>
                          <Button size="sm" className="mt-2">
                            {dictionary.landlord.assignHandyman}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    {dictionary.tenant.submittedOn} {formatDate(request.dateSubmitted)}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 