import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface ApartmentDetails {
  id: string;
  number: string;
  squareMeters: number;
  monthlyRent: number;
  status: "occupied" | "vacant";
  bedrooms: number;
  bathrooms: number;
  floor: number;
  tenant?: {
    name: string;
    email: string;
    phone: string;
    leaseStart: string;
    leaseEnd: string;
  };
  amenities: string[];
  lastRenovation: string;
  maintenanceHistory: {
    date: string;
    description: string;
    cost: number;
  }[];
}

// Mock data - replace with actual data fetching
const mockApartmentDetails: ApartmentDetails = {
  id: "101",
  number: "101",
  squareMeters: 85,
  monthlyRent: 2125,
  status: "occupied",
  bedrooms: 2,
  bathrooms: 1,
  floor: 1,
  tenant: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    leaseStart: "2023-01-01",
    leaseEnd: "2024-01-01",
  },
  amenities: ["Balcony", "Built-in Kitchen", "Storage Room", "Parking Space"],
  lastRenovation: "2022-06",
  maintenanceHistory: [
    {
      date: "2023-11-15",
      description: "Heating system maintenance",
      cost: 350,
    },
    {
      date: "2023-08-20",
      description: "Window replacement",
      cost: 800,
    },
  ],
};

export default function ApartmentDetailsPage({
  params,
}: {
  params: { id: string; apartmentId: string };
}) {
  const apartment = mockApartmentDetails; // In real app, fetch based on params.id and params.apartmentId

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <Link
          href={`/landlord/properties/${params.id}`}
          className="text-blue-600 hover:underline mb-4 block"
        >
          ← Back to Property
        </Link>
        <h1 className="text-3xl font-bold">Apartment {apartment.number}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Area:</strong> {apartment.squareMeters} m²</p>
              <p><strong>Monthly Rent:</strong> €{apartment.monthlyRent}</p>
              <p><strong>Status:</strong> <span className={`capitalize ${
                apartment.status === "vacant" ? "text-red-500" : "text-green-500"
              }`}>{apartment.status}</span></p>
              <p><strong>Floor:</strong> {apartment.floor}</p>
              <p><strong>Bedrooms:</strong> {apartment.bedrooms}</p>
              <p><strong>Bathrooms:</strong> {apartment.bathrooms}</p>
              <p><strong>Last Renovation:</strong> {apartment.lastRenovation}</p>
            </div>
          </CardContent>
        </Card>

        {apartment.tenant && (
          <Card>
            <CardHeader>
              <CardTitle>Tenant Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Name:</strong> {apartment.tenant.name}</p>
                <p><strong>Email:</strong> {apartment.tenant.email}</p>
                <p><strong>Phone:</strong> {apartment.tenant.phone}</p>
                <p><strong>Lease Period:</strong> {apartment.tenant.leaseStart} to {apartment.tenant.leaseEnd}</p>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Amenities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1">
              {apartment.amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Maintenance History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {apartment.maintenanceHistory.map((record, index) => (
                <div key={index} className="border-b pb-2 last:border-b-0">
                  <p className="font-semibold">{record.date}</p>
                  <p>{record.description}</p>
                  <p className="text-gray-600">Cost: €{record.cost}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 