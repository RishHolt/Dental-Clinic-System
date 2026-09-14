"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ClinicLogo } from "./clinic-logo";
import { AppSidebar } from "./app-sidebar";
import { AppBreadcrumb } from "./app-breadcrumb";
import { HeaderDateTime } from "./header-date-time";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);

  // Close mobile drawer on Escape key and lock body scroll
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const toggleSidebar = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setMobileMenuOpen((prev) => !prev);
    } else {
      setDesktopCollapsed((prev) => !prev);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-background text-foreground antialiased">
      {/* Top Header Bar */}
      <header className="flex h-16 w-full shrink-0 items-center border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 z-30">
        {/* Top-left Box (Logo + Hamburger Toggle) */}
        <div
          className={cn(
            "flex h-full shrink-0 items-center border-r border-border transition-[width,padding] duration-300 ease-in-out overflow-hidden",
            desktopCollapsed
              ? "w-16 px-3"
              : "w-64 pl-4 pr-3"
          )}
        >
          {/* Logo container */}
          <div className="flex-1 min-w-0 overflow-hidden flex items-center justify-center">
            <ClinicLogo collapsed={desktopCollapsed} />
          </div>

          {/* Hamburger Menu Toggle Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="text-muted-foreground hover:text-foreground shrink-0 transition-colors size-10 p-0 flex items-center justify-center rounded-xl ml-auto"
            aria-label={
              mobileMenuOpen
                ? "Close navigation menu"
                : desktopCollapsed
                  ? "Expand navigation"
                  : "Collapse navigation"
            }
            aria-expanded={mobileMenuOpen}
            title={desktopCollapsed ? "Expand navigation" : "Collapse navigation"}
          >
            <Menu className="size-5" />
          </Button>
        </div>

        {/* Breadcrumb & Date/Time Section */}
        <div className="flex flex-1 items-center justify-between px-6 py-2 min-w-0">
          <AppBreadcrumb />
          <div className="flex items-center gap-3 shrink-0">
            <HeaderDateTime />
            <div className="h-4 w-px bg-border/80 shrink-0" />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main App Layout: spans 100% remaining height */}
      <div className="flex flex-1 w-full overflow-hidden relative min-h-0">
        {/* Desktop Sidebar: animates width seamlessly with the header and takes full height */}
        <AppSidebar
          collapsed={desktopCollapsed}
          className="hidden md:flex shrink-0 h-full"
        />

        {/* Mobile Sidebar Overlay Drawer */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-50 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation drawer"
          >
            {/* Backdrop */}
            <div
              aria-hidden="true"
              className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Drawer */}
            <div className="fixed inset-y-0 left-0 z-50 w-64 bg-background shadow-xl flex flex-col h-full">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
                <ClinicLogo />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(false)}
                  className="size-8 p-1"
                  aria-label="Close navigation"
                >
                  <X className="size-5" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <AppSidebar onItemClick={() => setMobileMenuOpen(false)} className="border-none w-full" />
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-muted/30 p-4 md:p-6 lg:p-7 min-w-0">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
