"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getDictionary } from "@/utils/i18n";

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  targetType: "all" | "property" | "region" | "tenant";
  target: {
    id: string;
    name: string;
  };
  status: "draft" | "sent";
  recipients: number;
  readBy: number;
}

const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Maintenance Schedule Update",
    content: "We will be conducting routine maintenance checks next week...",
    date: "2024-02-15",
    targetType: "property",
    target: {
      id: "1",
      name: "Riverside Residences"
    },
    status: "sent",
    recipients: 12,
    readBy: 8
  },
  {
    id: "2",
    title: "New Waste Management System",
    content: "Starting from March 1st, we will be implementing a new waste sorting system...",
    date: "2024-02-10",
    targetType: "region",
    target: {
      id: "north",
      name: "North Region"
    },
    status: "sent",
    recipients: 45,
    readBy: 30
  }
];

const mockProperties = [
  { id: "1", name: "Riverside Residences" },
  { id: "2", name: "Park View Complex" },
];

const mockRegions = [
  { id: "north", name: "North Region" },
  { id: "south", name: "South Region" },
  { id: "east", name: "East Region" },
  { id: "west", name: "West Region" },
];

const mockTenants = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
];

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

export default function AnnouncementsPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const [targetType, setTargetType] = useState<"all" | "property" | "region" | "tenant">("all");
  const [selectedTarget, setSelectedTarget] = useState("all");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [dictionary, setDictionary] = useState<any>(null);

  // Load the dictionary
  useEffect(() => {
    async function loadDictionary() {
      const dict = await getDictionary(lang);
      setDictionary(dict);
    }
    loadDictionary();
  }, [lang]);

  const getTargetOptions = () => {
    switch (targetType) {
      case "property":
        return mockProperties;
      case "region":
        return mockRegions;
      case "tenant":
        return mockTenants;
      default:
        return [];
    }
  };

  const handleSubmit = () => {
    // Handle announcement submission
    console.log({ targetType, selectedTarget, title, content });
  };

  if (!dictionary) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href={`/${lang}/landlord`} className="text-blue-600 hover:underline">
              {dictionary.common.backToDashboard}
            </Link>
          </div>
          <h1 className="text-3xl font-bold">{dictionary.landlord.announcements}</h1>
        </div>

        {/* New Announcement Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{dictionary.landlord.createNewAnnouncement}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {dictionary.landlord.targetAudience}
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <Select value={targetType} onValueChange={(value: "all" | "property" | "region" | "tenant") => setTargetType(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={dictionary.landlord.selectTargetType} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{dictionary.landlord.allTenants}</SelectItem>
                      <SelectItem value="property">{dictionary.landlord.specificProperty}</SelectItem>
                      <SelectItem value="region">{dictionary.landlord.region}</SelectItem>
                      <SelectItem value="tenant">{dictionary.landlord.individualTenant}</SelectItem>
                    </SelectContent>
                  </Select>

                  {targetType !== "all" && (
                    <Select value={selectedTarget} onValueChange={setSelectedTarget}>
                      <SelectTrigger>
                        <SelectValue placeholder={dictionary.landlord.selectTarget} />
                      </SelectTrigger>
                      <SelectContent>
                        {getTargetOptions().map((option) => (
                          <SelectItem key={option.id} value={option.id}>
                            {option.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {dictionary.landlord.title}
                </label>
                <Input
                  placeholder={dictionary.landlord.announcementTitle}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {dictionary.landlord.content}
                </label>
                <Textarea
                  placeholder={dictionary.landlord.writeAnnouncementHere}
                  className="min-h-[150px]"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">{dictionary.landlord.saveAsDraft}</Button>
                <Button onClick={handleSubmit}>{dictionary.landlord.sendAnnouncement}</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Announcements History */}
        <Card>
          <CardHeader>
            <CardTitle>{dictionary.landlord.announcementHistory}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAnnouncements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="border rounded-lg p-4 space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{announcement.title}</h3>
                      <p className="text-sm text-gray-500">
                        {formatDate(announcement.date)} • 
                        {announcement.targetType === "all" 
                          ? ` ${dictionary.landlord.allTenants}`
                          : ` ${announcement.target.name}`}
                      </p>
                    </div>
                    <Badge variant="outline" className={
                      announcement.status === "sent" 
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }>
                      {announcement.status === "sent" ? dictionary.landlord.sent : dictionary.landlord.draft}
                    </Badge>
                  </div>
                  <p className="text-gray-600">{announcement.content}</p>
                  <div className="text-sm text-gray-500">
                    {dictionary.landlord.readBy} {announcement.readBy} {dictionary.landlord.of} {announcement.recipients} {dictionary.landlord.recipients}
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