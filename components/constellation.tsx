import { Network, ShieldCheck, Telescope, Workflow, type LucideIcon } from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';

type Layout = { w: number; h: number; heimdall: [number, number]; left: [number, number]; right: [number, number]; catalog: [number, number]; orchestrator: [number, number] };

const wide: Layout = { w: 1000, h: 540, heimdall: [500, 76], left: [180, 262], right: [820, 262], catalog: [322, 468], orchestrator: [678, 468] };
const narrow: Layout = { w: 360, h: 520, heimdall: [180, 64], left: [76, 240], right: [284, 240], catalog: [76, 440], orchestrator: [284, 440] };

/** A step of the assembly: from --a to --b of the scroll. */
function at(a: number, b: number, more?: Record<string, string>) {
  return { '--a': a, '--b': b, ...more } as CSSProperties;
}

function Lines({ l, id, className }: { l: Layout; id: string; className: string }) {
  const [hx, hy] = l.heimdall;
  const [lx, ly] = l.left;
  const [rx, ry] = l.right;
  const credLeft = `M${hx} ${hy}C${hx - (hx - lx) * 0.55} ${hy + 10} ${lx + 12} ${ly - (ly - hy) * 0.6} ${lx} ${ly}`;
  const credRight = `M${hx} ${hy}C${hx + (rx - hx) * 0.55} ${hy + 10} ${rx - 12} ${ry - (ry - hy) * 0.6} ${rx} ${ry}`;
  const dsp = `M${lx} ${ly}L${rx} ${ry}`;
  const soon = [
    `M${lx} ${ly}C${lx} ${ly + 90} ${l.catalog[0]} ${l.catalog[1] - 90} ${l.catalog[0]} ${l.catalog[1]}`,
    `M${rx} ${ry}C${rx} ${ry + 90} ${l.orchestrator[0]} ${l.orchestrator[1] - 90} ${l.orchestrator[0]} ${l.orchestrator[1]}`,
  ];
  return (
    <svg aria-hidden viewBox={`0 0 ${l.w} ${l.h}`} className={`absolute inset-0 h-full w-full ${className}`}>
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1={lx} y1={ly} x2={rx} y2={ry}>
          <stop offset="0" stopColor="#2b86c5" />
          <stop offset="0.55" stopColor="#8b6cff" />
          <stop offset="1" stopColor="#e86cf0" />
        </linearGradient>
      </defs>
      {soon.map((d) => (
        <path key={d} d={d} className="seq fade" style={at(0.56, 0.68)} fill="none" stroke="#24234c" strokeOpacity="0.28" strokeWidth="1.5" strokeDasharray="3 7" strokeLinecap="round" />
      ))}
      {[credLeft, credRight].map((d) => (
        <path key={d} d={d} pathLength={1} className="seq trace" style={at(0.3, 0.5)} fill="none" stroke="#8b6cff" strokeOpacity="0.6" strokeWidth="1.75" />
      ))}
      <path d={dsp} pathLength={1} className="seq trace" style={at(0.44, 0.62)} fill="none" stroke={`url(#${id})`} strokeWidth="3" strokeLinecap="round" />
      <g className="flow seq fade" style={at(0.68, 0.74)}>
        <circle r="5" fill="#8b6cff">
          <animateMotion dur="4.5s" repeatCount="indefinite" path={credLeft} />
        </circle>
        <circle r="5" fill="#8b6cff">
          <animateMotion dur="4.5s" begin="-2.2s" repeatCount="indefinite" path={credRight} />
        </circle>
        <circle r="6" fill="#e86cf0">
          <animateMotion dur="3.6s" repeatCount="indefinite" path={dsp} />
        </circle>
        <circle r="6" fill="#2b86c5">
          <animateMotion dur="3.6s" begin="-1.8s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear" path={dsp} />
        </circle>
      </g>
    </svg>
  );
}

