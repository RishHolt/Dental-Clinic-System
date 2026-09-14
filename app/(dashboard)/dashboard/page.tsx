import type { Metadata } from "next";
import Link from "next/link";
import {
  Calendar,
  Users,
  Clock,
  CircleDollarSign,
  UserPlus,
  RotateCcw,
  ArrowUpRight,
} from "lucide-react";
import { PageLayout } from "@/components/dashboard/page-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CLINIC_STATS,
  MOCK_APPOINTMENTS,
  MOCK_WAITLIST,
} from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  const activeQueue = MOCK_WAITLIST.filter((p) => p.status !== "Completed");
  const upcomingAppointments = MOCK_APPOINTMENTS.slice(0, 5);

  return (
    <PageLayout
      title="Dashboard"
      description="Welcome back, Admin. Live clinic queue, operations, and today's schedule."
      action={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" render={<Link href="/daily-waitlist" />}>
            <RotateCcw className="size-3.5 mr-1.5" />
            Check-In Patient
          </Button>
          <Button size="sm" render={<Link href="/patient" />}>
            <UserPlus className="size-3.5 mr-1.5" />
            New Patient
          </Button>
        </div>
      }
    >
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 border-border/70 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Today&apos;s Appointments</span>
            <div className="size-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <Calendar className="size-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold tracking-tight text-foreground">
              {CLINIC_STATS.todayAppointments}
            </span>
            <p className="text-xs text-muted-foreground mt-0.5">
              2 in chair • 4 completed
            </p>
          </div>
        </Card>

        <Card className="p-5 border-border/70 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Waiting Queue</span>
            <div className="size-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Clock className="size-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold tracking-tight text-foreground">
              {CLINIC_STATS.patientsWaiting}
            </span>
            <p className="text-xs text-muted-foreground mt-0.5">
              ~20 mins average wait
            </p>
          </div>
        </Card>

        <Card className="p-5 border-border/70 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Today&apos;s Collections</span>
            <div className="size-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <CircleDollarSign className="size-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold tracking-tight text-foreground">
              ₱{CLINIC_STATS.todayRevenue.toLocaleString()}
            </span>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5 font-medium">
              +14% vs yesterday
            </p>
          </div>
        </Card>

        <Card className="p-5 border-border/70 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Active Patients</span>
            <div className="size-8 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <Users className="size-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold tracking-tight text-foreground">
              {CLINIC_STATS.activePatientsTotal.toLocaleString()}
            </span>
            <p className="text-xs text-muted-foreground mt-0.5">
              +18 registered this week
            </p>
          </div>
        </Card>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule Column (Span 2) */}
        <Card className="lg:col-span-2 border-border/70 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-base font-semibold">Today&apos;s Dental Schedule</CardTitle>
              <CardDescription>Live operatory sessions and scheduled treatments</CardDescription>
            </div>
            <Button variant="ghost" size="sm" render={<Link href="/calendar" className="text-xs" />}>
              View Calendar
              <ArrowUpRight className="size-3.5 ml-1" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingAppointments.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted/70 transition-colors border border-border/40"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="text-center shrink-0 w-16 px-2 py-1 rounded-lg bg-background border border-border/60">
                    <span className="text-xs font-semibold text-foreground block leading-tight">
                      {item.time.split(" ")[0]}
                    </span>
                    <span className="text-[10px] text-muted-foreground block uppercase leading-tight">
                      {item.time.split(" ")[1]}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{item.patientName}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.procedure} • {item.operatory}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge
                    variant={
                      item.status === "In Progress"
                        ? "default"
                        : item.status === "Completed"
                        ? "secondary"
                        : "outline"
                    }
                    className="text-[11px]"
                  >
                    {item.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Live Waitlist Queue Column (Span 1) */}
        <Card className="border-border/70 shadow-xs flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-base font-semibold">Live Waitlist Queue</CardTitle>
              <CardDescription>{activeQueue.length} patient(s) in queue</CardDescription>
            </div>
            <Button variant="ghost" size="sm" render={<Link href="/daily-waitlist" className="text-xs" />}>
              All
              <ArrowUpRight className="size-3.5 ml-1" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3 flex-1">
            {activeQueue.map((item) => (
              <div
                key={item.queueNo}
                className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/40"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="size-7 rounded-lg bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0">
                    {item.queueNo}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate leading-tight">
                      {item.patientName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate leading-tight mt-0.5">
                      {item.type} • {item.dentist}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={item.status === "In Chair" ? "default" : "secondary"}
                  className="text-[10px] shrink-0"
                >
                  {item.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
