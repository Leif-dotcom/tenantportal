import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";

interface Apartment {
  id: string;
  number: string;
  squareMeters: number;
  monthlyRent: number;
  status: "occupied" | "vacant";
  tenant?: {
    name: string;
    email: string;
  };
  maintenanceStatus: {
    needsAttention: boolean;
    lastCheck: string;
    issues?: string[];
  };
}

interface PropertyDetails {
  id: string;
  name: string;
  address: string;
  totalSquareMeters: number;
  numberOfApartments: number;
  averageRentPerSqm: number;
  apartments: Apartment[];
}

// Mock data - replace with actual data fetching
const mockPropertyDetails: PropertyDetails = {
  id: "1",
  name: "Riverside Residences",
  address: "123 River Street, City",
  totalSquareMeters: 1200,
  numberOfApartments: 12,
  averageRentPerSqm: 25,
  apartments: [
    {
      id: "101",
      number: "101",
      squareMeters: 85,
      monthlyRent: 2125,
      status: "occupied",
      tenant: {
        name: "John Doe",
        email: "john.doe@example.com",
      },
      maintenanceStatus: {
        needsAttention: true,
        lastCheck: "2024-01-15",
        issues: ["Heating system needs repair", "Window seal damaged"]
      }
    },
    {
      id: "102",
      number: "102",
      squareMeters: 95,
      monthlyRent: 2375,
      status: "vacant",
      maintenanceStatus: {
        needsAttention: false,
        lastCheck: "2024-02-01"
      }
    },
    // Add more apartments as needed
  ],
};

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const property = mockPropertyDetails; // In real app, fetch based on params.id

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Link href="/landlord/properties" className="text-blue-600 hover:underline mb-4 block">
            ← Back to Properties
          </Link>
          <h1 className="text-3xl font-bold">{property.name}</h1>
          <p className="text-gray-600">{property.address}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Total Area</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{property.totalSquareMeters} m²</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Number of Apartments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{property.numberOfApartments}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Avg. Rent/m²</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">€{property.averageRentPerSqm}</p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mb-6">Apartments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {property.apartments.map((apartment) => (
            <Link href={`/landlord/properties/${property.id}/apartments/${apartment.id}`} key={apartment.id}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle>Apartment {apartment.number}</CardTitle>
                  <CardDescription>
                    {apartment.status === "occupied" && apartment.tenant
                      ? `Tenant: ${apartment.tenant.name}`
                      : "Currently Vacant"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p>Area: {apartment.squareMeters} m²</p>
                    <p>Monthly Rent: €{apartment.monthlyRent}</p>
                    <p className={`capitalize ${
                      apartment.status === "vacant" ? "text-red-500" : "text-green-500"
                    }`}>
                      {apartment.status}
                    </p>
                    
                    {/* Maintenance Status */}
                    <div className="mt-4 pt-4 border-t">
                      <p className="flex items-center gap-2">
                        <span className={`size-2 rounded-full ${
                          apartment.maintenanceStatus.needsAttention 
                            ? "bg-red-500" 
                            : "bg-green-500"
                        }`}></span>
                        <span className={apartment.maintenanceStatus.needsAttention ? "text-red-600" : "text-green-600"}>
                          {apartment.maintenanceStatus.needsAttention 
                            ? "Needs Attention" 
                            : "Maintenance Up to Date"}
                        </span>
                      </p>
                      {apartment.maintenanceStatus.needsAttention && apartment.maintenanceStatus.issues && (
                        <ul className="mt-2 text-sm text-red-600">
                          {apartment.maintenanceStatus.issues.map((issue, index) => (
                            <li key={index}>• {issue}</li>
                          ))}
                        </ul>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        Last checked: {apartment.maintenanceStatus.lastCheck}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 