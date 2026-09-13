"use client";

import { Card } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Top Welcome Card */}
      <Card className="rounded-2xl border border-border/60 bg-card p-6 md:p-8 min-h-[240px] shadow-xs">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          Welcome, Admin User!
        </h1>
      </Card>

      {/* Two Column Blank Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-2xl border border-border/60 bg-card min-h-[420px] shadow-xs" />
        <Card className="rounded-2xl border border-border/60 bg-card min-h-[420px] shadow-xs" />
      </div>
    </div>
  );
}
