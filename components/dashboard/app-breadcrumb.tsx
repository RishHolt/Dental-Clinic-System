"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const ROUTE_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  "daily-waitlist": "Daily Waitlist",
  calendar: "Calendar",
  patient: "Patient",
  masterfile: "Masterfile",
  expenses: "Expenses",
};

export function AppBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // If on root or empty segments, default to Dashboard
  const currentKey = segments[0] || "dashboard";
  const currentLabel = ROUTE_LABELS[currentKey] || "Dashboard";

  return (
    <Breadcrumb>
      <BreadcrumbList className="text-sm font-normal text-muted-foreground">
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="/dashboard" />}>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-normal text-muted-foreground">
            {currentLabel}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
