"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

export function HeaderDateTime() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [currentTime, setCurrentTime] = useState<Date>(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isMounted) {
    return (
      <div
        className="flex flex-col items-end text-xs leading-tight text-muted-foreground tabular-nums select-none font-medium invisible"
        aria-hidden="true"
      >
        <span className="tracking-tight">Loading date...</span>
        <span className="tracking-tight">00:00:00 AM</span>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-end text-xs leading-tight text-muted-foreground tabular-nums select-none font-medium"
      suppressHydrationWarning
    >
      <span className="tracking-tight">{dateFormatter.format(currentTime)}</span>
      <span className="tracking-tight text-foreground/80">
        {timeFormatter.format(currentTime)}
      </span>
    </div>
  );
}
