"use client";

import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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

function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="p-4">
      <div className="mb-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold text-blue-800">
              📢 {announcement.title}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {formatDate(announcement.date)}
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show Less' : 'More Details'}
          </Button>
        </div>
        {isExpanded && (
          <>
            <div className="mt-4">
              <p className="text-gray-600">{announcement.content}</p>
            </div>
            <div className="mt-4 pt-4 border-t">
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
          </>
        )}
      </div>
    </Card>
  );
}

export default function AnnouncementsPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/tenant" className="text-blue-600 hover:underline">
              ← Back to Dashboard
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Announcements</h1>
        </div>

        <div className="space-y-4">
          {announcements.map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </div>
      </div>
    </div>
  );
} 