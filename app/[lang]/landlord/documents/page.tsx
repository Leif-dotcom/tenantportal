"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getDictionary } from "@/utils/i18n";

interface Document {
  id: string;
  title: string;
  type: "lease_agreement" | "house_rules" | "utility_bill" | "handyman_bill" | "other";
  property: {
    id: string;
    name: string;
  };
  tenant?: {
    id: string;
    name: string;
  };
  uploadDate: string;
  fileSize: string;
  fileType: string;
}

const mockDocuments: Document[] = [
  {
    id: "1",
    title: "Lease Agreement - John Doe",
    type: "lease_agreement",
    property: {
      id: "1",
      name: "Riverside Residences"
    },
    tenant: {
      id: "1",
      name: "John Doe"
    },
    uploadDate: "2024-01-15",
    fileSize: "2.4 MB",
    fileType: "PDF"
  },
  {
    id: "2",
    title: "House Rules - Riverside Residences",
    type: "house_rules",
    property: {
      id: "1",
      name: "Riverside Residences"
    },
    uploadDate: "2024-01-10",
    fileSize: "1.2 MB",
    fileType: "PDF"
  },
  {
    id: "3",
    title: "Utility Bill - January 2024",
    type: "utility_bill",
    property: {
      id: "1",
      name: "Riverside Residences"
    },
    tenant: {
      id: "1",
      name: "John Doe"
    },
    uploadDate: "2024-02-01",
    fileSize: "856 KB",
    fileType: "PDF"
  },
  {
    id: "4",
    title: "Handyman Bill - Plumbing Repair",
    type: "handyman_bill",
    property: {
      id: "1",
      name: "Riverside Residences"
    },
    uploadDate: "2024-02-05",
    fileSize: "1.1 MB",
    fileType: "PDF"
  }
];

const mockProperties = [
  { id: "1", name: "Riverside Residences" },
  { id: "2", name: "Park View Complex" },
];

const mockTenants = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
];

const documentTypes = [
  { value: "lease_agreement", label: "Lease Agreement" },
  { value: "house_rules", label: "House Rules" },
  { value: "utility_bill", label: "Utility Bill" },
  { value: "handyman_bill", label: "Handyman Bill" },
  { value: "other", label: "Other" },
];

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

export default function DocumentManagement({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProperty, setSelectedProperty] = useState("all");
  const [selectedTenant, setSelectedTenant] = useState("all");
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

  // Filter documents
  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProperty = selectedProperty === "all" || doc.property.id === selectedProperty;
    const matchesTenant = selectedTenant === "all" || doc.tenant?.id === selectedTenant;
    const matchesType = selectedType === "all" || doc.type === selectedType;
    
    return matchesSearch && matchesProperty && matchesTenant && matchesType;
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
            <Button>{dictionary.landlord.uploadDocument}</Button>
          </div>
          <h1 className="text-3xl font-bold">{dictionary.landlord.documentManagement}</h1>
        </div>

        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Input
            placeholder={dictionary.landlord.searchDocuments}
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
          <Select value={selectedTenant} onValueChange={setSelectedTenant}>
            <SelectTrigger>
              <SelectValue placeholder={dictionary.landlord.filterByTenant} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{dictionary.landlord.allTenants}</SelectItem>
              {mockTenants.map((tenant) => (
                <SelectItem key={tenant.id} value={tenant.id}>
                  {tenant.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder={dictionary.landlord.documentType} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{dictionary.landlord.allTypes}</SelectItem>
              {documentTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {dictionary.landlord[`documentType${type.value.charAt(0).toUpperCase() + type.value.slice(1)}`] || type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Documents List */}
        <Card>
          <CardHeader>
            <CardTitle>{dictionary.tenant.documents}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredDocuments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {dictionary.landlord.noDocumentsFound}
                </div>
              ) : (
                filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-indigo-100 p-2">
                        <svg
                          className="h-5 w-5 text-indigo-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">{doc.title}</h3>
                        <div className="text-sm text-gray-500 space-x-2">
                          <span>{doc.property.name}</span>
                          {doc.tenant && (
                            <>
                              <span>•</span>
                              <span>{doc.tenant.name}</span>
                            </>
                          )}
                          <span>•</span>
                          <span>{formatDate(doc.uploadDate)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right text-sm text-gray-500">
                        <div>{doc.fileType}</div>
                        <div>{doc.fileSize}</div>
                      </div>
                      <Button variant="outline" className="text-blue-600 hover:text-blue-700">
                        {dictionary.tenant.download}
                      </Button>
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