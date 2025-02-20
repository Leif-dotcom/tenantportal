"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface RentData {
  month: string;
  due: number;
  received: number;
}

interface OverduePayment {
  id: string;
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
  dueDate: string;
  daysOverdue: number;
}

// Mock data for the rent chart
const mockRentData: RentData[] = [
  { month: 'Jan', due: 25000, received: 23500 },
  { month: 'Feb', due: 25000, received: 24000 },
  { month: 'Mar', due: 25000, received: 25000 },
  { month: 'Apr', due: 25000, received: 22000 },
  { month: 'May', due: 25000, received: 24500 },
  { month: 'Jun', due: 25000, received: 25000 },
];

// Mock data for overdue payments
const mockOverduePayments: OverduePayment[] = [
  {
    id: "1",
    tenant: {
      id: "1",
      name: "John Doe"
    },
    property: {
      id: "1",
      name: "Riverside Residences"
    },
    apartment: "101",
    amount: 1500,
    dueDate: "2024-02-01",
    daysOverdue: 15
  },
  {
    id: "2",
    tenant: {
      id: "2",
      name: "Jane Smith"
    },
    property: {
      id: "1",
      name: "Riverside Residences"
    },
    apartment: "203",
    amount: 1000,
    dueDate: "2024-02-05",
    daysOverdue: 10
  },
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

export default function FinancialDashboard() {
  const [selectedYear, setSelectedYear] = useState("2024");
  const totalOverdue = mockOverduePayments.reduce((sum, payment) => sum + payment.amount, 0);
  const currentMonthDue = mockRentData[mockRentData.length - 1].due;
  const currentMonthReceived = mockRentData[mockRentData.length - 1].received;
  const collectionRate = (currentMonthReceived / currentMonthDue) * 100;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/landlord" className="text-blue-600 hover:underline">
              ← Back to Dashboard
            </Link>
            <Link href="/landlord/finances/history">
              <Button variant="outline">View Payment History</Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold">Financial Overview</h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Current Month Due</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-800">{formatCurrency(currentMonthDue)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Collection Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-800">{collectionRate.toFixed(1)}%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Overdue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-600">{formatCurrency(totalOverdue)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Rent Chart */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Rent Overview</CardTitle>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mockRentData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => formatCurrency(value as number)}
                  />
                  <Legend />
                  <Bar dataKey="due" name="Rent Due" fill="#93c5fd" />
                  <Bar dataKey="received" name="Rent Received" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Overdue Payments */}
        <Card>
          <CardHeader>
            <CardTitle>Outstanding Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockOverduePayments.map((payment) => (
                <div
                  key={payment.id}
                  className="border-b last:border-0 pb-4 last:pb-0"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">{payment.tenant.name}</p>
                      <p className="text-sm text-gray-500">
                        {payment.property.name} - Apt {payment.apartment}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-red-600">{formatCurrency(payment.amount)}</p>
                      <p className="text-sm text-gray-500">
                        Due: {formatDate(payment.dueDate)}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-red-600">
                      {payment.daysOverdue} days overdue
                    </p>
                    <Button size="sm" variant="outline">Send Reminder</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 