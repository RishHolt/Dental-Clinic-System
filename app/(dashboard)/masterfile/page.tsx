import type { Metadata } from "next";
import { Plus, AlertTriangle } from "lucide-react";
import { PageLayout } from "@/components/dashboard/page-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { MOCK_SERVICES, MOCK_SUPPLIES } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Masterfile",
};

export default function MasterfilePage() {
  return (
    <PageLayout
      title="Masterfile"
      description="Service catalog, dental procedure pricing, materials inventory, and clinic master references."
      action={
        <Button size="sm">
          <Plus className="size-3.5 mr-1.5" />
          Add Master Record
        </Button>
      }
    >
      <Tabs defaultValue="services" className="space-y-4">
        <TabsList className="bg-muted/60 p-1">
          <TabsTrigger value="services" className="text-xs px-3">
            Dental Procedures & Fees
          </TabsTrigger>
          <TabsTrigger value="supplies" className="text-xs px-3">
            Clinical Materials & Stock
          </TabsTrigger>
        </TabsList>

        {/* Services Tab */}
        <TabsContent value="services">
          <Card className="border-border/70 shadow-xs overflow-hidden">
            <CardHeader className="pb-3 border-b border-border/40">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Standard Dental Procedures</CardTitle>
                  <CardDescription>Official fee schedule and standard slot durations</CardDescription>
                </div>
                <Badge variant="outline" className="text-xs">
                  {MOCK_SERVICES.length} Procedures
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="w-28">Code</TableHead>
                    <TableHead>Procedure Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead className="text-right">Standard Fee</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_SERVICES.map((srv) => (
                    <TableRow key={srv.code} className="hover:bg-muted/30">
                      <TableCell className="font-mono text-xs font-semibold text-foreground">
                        {srv.code}
                      </TableCell>
                      <TableCell className="font-semibold text-foreground">
                        {srv.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-[11px]">
                          {srv.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {srv.durationMinutes} mins
                      </TableCell>
                      <TableCell className="text-right font-semibold text-foreground tabular-nums text-sm">
                        ₱{srv.price.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="xs" className="h-7 text-xs">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Supplies Tab */}
        <TabsContent value="supplies">
          <Card className="border-border/70 shadow-xs overflow-hidden">
            <CardHeader className="pb-3 border-b border-border/40">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Dental Supplies & Material Stock</CardTitle>
                  <CardDescription>Clinical consumables, reorder thresholds, and unit costs</CardDescription>
                </div>
                <Badge variant="outline" className="text-xs">
                  {MOCK_SUPPLIES.length} Items
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="w-28">Code</TableHead>
                    <TableHead>Material / Supply Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Unit Type</TableHead>
                    <TableHead className="text-center">In Stock</TableHead>
                    <TableHead className="text-right">Unit Cost</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_SUPPLIES.map((item) => {
                    const isLowStock = item.inStock <= item.reorderLevel;
                    return (
                      <TableRow key={item.code} className="hover:bg-muted/30">
                        <TableCell className="font-mono text-xs font-semibold text-foreground">
                          {item.code}
                        </TableCell>
                        <TableCell>
                          <div className="font-semibold text-foreground">{item.name}</div>
                          {isLowStock && (
                            <span className="text-[11px] text-amber-600 dark:text-amber-400 flex items-center gap-1 font-medium mt-0.5">
                              <AlertTriangle className="size-3" />
                              Low stock (Reorder level: {item.reorderLevel})
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {item.category}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {item.unit}
                        </TableCell>
                        <TableCell className="text-center font-bold text-foreground">
                          <span
                            className={
                              isLowStock
                                ? "text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-md bg-amber-500/10 text-xs"
                                : "text-xs"
                            }
                          >
                            {item.inStock}
                          </span>
                        </TableCell>
                        <TableCell className="text-right font-semibold text-foreground tabular-nums text-sm">
                          ₱{item.unitCost.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="xs" className="h-7 text-xs">
                            Restock
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
