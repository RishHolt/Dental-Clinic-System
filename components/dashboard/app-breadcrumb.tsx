"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getRouteTitle } from "@/lib/navigation";

export function AppBreadcrumb() {
  const pathname = usePathname();
  const currentLabel = getRouteTitle(pathname);

  return (
    <Breadcrumb>
      <BreadcrumbList className="text-sm font-normal text-muted-foreground">
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="/dashboard" />}>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-normal text-muted-foreground">
            {currentLabel}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
