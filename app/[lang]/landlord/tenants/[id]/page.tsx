import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

interface TenantDetails {
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
  documents: {
    id: string;
    type: "lease" | "id" | "other";
    name: string;
    uploadDate: string;
    url: string;
  }[];
  communications: {
    id: string;
    date: string;
    type: "email" | "chat" | "phone" | "maintenance";
    subject: string;
    content: string;
    status?: "pending" | "resolved";
  }[];
  payments: {
    id: string;
    date: string;
    amount: number;
    status: "paid" | "pending" | "late";
    type: "rent" | "deposit" | "utilities";
  }[];
  personalInfo: {
    dateOfBirth: string;
    occupation: string;
    emergencyContact: {
      name: string;
      relationship: string;
      phone: string;
    };
  };
}

// Mock data - replace with actual data fetching
const mockTenantDetails: TenantDetails = {
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
  documents: [
    {
      id: "1",
      type: "lease",
      name: "Lease Agreement 2023-2024",
      uploadDate: "2022-12-15",
      url: "/documents/lease-2023.pdf",
    },
    {
      id: "2",
      type: "id",
      name: "ID Document",
      uploadDate: "2022-12-15",
      url: "/documents/id.pdf",
    },
  ],
  communications: [
    {
      id: "1",
      date: "2024-02-15",
      type: "maintenance",
      subject: "Heating System Issue",
      content: "Reported issues with the heating system not working properly.",
      status: "resolved",
    },
    {
      id: "2",
      date: "2024-02-01",
      type: "email",
      subject: "Rent Payment Confirmation",
      content: "Confirmation of rent payment for February 2024.",
    },
  ],
  payments: [
    {
      id: "1",
      date: "2024-02-01",
      amount: 2125,
      status: "paid",
      type: "rent",
    },
    {
      id: "2",
      date: "2024-01-01",
      amount: 2125,
      status: "paid",
      type: "rent",
    },
  ],
  personalInfo: {
    dateOfBirth: "1990-05-15",
    occupation: "Software Engineer",
    emergencyContact: {
      name: "Jane Doe",
      relationship: "Sister",
      phone: "+1234567899",
    },
  },
};

export default function TenantDetailsPage({ params }: { params: { id: string } }) {
  const tenant = mockTenantDetails; // In real app, fetch based on params.id

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Link href="/landlord/tenants" className="text-blue-600 hover:underline mb-4 block">
            ← Back to Tenants
          </Link>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{tenant.name}</h1>
              <p className="text-gray-600">{tenant.propertyName} - Apartment {tenant.apartmentNumber}</p>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm ${
              tenant.status === 'active' 
                ? 'bg-green-100 text-green-700'
                : tenant.status === 'ending_soon'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-700'
            }`}>
              {tenant.status === 'active' 
                ? 'Active Lease'
                : tenant.status === 'ending_soon'
                ? 'Lease Ending Soon'
                : 'Lease Ended'}
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><strong>Email:</strong> {tenant.email}</p>
                    <p><strong>Phone:</strong> {tenant.phone}</p>
                    <p><strong>Date of Birth:</strong> {new Date(tenant.personalInfo.dateOfBirth).toLocaleDateString()}</p>
                    <p><strong>Occupation:</strong> {tenant.personalInfo.occupation}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><strong>Name:</strong> {tenant.personalInfo.emergencyContact.name}</p>
                    <p><strong>Relationship:</strong> {tenant.personalInfo.emergencyContact.relationship}</p>
                    <p><strong>Phone:</strong> {tenant.personalInfo.emergencyContact.phone}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Lease Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><strong>Start Date:</strong> {new Date(tenant.leaseStart).toLocaleDateString()}</p>
                    <p><strong>End Date:</strong> {new Date(tenant.leaseEnd).toLocaleDateString()}</p>
                    <p><strong>Monthly Rent:</strong> €{tenant.payments[0].amount}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {tenant.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-gray-500">Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</p>
                      </div>
                      <Link href={doc.url} className="text-blue-600 hover:underline">
                        View
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communications">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {tenant.communications.map((comm) => (
                    <div key={comm.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{comm.subject}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(comm.date).toLocaleDateString()} • {comm.type.charAt(0).toUpperCase() + comm.type.slice(1)}
                          </p>
                        </div>
                        {comm.status && (
                          <span className={`px-2 py-1 rounded text-sm ${
                            comm.status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {comm.status.charAt(0).toUpperCase() + comm.status.slice(1)}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700">{comm.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {tenant.payments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">€{payment.amount}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(payment.date).toLocaleDateString()} • {payment.type.charAt(0).toUpperCase() + payment.type.slice(1)}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        payment.status === 'paid' 
                          ? 'bg-green-100 text-green-700'
                          : payment.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 