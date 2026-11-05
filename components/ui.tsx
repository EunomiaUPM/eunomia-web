import { ArrowRight, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

/** Soft light behind a stretch of the page. */
export function Aurora({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute -z-10 ${className}`}>
      <div className="animate-drift absolute left-[6%] top-[4%] size-[58%] rounded-full bg-sky opacity-55 blur-[90px]" />
      <div className="animate-drift-slow absolute right-[4%] top-[14%] size-[52%] rounded-full bg-violet opacity-30 blur-[100px]" />
      <div className="animate-drift absolute bottom-[2%] left-[34%] size-[44%] rounded-full bg-magenta opacity-25 blur-[100px]" />
    </div>
  );
}

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`text-sm font-semibold tracking-wide text-[#6a4fe0] ${className}`}>{children}</p>;
}

/** A headline; `accent`, a part of it, takes the colour. */
export function Title({ text, accent, as: Tag = 'h2', className = '', accentClass = 'text-aurora' }: {
  text: string;
  accent?: string;
  as?: 'h1' | 'h2';
  className?: string;
  accentClass?: string;
}) {
  const at = accent ? text.lastIndexOf(accent) : -1;
  return (
    <Tag className={`font-soft text-balance ${className}`}>
      {at < 0 ? (
        text
      ) : (
        <>
          {text.slice(0, at)}
          <span className={accentClass}>{accent}</span>
          {text.slice(at + (accent as string).length)}
        </>
      )}
    </Tag>
  );
}

const tones = {
  sky: 'bg-gradient-to-br from-sky to-signal text-white',
  violet: 'bg-gradient-to-br from-sky to-violet text-white',
  magenta: 'bg-gradient-to-br from-violet to-magenta text-white',
  soft: 'bg-gradient-to-br from-violet/15 to-magenta/15 text-[#6a4fe0]',
};

/** An icon in a small glowing tile. */
export function Orb({ icon: Icon, tone = 'violet', className = '' }: { icon: LucideIcon; tone?: keyof typeof tones; className?: string }) {
  return (
    <span className={`inline-grid size-12 shrink-0 place-items-center rounded-2xl shadow-[0_12px_26px_-14px_rgb(87_63_190/0.6)] ${tones[tone]} ${className}`}>
      <Icon aria-hidden className="size-[22px]" strokeWidth={1.8} />
    </span>
  );
}

export function Button({ href, children, variant = 'primary', className = '' }: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'white' | 'glass';
  className?: string;
}) {
  const look = {
    primary: 'bg-ink text-white shadow-[0_16px_34px_-14px_rgb(36_35_76/0.8)] hover:bg-[#2f2d63]',
    ghost: 'bg-white/70 text-ink ring-1 ring-ink/12 backdrop-blur hover:bg-white',
    white: 'bg-white text-ink shadow-[0_16px_34px_-14px_rgb(7_7_26/0.7)] hover:bg-mist',
    glass: 'bg-white/12 text-white ring-1 ring-white/35 backdrop-blur hover:bg-white/22',
  }[variant];
  return (
    <a href={href} className={`group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-medium transition-all hover:-translate-y-0.5 ${look} ${className}`}>
      {children}
      <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}
