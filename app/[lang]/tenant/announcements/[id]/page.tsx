"use client";

import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
}

// Mock announcements data
const announcements: Announcement[] = [
  {
    id: "1",
    title: "New Waste Management System Implementation",
    content: "Starting from March 1st, we will be implementing a new waste sorting system. All residents are required to separate their waste into three categories: recyclables, organic waste, and general waste. Dedicated bins will be provided in the waste collection area. This initiative aims to reduce our environmental impact and comply with new local regulations. Please attend the information session on February 25th at 6 PM in the community room for more details.",
    date: "2024-02-15"
  },
  {
    id: "2",
    title: "Building Maintenance Notice",
    content: "We will be conducting routine maintenance of the building's heating system on Monday, February 19th, between 9 AM and 2 PM. During this time, the heating system will be temporarily shut down. Please plan accordingly.",
    date: "2024-02-12"
  },
  {
    id: "3",
    title: "Community Event: Spring Garden Planning",
    content: "Join us for a community garden planning session on March 2nd at 11 AM. We'll discuss plans for the shared garden space and distribute seeds for the upcoming growing season.",
    date: "2024-02-10"
  }
];

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

export default function AnnouncementDetailPage({ params }: { params: { id: string } }) {
  const announcement = announcements.find(a => a.id === params.id);

  if (!announcement) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/tenant/announcements" className="text-blue-600 hover:underline">
              ← Back to Announcements
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Announcement Details</h1>
        </div>

        <Card className="p-6">
          <div className="mb-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-blue-800">
                📢 {announcement.title}
              </h2>
              <span className="text-sm text-gray-500">
                {formatDate(announcement.date)}
              </span>
            </div>
            <div className="prose max-w-none">
              <p className="text-gray-600 whitespace-pre-wrap">{announcement.content}</p>
            </div>
          </div>
          <div className="border-t pt-4">
            <p className="text-sm text-gray-500">
              If you have any questions about this announcement, please contact your landlord through the Contact page.
            </p>
            <div className="mt-4">
              <Link href="/tenant/contact">
                <Button variant="outline" size="sm">
                  Contact Landlord
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 