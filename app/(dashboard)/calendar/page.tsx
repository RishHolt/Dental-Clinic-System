"use client";

import { Card } from "@/components/ui/card";

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <Card className="rounded-2xl border border-border/60 bg-card p-6 md:p-8 min-h-[500px] shadow-xs">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          Calendar
        </h1>
      </Card>
    </div>
  );
}
