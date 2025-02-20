"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { useState } from "react";

interface Payment {
  id: string;
  date: string;
  tenant: {
    id: string;
    name: string;
  };
  property: {
    id: string;
    name: string;
  };
  apartment: string;
  amount: number;
  type: "rent" | "deposit" | "utilities" | "late_fee";
  status: "completed" | "pending" | "failed";
  method: "bank_transfer" | "credit_card" | "direct_debit";
  reference: string;
}

const mockPayments: Payment[] = [
  {
    id: "1",
    date: "2024-02-01",
    tenant: {
      id: "1",
      name: "John Doe"
    },
    property: {
      id: "1",
      name: "Riverside Residences"
    },
    apartment: "101",
    amount: 2125,
    type: "rent",
    status: "completed",
    method: "bank_transfer",
    reference: "RT-2024020101"
  },
  {
    id: "2",
    date: "2024-02-01",
    tenant: {
      id: "2",
      name: "Jane Smith"
    },
    property: {
      id: "1",
      name: "Riverside Residences"
    },
    apartment: "203",
    amount: 2375,
    type: "rent",
    status: "completed",
    method: "direct_debit",
    reference: "RT-2024020102"
  },
  {
    id: "3",
    date: "2024-02-05",
    tenant: {
      id: "1",
      name: "John Doe"
    },
    property: {
      id: "1",
      name: "Riverside Residences"
    },
    apartment: "101",
    amount: 150,
    type: "utilities",
    status: "pending",
    method: "credit_card",
    reference: "UT-2024020501"
  },
];

const mockProperties = [
  { id: "1", name: "Riverside Residences" },
  { id: "2", name: "Park View Complex" },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

function getStatusColor(status: Payment['status']) {
  switch (status) {
    case 'completed':
      return 'text-green-600';
    case 'pending':
      return 'text-yellow-600';
    case 'failed':
      return 'text-red-600';
  }
}

function getPaymentTypeLabel(type: Payment['type']) {
  return type.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

export default function PaymentHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProperty, setSelectedProperty] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  // Filter payments
  const filteredPayments = mockPayments.filter((payment) => {
    const matchesSearch = 
      payment.tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProperty = selectedProperty === "all" || payment.property.id === selectedProperty;
    const matchesType = selectedType === "all" || payment.type === selectedType;
    
    return matchesSearch && matchesProperty && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/landlord/finances" className="text-blue-600 hover:underline">
              ← Back to Financial Overview
            </Link>
          </div>
          <h1 className="text-3xl font-bold">Payment History</h1>
        </div>

        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Search by tenant or reference..."
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select value={selectedProperty} onValueChange={setSelectedProperty}>
            <SelectTrigger>
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
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder="Payment Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="rent">Rent</SelectItem>
              <SelectItem value="deposit">Deposit</SelectItem>
              <SelectItem value="utilities">Utilities</SelectItem>
              <SelectItem value="late_fee">Late Fee</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Payments List */}
        <Card>
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPayments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No payments found matching your criteria
                </div>
              ) : (
                filteredPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="border-b last:border-0 pb-4 last:pb-0"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{payment.tenant.name}</p>
                          <span className="text-sm text-gray-500">•</span>
                          <p className="text-sm text-gray-500">{payment.reference}</p>
                        </div>
                        <p className="text-sm text-gray-500">
                          {payment.property.name} - Apt {payment.apartment}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(payment.amount)}</p>
                        <p className={`text-sm ${getStatusColor(payment.status)}`}>
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <span>{formatDate(payment.date)}</span>
                        <span>•</span>
                        <span>{getPaymentTypeLabel(payment.type)}</span>
                        <span>•</span>
                        <span className="capitalize">{payment.method.replace('_', ' ')}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 