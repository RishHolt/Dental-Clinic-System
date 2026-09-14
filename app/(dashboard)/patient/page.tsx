import type { Metadata } from "next";
import {
  Search,
  UserPlus,
  AlertCircle,
  FileText,
  Filter,
} from "lucide-react";
import { PageLayout } from "@/components/dashboard/page-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { MOCK_PATIENTS } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Patient Records",
};

export default function PatientPage() {
  return (
    <PageLayout
      title="Patient Records"
      description="Patient directory, medical alerts, treatment histories, and recall schedules."
      action={
        <Button size="sm">
          <UserPlus className="size-3.5 mr-1.5" />
          Add Patient Record
        </Button>
      }
    >
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search patient name, ID (PT-xxxx), phone number..."
            className="pl-9 h-10 bg-card border-border/70"
          />
        </div>
        <Button variant="outline" size="sm" className="h-10 shrink-0">
          <Filter className="size-3.5 mr-1.5" />
          Filter Alerts
        </Button>
      </div>

      {/* Patient Table Card */}
      <Card className="border-border/70 shadow-xs overflow-hidden">
        <CardHeader className="pb-3 border-b border-border/40">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Active Patients</CardTitle>
              <CardDescription>Showing {MOCK_PATIENTS.length} recently accessed records</CardDescription>
            </div>
            <span className="text-xs text-muted-foreground">
              Total Database: 1,248
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead>Patient ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age / Gender</TableHead>
                <TableHead>Contact Phone</TableHead>
                <TableHead>Medical Alert</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_PATIENTS.map((patient) => (
                <TableRow key={patient.id} className="hover:bg-muted/30">
                  <TableCell className="font-mono text-xs font-semibold text-foreground">
                    {patient.id}
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold text-foreground">{patient.name}</div>
                    <div className="text-[11px] text-muted-foreground">Next: {patient.nextVisit}</div>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {patient.age} y/o • {patient.gender}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {patient.phone}
                  </TableCell>
                  <TableCell>
                    {patient.medicalAlert !== "None" ? (
                      <Badge variant="destructive" className="text-[10px] flex items-center gap-1 w-fit">
                        <AlertCircle className="size-3" />
                        {patient.medicalAlert}
                      </Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {patient.lastVisit}
                  </TableCell>
                  <TableCell className="text-xs font-semibold text-foreground tabular-nums">
                    {patient.balance > 0 ? (
                      <span className="text-amber-600 dark:text-amber-400">
                        ₱{patient.balance.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">₱0.00</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="xs" className="h-7 text-xs">
                      <FileText className="size-3 mr-1" />
                      View Chart
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
