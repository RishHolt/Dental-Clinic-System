import type { Metadata } from "next";
import {
  Clock,
  UserCheck,
  Users,
  CheckCircle2,
  Plus,
} from "lucide-react";
import { PageLayout } from "@/components/dashboard/page-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { MOCK_WAITLIST } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Daily Waitlist",
};

export default function DailyWaitlistPage() {
  const inChairCount = MOCK_WAITLIST.filter((p) => p.status === "In Chair").length;
  const waitingCount = MOCK_WAITLIST.filter((p) => p.status === "Waiting").length;
  const completedCount = MOCK_WAITLIST.filter((p) => p.status === "Completed").length;

  return (
    <PageLayout
      title="Daily Waitlist"
      description="Monitor queue status, arrival times, and operatory chair assignments for today."
      action={
        <Button size="sm">
          <Plus className="size-3.5 mr-1.5" />
          Check-In Patient
        </Button>
      }
    >
      {/* Queue Stat Banners */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border-border/70 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
              <UserCheck className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">In Chair (Active)</p>
              <p className="text-xl font-bold text-foreground">{inChairCount} Patients</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-border/70 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
              <Users className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">In Waiting Room</p>
              <p className="text-xl font-bold text-foreground">{waitingCount} Patients</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-border/70 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0">
              <Clock className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Avg. Wait Time</p>
              <p className="text-xl font-bold text-foreground">18 mins</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-border/70 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Completed Today</p>
              <p className="text-xl font-bold text-foreground">{completedCount} Patients</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Waitlist Table */}
      <Card className="border-border/70 shadow-xs overflow-hidden">
        <CardHeader className="pb-3 border-b border-border/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base font-semibold">Today&apos;s Queue Register</CardTitle>
              <CardDescription>Real-time queue tracking for September 14, 2026</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                Total: {MOCK_WAITLIST.length}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="w-16 text-center">Queue</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Arrival Time</TableHead>
                <TableHead>Est. Wait</TableHead>
                <TableHead>Procedure</TableHead>
                <TableHead>Dentist</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_WAITLIST.map((item) => (
                <TableRow key={item.queueNo} className="hover:bg-muted/30">
                  <TableCell className="text-center font-bold text-foreground">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-muted text-xs">
                      {item.queueNo}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold text-foreground">{item.patientName}</div>
                    <div className="text-xs text-muted-foreground">{item.patientId}</div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={item.type === "Scheduled" ? "secondary" : "outline"}
                      className="text-[11px]"
                    >
                      {item.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground tabular-nums">
                    {item.arrivedAt}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground tabular-nums">
                    {item.estimatedWait}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-foreground">
                    {item.procedure}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {item.dentist}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "In Chair"
                          ? "default"
                          : item.status === "Completed"
                          ? "secondary"
                          : "outline"
                      }
                      className="text-[11px]"
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="xs" className="h-7 text-xs">
                      {item.status === "Waiting"
                        ? "Call In"
                        : item.status === "In Chair"
                        ? "Complete"
                        : "Details"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </PageLayout>
  );
}
