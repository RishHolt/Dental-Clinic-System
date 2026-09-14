import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ClinicLogoProps {
  className?: string;
  collapsed?: boolean;
}

export function ClinicLogo({ className, collapsed = false }: ClinicLogoProps) {
  return (
    <Link
      href="/dashboard"
      className={cn(
        "flex flex-col items-center text-center justify-center select-none overflow-hidden shrink-0 group py-0.5 transition-[opacity,transform] duration-200 ease-in-out",
        collapsed
          ? "opacity-0 -translate-x-2 pointer-events-none invisible w-0"
          : "opacity-100 translate-x-0 visible delay-100",
        className
      )}
      title="CANU Dental Clinic"
    >
      <span className="font-serif text-lg md:text-xl font-bold tracking-wider text-[#b88c30] uppercase leading-none transition-colors group-hover:text-[#a07724] text-center">
        CANU
      </span>
      <span className="font-serif text-[11px] md:text-xs italic font-medium tracking-wide text-[#b88c30] mt-1 leading-none transition-colors group-hover:text-[#a07724] text-center">
        Dental Clinic
      </span>
    </Link>
  );
}
