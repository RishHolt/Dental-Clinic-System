import React from "react";
import { PageHeader } from "./page-header";
import { cn } from "@/lib/utils";

export interface PageLayoutProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function PageLayout({
  title,
  description,
  action,
  children,
  className,
}: PageLayoutProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <PageHeader title={title} description={description}>
        {action}
      </PageHeader>
      {children}
    </div>
  );
}
