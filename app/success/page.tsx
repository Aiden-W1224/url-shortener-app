import Link from "next/link";
import React from "react";
import { isMobile } from 'react-device-detect';
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";

type SuccessPageProps = {
  searchParams: {
    code: string;
  };
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { code } = searchParams;
  const deviceType = isMobile ? 'Mobile' : 'Desktop';
  const analyticsData = await db.analytics.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
  });
  const session = await getServerSession(authOptions);
  if (session?.user && 'admin' in session.user) {
    const isAdmin = session?.user.admin || false;
  
    if (isAdmin) {
      return (
        <div>
          <h1 className="text-2xl text-slate-700 my-4 text-center">
            Here is your shortened Url:
          </h1>
          <Link className="text-blue-500" href={`${process.env.NEXTPUBLIC_URL}/api/${code}`}>
            {process.env.NEXTPUBLIC_URL}/api/{code}
          </Link>
          <div className="text-left">
            As an admin, you get to view these special analytics:
            <ul className="list-disc pl-4">
              <li>Clicked: {analyticsData?.clicked}</li>
              <li>Device Type: {deviceType}</li>
              <li>OS Type: NOT DONE</li>
              <li>Location: NOT DONE</li>
            </ul>
          </div>
        </div>
      );
    } else {
      // Return something else for non-admin users
      return (
        <div>
          <h1 className="text-2xl text-slate-700 my-4 text-center">
            Here is your shortened Url:
          </h1>
          <Link className="text-blue-500" href={`${process.env.NEXTPUBLIC_URL}/api/${code}`}>
            {process.env.NEXTPUBLIC_URL}/api/{code}
          </Link>
          <p className="text-left">
            You do not have permission to view special analytics.
          </p>
        </div>
      );
    }
  }
  
}
