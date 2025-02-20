export interface MaintenanceRequest {
  id: string;
  title?: string;
  description: string;
  dateSubmitted?: string;
  date?: string;
  status: "new" | "in_progress" | "completed" | "cancelled" | "assigned";
  priority: "low" | "medium" | "high" | "urgent";
  category?: "plumbing" | "electrical" | "hvac" | "appliance" | "structural" | "other";
  room: "bathroom" | "kitchen" | "bedroom" | "living_room" | "other" | string;
  property?: {
    id: string;
    name: string;
  };
  apartment?: {
    id: string;
    number: string;
  };
  tenant?: {
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
  notes?: string[];
  completionDate?: string;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  numberOfApartments: number;
  imageUrl: string;
}

export interface Tenant {
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

export interface Payment {
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