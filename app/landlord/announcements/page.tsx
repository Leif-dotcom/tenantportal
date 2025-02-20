"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState } from "react";

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

export default function AnnouncementsPage() {
  const [targetType, setTargetType] = useState<"all" | "property" | "region" | "tenant">("all");
  const [selectedTarget, setSelectedTarget] = useState("all");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/landlord" className="text-blue-600 hover:underline">
              ← Back to Dashboard
            </Link>
          </div>
          <h1 className="text-3xl font-bold">Announcements</h1>
        </div>

        {/* New Announcement Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create New Announcement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Audience
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <Select value={targetType} onValueChange={(value: "all" | "property" | "region" | "tenant") => setTargetType(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select target type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tenants</SelectItem>
                      <SelectItem value="property">Specific Property</SelectItem>
                      <SelectItem value="region">Region</SelectItem>
                      <SelectItem value="tenant">Individual Tenant</SelectItem>
                    </SelectContent>
                  </Select>

                  {targetType !== "all" && (
                    <Select value={selectedTarget} onValueChange={setSelectedTarget}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select target" />
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
                  Title
                </label>
                <Input
                  placeholder="Announcement title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <Textarea
                  placeholder="Write your announcement here..."
                  className="min-h-[150px]"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Save as Draft</Button>
                <Button onClick={handleSubmit}>Send Announcement</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Announcements History */}
        <Card>
          <CardHeader>
            <CardTitle>Announcement History</CardTitle>
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
                          ? " All Tenants"
                          : ` ${announcement.target.name}`}
                      </p>
                    </div>
                    <Badge variant="outline" className={
                      announcement.status === "sent" 
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }>
                      {announcement.status === "sent" ? "Sent" : "Draft"}
                    </Badge>
                  </div>
                  <p className="text-gray-600">{announcement.content}</p>
                  <div className="text-sm text-gray-500">
                    Read by {announcement.readBy} of {announcement.recipients} recipients
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