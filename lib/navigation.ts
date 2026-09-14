import type { ComponentType } from "react";
import {
  LayoutGrid,
  RotateCcw,
  Calendar,
  Users,
  Files,
  HandCoins,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const NAV_SECTIONS: NavSection[] = [
  {
    title: "Today",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutGrid,
      },
      {
        title: "Daily Waitlist",
        href: "/daily-waitlist",
        icon: RotateCcw,
      },
      {
        title: "Calendar",
        href: "/calendar",
        icon: Calendar,
      },
    ],
  },
  {
    title: "Records",
    items: [
      {
        title: "Patient",
        href: "/patient",
        icon: Users,
      },
      {
        title: "Masterfile",
        href: "/masterfile",
        icon: Files,
      },
    ],
  },
  {
    title: "Finance",
    items: [
      {
        title: "Expenses",
        href: "/expenses",
        icon: HandCoins,
      },
    ],
  },
];

/**
 * Mapping of route segments or exact paths to human-readable titles.
 */
export const ROUTE_TITLE_MAP: Record<string, string> = {
  dashboard: "Dashboard",
  "daily-waitlist": "Daily Waitlist",
  calendar: "Calendar",
  patient: "Patient",
  masterfile: "Masterfile",
  expenses: "Expenses",
};

/**
 * Returns a human-friendly title given a pathname.
 */
export function getRouteTitle(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const primarySegment = segments[0] || "dashboard";
  return ROUTE_TITLE_MAP[primarySegment] || "Dashboard";
}
