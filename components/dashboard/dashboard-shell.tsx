"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { ClinicLogo } from "./clinic-logo";
import { AppSidebar } from "./app-sidebar";
import { AppBreadcrumb } from "./app-breadcrumb";
import { HeaderDateTime } from "./header-date-time";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);

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
            "flex h-full shrink-0 items-center border-r border-border transition-[width] duration-300 ease-in-out overflow-hidden px-3",
            desktopCollapsed ? "w-16 justify-center" : "w-64 justify-between"
          )}
        >
          {/* Logo container: completely hidden and collapsed when sidebar is collapsed */}
          <div
            className={cn(
              "overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out flex items-center",
              desktopCollapsed
                ? "max-w-0 opacity-0 -translate-x-6 pointer-events-none"
                : "max-w-[180px] opacity-100 translate-x-0"
            )}
          >
            <ClinicLogo />
          </div>

          {/* Hamburger Menu Toggle Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className={cn(
              "text-muted-foreground hover:text-foreground shrink-0 transition-colors size-10 p-0 flex items-center justify-center rounded-xl",
              desktopCollapsed ? "mx-auto" : "ml-auto"
            )}
            aria-label={desktopCollapsed ? "Expand navigation" : "Collapse navigation"}
            title={desktopCollapsed ? "Expand navigation" : "Collapse navigation"}
          >
            <Menu className="size-5" />
          </Button>
        </div>

        {/* Breadcrumb & Date/Time Section */}
        <div className="flex flex-1 items-center justify-between px-6 py-2 min-w-0">
          <AppBreadcrumb />
          <HeaderDateTime />
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
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Drawer */}
            <div className="fixed inset-y-0 left-0 z-50 w-64 bg-background shadow-xl flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-border shrink-0">
                <ClinicLogo />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(false)}
                  className="size-8 p-1"
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
