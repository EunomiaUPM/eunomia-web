'use client';
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

export type TrackTab = {
  id: string;
  name: string;
  span: string;
  prize: string;
  /** The colour wash behind the panel while the tab is open. */
  wash: string;
  content: ReactNode;
};

/** The challenge tracks: one tab each, a pill that slides between them, and the panel coming in. */
export function TrackTabs({ tabs }: { tabs: TrackTab[] }) {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const panel = useRef<HTMLDivElement>(null);
  const switched = useRef(false);

  /* ScrollEffects only knows the drawings that were there at load: draw the new tab's ones here. */
  useEffect(() => {
    if (!switched.current) return;
    const frame = requestAnimationFrame(() =>
      panel.current?.querySelectorAll('[data-draw]').forEach((d) => {
        d.setAttribute('data-in', '');
        d.setAttribute('data-live', '');
      }),
    );
    return () => cancelAnimationFrame(frame);
  }, [active]);

  const select = (n: number) => {
    switched.current = true;
    setActive(n);
  };

  const go = (n: number) => {
    const next = (n + tabs.length) % tabs.length;
    select(next);
    buttons.current[next]?.focus();
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(active + 1);
    else if (e.key === 'ArrowLeft') go(active - 1);
    else return;
    e.preventDefault();
  };

  return (
    <div className="relative isolate mx-auto max-w-[1360px] overflow-hidden rounded-[40px] bg-white/60 px-3 pb-6 pt-3 ring-1 ring-ink/5 sm:px-5 md:px-10 md:pb-12 md:pt-10">
      {tabs.map((t, i) => (
        <div
          key={t.id}
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-700"
          style={{ background: t.wash, opacity: i === active ? 1 : 0 }}
        />
      ))}

      <div
        role="tablist"
        aria-label="Challenge tracks"
        onKeyDown={onKey}
        className="relative mx-auto grid max-w-4xl rounded-[28px] bg-white/55 p-1.5 shadow-[inset_0_0_0_1px_rgb(36_35_76/0.06)] backdrop-blur"
        style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
      >
        <span
          aria-hidden
          className="absolute inset-y-1.5 left-1.5 rounded-[22px] bg-white shadow-[0_14px_30px_-14px_rgb(36_35_76/0.45)] transition-transform duration-500 ease-[cubic-bezier(.34,1.56,.64,1)]"
          style={{ width: `calc((100% - 0.75rem) / ${tabs.length})`, transform: `translateX(${active * 100}%)` }}
        />
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              buttons.current[i] = el;
            }}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={i === active}
            aria-controls={`panel-${t.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => select(i)}
            className={`relative z-10 flex flex-col items-center gap-1 rounded-[22px] px-3 py-4 text-center transition-colors duration-300 sm:py-5 ${
              i === active ? 'text-ink' : 'text-ink/55 hover:text-ink/80'
            }`}
          >
            <span className="font-soft text-xl leading-tight sm:text-2xl">{t.name}</span>
            <span className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm">
              <span>{t.span}</span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold transition-all duration-300 ${
                  i === active ? 'bg-[#fff6dd] text-[#8a6500]' : 'bg-ink/5 text-ink/50'
                }`}
              >
                {t.prize}
              </span>
            </span>
          </button>
        ))}
      </div>

      {tabs.map((t, i) =>
        i === active ? (
          <div key={t.id} ref={panel} role="tabpanel" id={`panel-${t.id}`} aria-labelledby={`tab-${t.id}`} className="tab-in mt-8 md:mt-10">
            {t.content}
          </div>
        ) : null,
      )}
    </div>
  );
}
