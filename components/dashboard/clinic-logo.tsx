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
        "flex items-center gap-2.5 group select-none overflow-hidden transition-all duration-300 shrink-0",
        className
      )}
      title="CANU Dental Clinic"
    >
      {/* Dental Tooth Graphic */}
      <div className="relative flex items-center justify-center text-[#c29b38] shrink-0">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-7.5 transition-transform group-hover:scale-105"
        >
          {/* Stylized Molar Outline */}
          <path d="M7 11.5C6 7.5 7.5 3.5 11 2.5c3.2-1 5 1 5 1s1.8-2 5-1c3.5 1 5 5 4 9-.8 3.5-2.2 6.5-3 11-.6 3-2.2 6.5-4.5 6.5-1.8 0-2.3-2-3.5-5-1-2.5-1.5-2.5-2.5-2.5s-1.5 0-2.5 2.5c-1.2 3-1.7 5-3.5 5-2.3 0-3.9-3.5-4.5-6.5-.8-4.5-2.2-7.5-3-11Z" />
          <path d="M12 7c1 1.2 2.5 2 4 2s3-.8 4-2" strokeWidth="1.6" />
        </svg>
      </div>

      {/* Typography - smoothly collapsable */}
      <div
        className={cn(
          "flex flex-col leading-tight whitespace-nowrap transition-all duration-300 overflow-hidden",
          collapsed
            ? "max-w-0 opacity-0 -translate-x-2 pointer-events-none"
            : "max-w-[160px] opacity-100 translate-x-0"
        )}
      >
        <span className="font-serif text-lg font-bold tracking-wider text-[#b88c30] uppercase">
          CANU
        </span>
        <span className="font-serif text-[11px] italic font-medium tracking-wide text-[#b88c30] -mt-0.5">
          Dental Clinic
        </span>
      </div>
    </Link>
  );
}