function Node({ icon: Icon, name, note, soon, className, delay, step }: { icon: LucideIcon; name: string; note: string; soon?: boolean; className: string; delay: string; step: CSSProperties }) {
  return (
    <div className={`absolute -translate-x-1/2 -translate-y-1/2 ${className}`}>
      <div className="seq piece" style={step}>
        <div
          style={{ animationDelay: delay }}
          className={`animate-float flex items-center gap-3 rounded-[20px] p-2.5 pr-3 backdrop-blur-xl md:pr-5 ${
            soon ? 'border border-dashed border-ink/25 bg-white/60' : 'border border-white bg-white/90 shadow-[0_22px_44px_-22px_rgb(87_63_190/0.55)]'
          }`}
        >
          <span className={`hidden size-11 shrink-0 place-items-center rounded-[14px] md:grid ${soon ? 'bg-mist text-ink/55' : 'bg-gradient-to-br from-sky to-violet text-white'}`}>
            <Icon aria-hidden className="size-5" strokeWidth={1.8} />
          </span>
          <span className="min-w-0 pl-1 md:pl-0">
            <span className="block text-[15px] font-semibold leading-tight">{name}</span>
            <span className="mt-0.5 block text-xs leading-snug text-ink/60">{note}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function Chip({ children, className }: { children: ReactNode; className: string }) {
  return (
    <span className={`absolute -translate-x-1/2 -translate-y-1/2 ${className}`}>
      <span className="seq appear block rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-ink/70 shadow-sm backdrop-blur" style={at(0.46, 0.54)}>
        {children}
      </span>
    </span>
  );
}

/** Rings behind the pieces, that turn with the scroll. */
function Orbits() {
  return (
    <svg aria-hidden viewBox="0 0 1000 1000" className="absolute left-1/2 top-1/2 aspect-square w-[92%] -translate-x-1/2 -translate-y-1/2 md:w-[72%]" style={{ rotate: 'calc(var(--p) * 70deg)' }}>
      <circle cx="500" cy="500" r="480" fill="none" stroke="#8b6cff" strokeOpacity="0.22" strokeWidth="1.4" strokeDasharray="2 12" strokeLinecap="round" />
      <circle cx="500" cy="500" r="350" fill="none" stroke="#2b86c5" strokeOpacity="0.2" strokeWidth="1.4" strokeDasharray="2 12" strokeLinecap="round" />
      <circle cx="500" cy="20" r="9" fill="#9dd5f2" />
      <circle cx="850" cy="500" r="7" fill="#e86cf0" />
      <circle cx="160" cy="740" r="6" fill="#8b6cff" />
    </svg>
  );
}

/**
 * How the pieces fit, built by the scroll: they arrive loose, the authority's
 * credentials reach the agents, DSP joins them and the data starts to flow.
 */
export function Constellation() {
  return (
    <div
      role="img"
      aria-label="Heimdall issues credentials to two DS-Agents, which exchange data over the Dataspace Protocol. A federated catalog and an orchestrator are coming."
      className="relative aspect-[360/520] w-full md:aspect-[1000/540]"
    >
      <div aria-hidden className="absolute left-1/2 top-[46%] size-[46%] -translate-x-1/2 -translate-y-1/2 md:top-[50%] md:h-[62%] md:w-[44%]">
        <div className="seq size-full rounded-full bg-gradient-to-br from-sky/70 via-violet/45 to-magenta/45 blur-3xl" style={{ ...at(0.4, 0.8), opacity: 'calc(0.25 + 0.75 * var(--e))', scale: 'calc(0.7 + 0.4 * var(--e))' }} />
      </div>
      <Orbits />
      <Lines l={wide} id="flow-wide" className="hidden md:block" />
      <Lines l={narrow} id="flow-narrow" className="md:hidden" />

      <Node icon={ShieldCheck} name="Heimdall" note="authority" delay="0s" step={at(0, 0.3, { '--dx': '6vmin', '--dy': '-10vmin', '--r': '-9deg' })} className="left-1/2 top-[12.3%] md:top-[14%]" />
      <Node icon={Network} name="DS-Agent" note="catalog · API · events" delay="-2.2s" step={at(0.04, 0.34, { '--dx': '-9vmin', '--dy': '-16vmin', '--r': '11deg' })} className="left-[21%] top-[46%] w-[40%] md:left-[18%] md:top-[48.5%] md:w-max" />
      <Node icon={Network} name="DS-Agent" note="catalog · API · events" delay="-4.6s" step={at(0.08, 0.38, { '--dx': '10vmin', '--dy': '14vmin', '--r': '-12deg' })} className="left-[79%] top-[46%] w-[40%] md:left-[82%] md:top-[48.5%] md:w-max" />
      <Node icon={Telescope} name="Federated catalog" note="released soon" soon delay="-1.2s" step={at(0.14, 0.44, { '--dx': '-13vmin', '--dy': '9vmin', '--r': '14deg' })} className="left-[21%] top-[84.6%] w-[40%] md:left-[32.2%] md:top-[86.7%] md:w-max" />
      <Node icon={Workflow} name="Orchestrator" note="released soon" soon delay="-3.4s" step={at(0.18, 0.48, { '--dx': '12vmin', '--dy': '6vmin', '--r': '-10deg' })} className="left-[79%] top-[84.6%] w-[40%] md:left-[67.8%] md:top-[86.7%] md:w-max" />

      <Chip className="left-[22%] top-[27%] md:left-[27%] md:top-[24%]">credentials</Chip>
      <Chip className="left-[78%] top-[27%] md:left-[73%] md:top-[24%]">credentials</Chip>
      <span className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 md:top-[48.5%]">
        <span className="seq appear block rounded-full bg-gradient-to-r from-signal via-violet to-magenta px-3.5 py-1 text-[13px] font-semibold text-white shadow-[0_10px_22px_-10px_rgb(87_63_190/0.9)]" style={at(0.58, 0.66)}>
          DSP
        </span>
      </span>
    </div>
  );
}
