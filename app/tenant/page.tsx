"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
}

// Mock latest announcement
const latestAnnouncement: Announcement = {
  id: "1",
  title: "New Waste Management System Implementation",
  content: "Starting from March 1st, we will be implementing a new waste sorting system. All residents are required to separate their waste into three categories: recyclables, organic waste, and general waste. Dedicated bins will be provided in the waste collection area. This initiative aims to reduce our environmental impact and comply with new local regulations. Please attend the information session on February 25th at 6 PM in the community room for more details.",
  date: "2024-02-15"
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

export default function TenantDashboard() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Tenant Portal</h1>
          <Link href="/" className="flex-shrink-0">
            <Button variant="outline" className="text-red-600">Logout</Button>
          </Link>
        </div>

        {/* Announcement Window */}
        {latestAnnouncement && (
          <Card className="mb-8">
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-semibold text-blue-800 text-lg">
                    📢 {latestAnnouncement.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {formatDate(latestAnnouncement.date)}
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
                    <p className="text-gray-600">{latestAnnouncement.content}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <Link href="/tenant/announcements">
                        <Button variant="outline" size="sm">
                          All Announcements
                        </Button>
                      </Link>
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
        )}

        {/* Dashboard Cards */}
        <div className="grid grid-cols-2 gap-6">
          <Link
            href="/tenant/contact"
            className="flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg"
          >
            <div className="mb-4 rounded-full bg-blue-100 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-blue-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Contact Landlord</h2>
          </Link>

          <Link
            href="/tenant/rent"
            className="flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg"
          >
            <div className="mb-4 rounded-full bg-green-100 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-green-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Current Rent</h2>
          </Link>

          <Link
            href="/tenant/lease"
            className="flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg"
          >
            <div className="mb-4 rounded-full bg-purple-100 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-purple-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Lease Agreement</h2>
          </Link>

          <Link
            href="/tenant/maintenance"
            className="flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg"
          >
            <div className="mb-4 rounded-full bg-orange-100 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-orange-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Maintenance</h2>
          </Link>
        </div>
      </div>
    </div>
  );
} 