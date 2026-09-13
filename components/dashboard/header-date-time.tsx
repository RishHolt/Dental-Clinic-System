"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export function HeaderDateTime() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex flex-col items-end text-xs text-muted-foreground tabular-nums select-none">
        <span>September 1, 2026</span>
        <span>12:00:01 PM</span>
      </div>
    );
  }

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <div className="flex flex-col items-end text-xs leading-tight text-muted-foreground tabular-nums select-none font-medium">
      <span className="tracking-tight">{formattedDate}</span>
      <span className="tracking-tight text-foreground/80">{formattedTime}</span>
    </div>
  );
}
