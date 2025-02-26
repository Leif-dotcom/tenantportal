"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getDictionary } from "@/utils/i18n";

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

function getPaymentTypeLabel(type: Payment['type'], dictionary: any) {
  switch(type) {
    case 'rent':
      return dictionary.landlord.paymentTypeRent;
    case 'deposit':
      return dictionary.landlord.paymentTypeDeposit;
    case 'utilities':
      return dictionary.landlord.paymentTypeUtilities;
    case 'late_fee':
      return dictionary.landlord.paymentTypeLateFee;
    default:
      return type;
  }
}

export default function PaymentHistoryPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProperty, setSelectedProperty] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [dictionary, setDictionary] = useState<any>(null);

  // Load the dictionary
  useEffect(() => {
    async function loadDictionary() {
      const dict = await getDictionary(lang);
      setDictionary(dict);
    }
    loadDictionary();
  }, [lang]);

  // Filter payments
  const filteredPayments = mockPayments.filter((payment) => {
    const matchesSearch = 
      payment.tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProperty = selectedProperty === "all" || payment.property.id === selectedProperty;
    const matchesType = selectedType === "all" || payment.type === selectedType;
    
    return matchesSearch && matchesProperty && matchesType;
  });

  if (!dictionary) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href={`/${lang}/landlord/finances`} className="text-blue-600 hover:underline">
              {dictionary.landlord.backToFinancialOverview}
            </Link>
          </div>
          <h1 className="text-3xl font-bold">{dictionary.tenant.paymentHistory}</h1>
        </div>

        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder={dictionary.landlord.searchByTenantOrReference}
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
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder={dictionary.landlord.paymentType} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{dictionary.landlord.allTypes}</SelectItem>
              <SelectItem value="rent">{dictionary.landlord.paymentTypeRent}</SelectItem>
              <SelectItem value="deposit">{dictionary.landlord.paymentTypeDeposit}</SelectItem>
              <SelectItem value="utilities">{dictionary.landlord.paymentTypeUtilities}</SelectItem>
              <SelectItem value="late_fee">{dictionary.landlord.paymentTypeLateFee}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Payments List */}
        <Card>
          <CardHeader>
            <CardTitle>{dictionary.landlord.transactions}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPayments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {dictionary.landlord.noPaymentsFound}
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
                          {payment.property.name} - {dictionary.landlord.apt} {payment.apartment}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(payment.amount)}</p>
                        <p className={`text-sm ${getStatusColor(payment.status)}`}>
                          {payment.status === "completed" ? dictionary.landlord.statusCompleted :
                            payment.status === "pending" ? dictionary.landlord.statusPending :
                            dictionary.landlord.statusFailed}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <span>{formatDate(payment.date)}</span>
                        <span>•</span>
                        <span>{getPaymentTypeLabel(payment.type, dictionary)}</span>
                        <span>•</span>
                        <span className="capitalize">
                          {payment.method === "bank_transfer" ? dictionary.landlord.methodBankTransfer :
                            payment.method === "credit_card" ? dictionary.landlord.methodCreditCard :
                            dictionary.landlord.methodDirectDebit}
                        </span>
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