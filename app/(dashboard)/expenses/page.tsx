import type { Metadata } from "next";
import {
  Receipt,
  CreditCard,
  Building2,
  Wrench,
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
import { MOCK_EXPENSES } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Expenses",
};

export default function ExpensesPage() {
  const totalExpenses = MOCK_EXPENSES.reduce((sum, item) => sum + item.amount, 0);

  return (
    <PageLayout
      title="Expenses"
      description="Track clinic operational costs, dental materials procurement, and laboratory fees."
      action={
        <Button size="sm">
          <Plus className="size-3.5 mr-1.5" />
          Record Expense
        </Button>
      }
    >
      {/* Expense Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border-border/70 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center shrink-0">
              <Receipt className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Total Disbursed (Sep)</p>
              <p className="text-xl font-bold text-foreground">₱{totalExpenses.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-border/70 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
              <CreditCard className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Dental Supplies</p>
              <p className="text-xl font-bold text-foreground">₱26,300</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-border/70 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0">
              <Building2 className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Dental Lab Fees</p>
              <p className="text-xl font-bold text-foreground">₱24,000</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-border/70 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
              <Wrench className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Utilities & Maintenance</p>
              <p className="text-xl font-bold text-foreground">₱19,700</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Expense Ledger Table */}
      <Card className="border-border/70 shadow-xs overflow-hidden">
        <CardHeader className="pb-3 border-b border-border/40">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Expenditure Ledger</CardTitle>
              <CardDescription>Logged invoices, vouchers, and operating disbursements</CardDescription>
            </div>
            <span className="text-xs text-muted-foreground">
              {MOCK_EXPENSES.length} Transactions
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="w-28">Voucher ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Particulars</TableHead>
                <TableHead>Payee / Vendor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_EXPENSES.map((exp) => (
                <TableRow key={exp.id} className="hover:bg-muted/30">
                  <TableCell className="font-mono text-xs font-semibold text-foreground">
                    {exp.id}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground tabular-nums">
                    {exp.date}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-[11px]">
                      {exp.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-foreground">
                    {exp.description}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {exp.payee}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={exp.status === "Paid" ? "default" : "outline"}
                      className="text-[10px]"
                    >
                      {exp.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-bold text-foreground tabular-nums text-sm">
                    ₱{exp.amount.toLocaleString()}
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
