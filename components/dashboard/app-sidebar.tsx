"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid,
  RotateCcw,
  Calendar,
  Users,
  Files,
  HandCoins,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
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

interface AppSidebarProps {
  onItemClick?: () => void;
  className?: string;
  collapsed?: boolean;
}

export function AppSidebar({
  onItemClick,
  className,
  collapsed = false,
}: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [, startTransition] = React.useTransition();

  // Track pending active path for instant UI feedback
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [pendingPath, setPendingPath] = useState<string | null>(null);

  // Sync pending path when route transition completes (official React pattern for state adjustments)
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setPendingPath(null);
  }

  const currentPath = pendingPath ?? pathname;

  // Pre-warm client cache for all sidebar routes
  useEffect(() => {
    NAV_SECTIONS.forEach((section) => {
      section.items.forEach((item) => {
        router.prefetch(item.href);
      });
    });
  }, [router]);

  const isItemActive = (href: string) => {
    if (href === "/dashboard") {
      return currentPath === "/" || currentPath === "/dashboard";
    }
    return currentPath.startsWith(href);
  };

  const handleItemClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    // Ignore click if already on or pending for this tab
    if (isItemActive(href)) {
      return;
    }

    // Immediately update visual highlight for instant UI feedback
    setPendingPath(href);
    onItemClick?.();

    // Transition smoothly without blocking or deadlocking
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-background border-r border-border select-none overflow-hidden transition-[width] duration-300 ease-in-out py-4 pl-3 pr-0",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Navigation Sections */}
      <div className="flex-1 space-y-5 overflow-y-auto overflow-x-hidden pr-0">
        {NAV_SECTIONS.map((section, idx) => (
          <div key={section.title} className="space-y-1">
            {/* Section Header */}
            <div
              className={cn(
                "whitespace-nowrap overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out",
                collapsed
                  ? "max-h-0 opacity-0 pointer-events-none"
                  : "max-h-7 opacity-100"
              )}
            >
              <h3 className="px-3 text-sm font-bold text-foreground pb-1.5 tracking-tight">
                {section.title}
              </h3>
            </div>

            {/* Collapsed Divider */}
            {idx > 0 && (
              <div
                className={cn(
                  "overflow-hidden transition-[max-height,opacity,margin] duration-300 ease-in-out flex items-center",
                  collapsed ? "max-h-5 opacity-100 my-1.5 pr-3" : "max-h-0 opacity-0 my-0"
                )}
              >
                <div className="w-7 mx-auto border-t border-border/60" />
              </div>
            )}

            {/* Navigation Items */}
            <nav className="space-y-1">
              {section.items.map((item) => {
                const active = isItemActive(item.href);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={true}
                    onClick={(e) => handleItemClick(e, item.href)}
                    title={item.title}
                    className={cn(
                      "flex items-center h-12 w-full rounded-l-2xl rounded-r-none transition-colors duration-150 group relative overflow-hidden",
                      active
                        ? "bg-primary text-primary-foreground font-bold shadow-xs"
                        : "text-muted-foreground"
                    )}
                  >
                    {/* Hover Pill: Slides smoothly from right to left */}
                    {!active && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-muted rounded-l-2xl rounded-r-none translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out pointer-events-none z-0"
                      />
                    )}

                    {/* Fixed size icon container: ALWAYS centered in slot */}
                    <div className="size-11 shrink-0 flex items-center justify-center relative z-10">
                      <Icon
                        className={cn(
                          "size-5.5 shrink-0 transition-colors duration-150",
                          active
                            ? "text-primary-foreground stroke-[2.2]"
                            : "text-muted-foreground group-hover:text-foreground stroke-[1.9]"
                        )}
                      />
                    </div>

                    {/* Smoothly animated text label */}
                    <span
                      className={cn(
                        "relative z-10 whitespace-nowrap overflow-hidden transition-[max-width,opacity,transform] duration-300 ease-in-out text-sm font-semibold tracking-tight",
                        collapsed
                          ? "max-w-0 opacity-0 translate-x-4 pointer-events-none"
                          : "max-w-44 opacity-100 translate-x-0 pr-3",
                        !active && "text-muted-foreground group-hover:text-foreground"
                      )}
                    >
                      {item.title}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* User Profile Card at Bottom */}
      <div className="pt-3 mt-auto border-t border-border/50 pr-3">
        <button
          type="button"
          title={collapsed ? "Admin User (Admin)" : undefined}
          className="group flex items-center h-12 w-full rounded-xl bg-muted/40 hover:bg-muted/70 transition-colors text-left border border-border/50 overflow-hidden relative"
        >
          {/* Avatar Container */}
          <div className="size-10 shrink-0 flex items-center justify-center relative z-10">
            <Avatar
              size="sm"
              className="size-8 rounded-full bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shrink-0"
            >
              <AvatarFallback className="bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-bold text-xs">
                AU
              </AvatarFallback>
            </Avatar>
          </div>

          {/* User Details */}
          <div
            className={cn(
              "relative z-10 flex items-center justify-between flex-1 min-w-0 overflow-hidden whitespace-nowrap transition-[max-width,opacity,transform] duration-300 ease-in-out",
              collapsed
                ? "max-w-0 opacity-0 translate-x-4 pointer-events-none"
                : "max-w-[170px] opacity-100 translate-x-0 pr-3"
            )}
          >
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-foreground truncate leading-tight">
                Admin User
              </span>
              <span className="text-xs text-muted-foreground truncate leading-tight mt-0.5">
                Admin
              </span>
            </div>
            <ChevronUp className="size-4 text-muted-foreground shrink-0 ml-1.5" />
          </div>
        </button>
      </div>
    </aside>
  );
}
