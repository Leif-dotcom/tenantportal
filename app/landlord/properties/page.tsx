import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Settings } from "lucide-react";

interface Property {
  id: string;
  name: string;
  address: string;
  numberOfApartments: number;
  imageUrl: string;
}

const mockProperties: Property[] = [
  {
    id: "1",
    name: "Riverside Residences",
    address: "123 River Street, City",
    numberOfApartments: 12,
    imageUrl: "/placeholder-house.jpg",
  },
  {
    id: "2",
    name: "Park View Complex",
    address: "456 Park Avenue, City",
    numberOfApartments: 8,
    imageUrl: "/placeholder-house.jpg",
  },
  // Add more mock properties as needed
];

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/landlord" className="text-blue-600 hover:underline">
              ← Back to Dashboard
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/landlord/properties/new" className="w-full">
                    Add New Property
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <h1 className="text-3xl font-bold">Property Management</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProperties.map((property) => (
            <Link href={`/landlord/properties/${property.id}`} key={property.id}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle>{property.name}</CardTitle>
                  <CardDescription>{property.address}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-200 rounded-md mb-4">
                    {/* Add proper image component here */}
                  </div>
                  <p className="text-sm text-gray-600">
                    {property.numberOfApartments} Apartments
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 