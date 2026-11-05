'use client';
import { useEffect, useState } from 'react';

/** Days to the event; "Happening now" during it. Nothing until the browser knows the date. */
export function DaysLeft({ start, end }: { start: string; end: string }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
  }, []);

  if (now === null) return <span className="invisible">–</span>;
  const from = new Date(start).getTime();
  if (now >= new Date(end).getTime()) return <span>That was fun. See you at the next one.</span>;
  if (now >= from) return <span>Happening now</span>;
  const days = Math.ceil((from - now) / 86_400_000);
  return <span>{days === 1 ? 'Tomorrow' : `${days} days to go`}</span>;
}
