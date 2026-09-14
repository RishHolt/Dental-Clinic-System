import type { Metadata } from "next";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  Armchair,
} from "lucide-react";
import { PageLayout } from "@/components/dashboard/page-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_APPOINTMENTS } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Calendar",
};

export default function CalendarPage() {
  const chair1Appointments = MOCK_APPOINTMENTS.filter((a) => a.operatory === "Chair 1");
  const chair2Appointments = MOCK_APPOINTMENTS.filter((a) => a.operatory === "Chair 2");

  return (
    <PageLayout
      title="Calendar"
      description="Daily operatory schedule, appointments, and dentist chair availability."
      action={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ChevronLeft className="size-4 mr-1" />
            Prev
          </Button>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-semibold">
            <CalendarIcon className="size-3.5 text-muted-foreground" />
            <span>Sep 14, 2026 (Today)</span>
          </div>
          <Button variant="outline" size="sm">
            Next
            <ChevronRight className="size-4 ml-1" />
          </Button>
          <Button size="sm">
            <Plus className="size-3.5 mr-1.5" />
            Book Slot
          </Button>
        </div>
      }
    >
      {/* Schedule by Operatory Chairs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chair 1 Column */}
        <Card className="border-border/70 shadow-xs flex flex-col">
          <CardHeader className="border-b border-border/40 pb-4 bg-muted/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Armchair className="size-4" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold">Operatory Chair 1</CardTitle>
                  <CardDescription className="text-xs">Dr. Santos • General & Orthodontics</CardDescription>
                </div>
              </div>
              <Badge variant="secondary" className="text-xs">
                {chair1Appointments.length} Booked
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-3 flex-1">
            {chair1Appointments.map((apt) => (
              <div
                key={apt.id}
                className="p-3.5 rounded-xl border border-border/50 bg-card hover:border-border transition-colors space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-muted text-foreground flex items-center gap-1">
                    <Clock className="size-3 text-muted-foreground" />
                    {apt.time} ({apt.duration})
                  </span>
                  <Badge
                    variant={
                      apt.status === "In Progress"
                        ? "default"
                        : apt.status === "Completed"
                        ? "secondary"
                        : "outline"
                    }
                    className="text-[10px]"
                  >
                    {apt.status}
                  </Badge>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">{apt.patientName}</h4>
                  <p className="text-xs text-muted-foreground">{apt.patientId} • {apt.procedure}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Chair 2 Column */}
        <Card className="border-border/70 shadow-xs flex flex-col">
          <CardHeader className="border-b border-border/40 pb-4 bg-muted/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Armchair className="size-4" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold">Operatory Chair 2</CardTitle>
                  <CardDescription className="text-xs">Dr. Lim • Prosthodontics & Endodontics</CardDescription>
                </div>
              </div>
              <Badge variant="secondary" className="text-xs">
                {chair2Appointments.length} Booked
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-3 flex-1">
            {chair2Appointments.map((apt) => (
              <div
                key={apt.id}
                className="p-3.5 rounded-xl border border-border/50 bg-card hover:border-border transition-colors space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-muted text-foreground flex items-center gap-1">
                    <Clock className="size-3 text-muted-foreground" />
                    {apt.time} ({apt.duration})
                  </span>
                  <Badge
                    variant={
                      apt.status === "In Progress"
                        ? "default"
                        : apt.status === "Completed"
                        ? "secondary"
                        : "outline"
                    }
                    className="text-[10px]"
                  >
                    {apt.status}
                  </Badge>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">{apt.patientName}</h4>
                  <p className="text-xs text-muted-foreground">{apt.patientId} • {apt.procedure}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
