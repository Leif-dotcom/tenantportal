"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { useState } from "react";

// Add a helper function for consistent date formatting
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyId: string;
  propertyName: string;
  apartmentNumber: string;
  leaseStart: string;
  leaseEnd: string;
  status: "active" | "ending_soon" | "ended";
}

const mockTenants: Tenant[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    propertyId: "1",
    propertyName: "Riverside Residences",
    apartmentNumber: "101",
    leaseStart: "2023-01-01",
    leaseEnd: "2024-01-01",
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1234567891",
    propertyId: "1",
    propertyName: "Riverside Residences",
    apartmentNumber: "203",
    leaseStart: "2023-03-01",
    leaseEnd: "2023-12-31",
    status: "ending_soon",
  },
  // Add more mock tenants as needed
];

const mockProperties = [
  { id: "1", name: "Riverside Residences" },
  { id: "2", name: "Park View Complex" },
];

export default function TenantsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProperty, setSelectedProperty] = useState("all");

  // Filter tenants based on search query and selected property
  const filteredTenants = mockTenants.filter((tenant) => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProperty = selectedProperty === "all" || tenant.propertyId === selectedProperty;
    return matchesSearch && matchesProperty;
  });

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <Link href="/landlord" className="text-blue-600 hover:underline">
            ← Back to Dashboard
          </Link>
        </div>
        <h1 className="text-3xl font-bold">Tenant Management</h1>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8 flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search tenants by name..."
            className="max-w-sm"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedProperty} onValueChange={setSelectedProperty}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Property" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Properties</SelectItem>
            {mockProperties.map((property) => (
              <SelectItem key={property.id} value={property.id}>
                {property.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tenants List */}
      <div className="space-y-4">
        {filteredTenants.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No tenants found matching your search criteria
          </div>
        ) : (
          filteredTenants.map((tenant) => (
            <Link href={`/landlord/tenants/${tenant.id}`} key={tenant.id}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="mb-1">{tenant.name}</CardTitle>
                      <div className="text-sm text-gray-500">
                        {tenant.propertyName} - Apt {tenant.apartmentNumber}
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      tenant.status === 'active' 
                        ? 'bg-green-100 text-green-700'
                        : tenant.status === 'ending_soon'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {tenant.status === 'active' 
                        ? 'Active'
                        : tenant.status === 'ending_soon'
                        ? 'Ending Soon'
                        : 'Ended'}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Contact:</p>
                      <p>{tenant.email}</p>
                      <p>{tenant.phone}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Lease Period:</p>
                      <p>{formatDate(tenant.leaseStart)} - {formatDate(tenant.leaseEnd)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
} 