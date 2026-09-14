"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronUp, User, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_SECTIONS } from "@/lib/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

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

  const isItemActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/" || pathname === "/dashboard";
    }
    return pathname.startsWith(href);
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
                "whitespace-nowrap overflow-hidden transition-[max-height,opacity,transform] duration-200 ease-in-out",
                collapsed
                  ? "max-h-0 opacity-0 -translate-x-2 pointer-events-none"
                  : "max-h-7 opacity-100 translate-x-0 delay-75"
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
            <nav className="space-y-1" aria-label={section.title}>
              {section.items.map((item) => {
                const active = isItemActive(item.href);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => onItemClick?.()}
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
                        "relative z-10 whitespace-nowrap overflow-hidden text-sm font-semibold tracking-tight transition-[opacity,transform] duration-200 ease-in-out",
                        collapsed
                          ? "opacity-0 -translate-x-2 pointer-events-none invisible w-0"
                          : "opacity-100 translate-x-0 visible delay-100 flex-1 pr-3",
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

      {/* User Profile Dropdown Menu at Bottom */}
      <div className="pt-3 mt-auto border-t border-border/50 pr-3">
        <DropdownMenu>
          <DropdownMenuTrigger
            title={collapsed ? "Admin User (Admin)" : undefined}
            className="group flex items-center h-12 w-full rounded-xl bg-muted/40 hover:bg-muted/70 transition-colors text-left border border-border/50 overflow-hidden relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                "relative z-10 flex items-center justify-between flex-1 min-w-0 overflow-hidden whitespace-nowrap transition-[opacity,transform] duration-200 ease-in-out",
                collapsed
                  ? "opacity-0 -translate-x-2 pointer-events-none invisible w-0"
                  : "opacity-100 translate-x-0 visible delay-100 pr-3"
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
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side={collapsed ? "right" : "top"}
            align={collapsed ? "end" : "start"}
            sideOffset={8}
            className="w-56"
          >
            <DropdownMenuLabel className="p-2 font-normal">
              <div className="flex items-center gap-2.5">
                <Avatar
                  size="sm"
                  className="size-8 rounded-full bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shrink-0"
                >
                  <AvatarFallback className="bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-bold text-xs">
                    AU
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate leading-tight">
                    Admin User
                  </p>
                  <p className="text-xs text-muted-foreground truncate leading-tight mt-0.5">
                    admin@canudental.com
                  </p>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
                <User className="size-4 mr-2" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="size-4 mr-2" />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
              <LogOut className="size-4 mr-2" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
