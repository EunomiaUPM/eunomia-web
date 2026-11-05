import type { CSSProperties, ReactNode } from 'react';

/**
 * The site's illustrations: ink lines over flat shapes of the palette.
 *
 * Lines (`L`) draw themselves when the drawing enters the viewport, shapes
 * (`F`) pop in after them, and `--i` orders both. Every class that moves is in
 * globals.css. Lines use currentColor: the page sets it.
 */

const SKY = '#9dd5f2';
const VIOLET = '#8b6cff';
const MAGENTA = '#e86cf0';

type Order = { i?: number; className?: string; style?: CSSProperties };

function order(i: number, style?: CSSProperties) {
  return { '--i': i, ...style } as CSSProperties;
}

export function L({ d, i = 0, w = 2, className = '', style }: Order & { d: string; w?: number }) {
  return <path className={`ln ${className}`} d={d} pathLength={1} stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" fill="none" style={order(i, style)} />;
}

export function F({ d, fill, i = 0, opacity, className = '', style }: Order & { d: string; fill: string; opacity?: number }) {
  return <path className={`pop ${className}`} d={d} fill={fill} fillOpacity={opacity} style={order(i, style)} />;
}

function Dot({ x, y, r = 4, fill = VIOLET, i = 0, className = '', style }: Order & { x: number; y: number; r?: number; fill?: string }) {
  return <circle className={`pop ${className}`} cx={x} cy={y} r={r} fill={fill} style={order(i, style)} />;
}

function Group({ className, style, children }: { className?: string; style?: CSSProperties; children: ReactNode }) {
  return (
    <g className={className} style={style}>
      {children}
    </g>
  );
}

function Art({ viewBox = '0 0 200 150', className = '', children }: { viewBox?: string; className?: string; children: ReactNode }) {
  return (
    <svg aria-hidden data-draw viewBox={viewBox} fill="none" className={`art ${className}`}>
      {children}
    </svg>
  );
}

/** A rounded rectangle as a path, so it can draw itself. */
function rr(x: number, y: number, w: number, h: number, r: number) {
  return `M${x + r} ${y}h${w - 2 * r}a${r} ${r} 0 0 1 ${r} ${r}v${h - 2 * r}a${r} ${r} 0 0 1 ${-r} ${r}h${-(w - 2 * r)}a${r} ${r} 0 0 1 ${-r} ${-r}v${-(h - 2 * r)}a${r} ${r} 0 0 1 ${r} ${-r}z`;
}

function circle(cx: number, cy: number, r: number) {
  return `M${cx - r} ${cy}a${r} ${r} 0 1 1 ${2 * r} 0a${r} ${r} 0 1 1 ${-2 * r} 0z`;
}

function gear(cx: number, cy: number, outer: number, inner: number, teeth: number) {
  const step = (Math.PI * 2) / teeth;
  const at = (r: number, a: number) => `${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`;
  let d = '';
  for (let t = 0; t < teeth; t++) {
    const a = t * step;
    d += `${t ? 'L' : 'M'}${at(inner, a - step * 0.27)}L${at(outer, a - step * 0.15)}L${at(outer, a + step * 0.15)}L${at(inner, a + step * 0.27)}`;
  }
  return `${d}z`;
}

const cloud = 'M62 60h76a17 17 0 0 0 3-33.7a26 26 0 0 0-49-8a20 20 0 0 0-30 41.7z';

/* The framework */

export function Lightness({ className }: { className?: string }) {
  return (
    <Art className={className}>
      <F i={2} d={cloud} fill={SKY} opacity={0.55} style={{ translate: '5px 5px' }} />
      <L i={0} d={cloud} />
      <F i={5} d={rr(70, 106, 60, 26, 7)} fill={VIOLET} opacity={0.35} style={{ translate: '4px 4px' }} />
      <L i={3} d={rr(70, 106, 60, 26, 7)} />
      <L i={4} d="M100 106V92" />
      <Dot i={6} x={100} y={89} r={3.5} fill={MAGENTA} className="blink" />
      <Dot i={6} x={84} y={119} r={3} fill={VIOLET} className="blink" style={{ animationDelay: '-0.6s' }} />
      <Dot i={6} x={96} y={119} r={3} fill={SKY} className="blink" style={{ animationDelay: '-1.2s' }} />
      <L i={6} d="M86 80c8-7 20-7 28 0" className="blink" />
      <Group className="sway">
        <F i={6} d="M150 74c14-12 30-12 38-6-6 12-22 20-38 6z" fill={MAGENTA} opacity={0.4} />
        <L i={5} d="M150 74c14-12 30-12 38-6-6 12-22 20-38 6z" />
        <L i={6} d="M142 80l36-11" />
      </Group>
    </Art>
  );
}

export function Layers({ className }: { className?: string }) {
  const layer = (y: number, fill: string, opacity: number, i: number, delay: string) => (
    <Group key={y} className="bob" style={{ animationDelay: delay }}>
      <F i={i + 2} d={`M100 ${y}l62 30-62 30-62-30z`} fill={fill} opacity={opacity} />
      <L i={i} d={`M100 ${y}l62 30-62 30-62-30z`} />
    </Group>
  );
  return (
    <Art className={className}>
      {layer(66, MAGENTA, 0.5, 0, '-2.4s')}
      {layer(40, VIOLET, 0.5, 1, '-1.2s')}
      {layer(14, SKY, 0.75, 2, '0s')}
      <L i={5} d="M100 2v10" />
      <circle className="flow" r="4.5" fill={MAGENTA}>
        <animateMotion dur="3s" repeatCount="indefinite" path="M100 2V136" />
      </circle>
    </Art>
  );
}

export function Interlock({ className }: { className?: string }) {
  const left = 'M38 42h55v22a12 12 0 1 1 0 22v22H38z';
  const right = 'M93 42h55v66H93V86a12 12 0 1 0 0-22z';
  return (
    <Art className={className}>
      <Group className="meet-left">
        <F i={3} d={left} fill={SKY} opacity={0.7} style={{ translate: '4px 4px' }} />
        <L i={0} d={left} />
      </Group>
      <Group className="meet-right">
        <F i={4} d={right} fill={MAGENTA} opacity={0.42} style={{ translate: '4px 4px' }} />
        <L i={1} d={right} />
      </Group>
      <Group className="spark">
        <L i={5} d="M93 30V16" />
        <L i={5} d="M75 32l-7-11" />
        <L i={5} d="M111 32l7-11" />
      </Group>
    </Art>
  );
}

/* The pieces */

export function Shield({ className }: { className?: string }) {
  const shield = 'M100 20l42 14v40c0 26-20 42-42 52-22-10-42-26-42-52V34z';
  return (
    <Art className={className}>
      <path className="ln" d="M16 75a84 30 0 1 1 168 0a84 30 0 1 1-168 0z" pathLength={1} stroke={VIOLET} strokeOpacity={0.5} strokeWidth={1.5} strokeDasharray="1" style={order(0)} />
      <F i={3} d={shield} fill={SKY} opacity={0.7} style={{ translate: '5px 5px' }} />
      <path className="pop" d={shield} fill="white" style={order(1)} />
      <L i={1} d={shield} />
      <L i={4} d="M81 72l14 15 26-32" w={3} />
      <Group className="float-a">
        <F i={6} d={rr(146, 20, 44, 30, 6)} fill="white" />
        <L i={5} d={rr(146, 20, 44, 30, 6)} />
        <Dot i={7} x={158} y={35} r={5} fill={MAGENTA} />
        <L i={7} d="M169 30h13M169 40h9" />
      </Group>
      <circle className="flow" r="5" fill={MAGENTA}>
        <animateMotion dur="7s" repeatCount="indefinite" path="M16 75a84 30 0 1 0 168 0a84 30 0 1 0-168 0z" />
      </circle>
    </Art>
  );
}

export function Agent({ className }: { className?: string }) {
  return (
    <Art className={className}>
      <F i={3} d={rr(66, 16, 68, 74, 10)} fill={VIOLET} opacity={0.32} style={{ translate: '5px 5px' }} />
      <L i={0} d={rr(66, 16, 68, 74, 10)} />
      <L i={2} d="M78 34h44M78 48h44M78 62h26" />
      <Dot i={4} x={118} y={74} r={5} fill={MAGENTA} className="blink" />
      <L i={2} d="M66 52H42M134 52h24" />
      <L i={3} d={circle(34, 52, 8)} />
      <L i={3} d={circle(166, 52, 8)} />
      <L i={4} d="M100 90v26" />
      <L i={5} d="M12 118h176" w={3} />
      <L i={6} d="M44 118v16M100 118v16M156 118v16" />
      {[0, -1.3, -2.6].map((delay) => (
        <circle key={delay} className="bus flow" cx={14} cy={118} r={5} fill={MAGENTA} style={{ animationDelay: `${delay}s` }} />
      ))}
    </Art>
  );
}

export function Catalog({ className }: { className?: string }) {
  const cells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <Art className={className}>
      {cells.map((n) => {
        const x = 34 + (n % 3) * 46;
        const y = 14 + Math.floor(n / 3) * 38;
        return (
          <g key={n}>
            <F i={n % 4} d={rr(x, y, 38, 30, 6)} fill={n % 2 ? SKY : VIOLET} opacity={0.34} className="glow-cell" style={{ animationDelay: `${-n * 0.45}s` }} />
            <L i={n % 4} d={rr(x, y, 38, 30, 6)} w={1.6} />
          </g>
        );
      })}
      <Group className="seek">
        <path className="pop" d={circle(118, 66, 20)} fill="white" fillOpacity={0.7} style={order(5)} />
        <L i={5} d={circle(118, 66, 20)} w={2.5} />
        <L i={6} d="M133 81l18 18" w={3.5} />
      </Group>
    </Art>
  );
}

export function Gears({ className }: { className?: string }) {
  return (
    <Art className={className}>
      <Group className="turn">
        <F i={3} d={gear(78, 80, 50, 38, 12)} fill={VIOLET} opacity={0.3} />
        <L i={0} d={gear(78, 80, 50, 38, 12)} />
        <L i={2} d={circle(78, 80, 13)} />
      </Group>
      <Group className="turn-back">
        <F i={4} d={gear(148, 44, 34, 24, 8)} fill={MAGENTA} opacity={0.34} />
        <L i={1} d={gear(148, 44, 34, 24, 8)} />
        <L i={3} d={circle(148, 44, 8)} />
      </Group>
    </Art>
  );
}

export function Balance({ className }: { className?: string }) {
  const pan = (x: number) => `M${x - 28} 92h56c-3 16-14 22-28 22s-25-6-28-22z`;
  return (
    <Art className={className}>
      <L i={0} d="M100 24v108" w={2.5} />
      <L i={1} d="M70 134h60" w={2.5} />
      <Dot i={1} x={100} y={24} r={6} fill={MAGENTA} />
      <Group className="tilt">
        <L i={2} d="M42 40h116" w={2.5} />
      </Group>
      <Group className="pan-a">
        <L i={3} d="M42 40L16 92M42 40l26 52" w={1.6} />
        <F i={5} d={pan(42)} fill={SKY} opacity={0.75} />
        <L i={4} d={pan(42)} />
      </Group>
      <Group className="pan-b">
        <L i={3} d="M158 40l-26 52M158 40l26 52" w={1.6} />
        <F i={5} d={pan(158)} fill={VIOLET} opacity={0.4} />
        <L i={4} d={pan(158)} />
      </Group>
    </Art>
  );
}

/* In the field: on the dark panel */

export function Sustainable({ className }: { className?: string }) {
  const leaf = 'M136 128c-18-30-4-62 38-72 8 42-8 70-38 72z';
  return (
    <Art className={className}>
      <Group className="turn-slow">
        <L i={5} d="M40 8v8M40 58v8M11 37h8M61 37h8M19 16l6 6M55 52l6 6M19 58l6-6M55 22l6-6" w={1.8} />
      </Group>
      <path className="pop" d={circle(40, 37, 13)} fill={SKY} style={order(4)} />
      <L i={0} d="M60 134V52l34-18 34 18v82" />
      <L i={1} d="M14 134h172" />
      {[0, 1, 2].map((r) =>
        [0, 1].map((c) => (
          <path key={`${r}${c}`} className="pop win" d={rr(72 + c * 30, 60 + r * 24, 14, 14, 3)} fill={SKY} style={{ ...order(2 + r), animationDelay: `${-(r * 2 + c) * 0.7}s` }} />
        )),
      )}
      <Group className="sway-leaf">
        <F i={5} d={leaf} fill={MAGENTA} opacity={0.65} />
        <L i={3} d={leaf} />
        <L i={5} d="M136 128c8-22 18-38 34-68" />
      </Group>
    </Art>
  );
}

export function Atlas({ className }: { className?: string }) {
  const map = 'M22 44l50-14 56 16 50-14v86l-50 14-56-16-50 14z';
  const route = 'M42 108c22-44 44 18 66-16s30-18 44-40';
  return (
    <Art className={className}>
      <F i={3} d={map} fill={VIOLET} opacity={0.4} />
      <L i={0} d={map} />
      <L i={1} d="M72 30v86M128 46v86" w={1.6} />
      <path className="ln" d={route} pathLength={1} stroke={SKY} strokeWidth={3} strokeLinecap="round" style={order(4)} />
      <Dot i={5} x={42} y={108} r={5} fill={SKY} />
      <Group className="hop">
        <F i={7} d="M152 52c-12-14-17-21-17-29a17 17 0 0 1 34 0c0 8-5 15-17 29z" fill={MAGENTA} />
        <path className="pop" d={circle(152, 23, 6)} fill="white" style={order(8)} />
      </Group>
      <Group className="drift">
        <F i={6} d="M36 34h34a9 9 0 0 0 1-18a13 13 0 0 0-25-3a11 11 0 0 0-10 21z" fill="white" opacity={0.95} />
      </Group>
    </Art>
  );
}

/* The hackathon */

export function Rocket({ className }: { className?: string }) {
  const body = 'M100 14c20 18 26 48 18 84H82c-8-36-2-66 18-84z';
  return (
    <Art className={className}>
      <F i={4} d="M88 100c0 20 12 36 12 36s12-16 12-36z" fill={MAGENTA} className="flame" />
      <F i={3} d={body} fill={SKY} opacity={0.7} style={{ translate: '4px 3px' }} />
      <L i={0} d={body} />
      <L i={1} d="M83 72L60 100l25-4M117 72l23 28-25-4" />
      <L i={2} d={circle(100, 52, 11)} />
      <Dot i={5} x={40} y={36} r={3.5} fill={VIOLET} className="blink" />
      <Dot i={5} x={158} y={26} r={3} fill={MAGENTA} className="blink" style={{ animationDelay: '-0.8s' }} />
      <Dot i={5} x={166} y={78} r={4} fill={SKY} className="blink" style={{ animationDelay: '-1.5s' }} />
      <Dot i={5} x={32} y={88} r={3} fill={SKY} className="blink" style={{ animationDelay: '-2.1s' }} />
    </Art>
  );
}

export function Identity({ className }: { className?: string }) {
  return (
    <Art className={className}>
      <F i={3} d={rr(26, 30, 128, 88, 12)} fill={VIOLET} opacity={0.32} style={{ translate: '5px 5px' }} />
      <L i={0} d={rr(26, 30, 128, 88, 12)} />
      <L i={1} d={circle(62, 64, 13)} />
      <L i={2} d="M40 102c2-14 12-20 22-20s20 6 22 20" />
      <L i={3} d="M98 58h40M98 74h40M98 90h24" />
      <Group className="seal">
        <path className="pop" d={circle(156, 112, 20)} fill={MAGENTA} style={order(5)} />
        <path className="ln" d="M147 112l7 8 13-15" pathLength={1} stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" style={order(7)} />
      </Group>
    </Art>
  );
}

export function Contract({ className }: { className?: string }) {
  return (
    <Art className={className}>
      <F i={3} d={rr(52, 12, 92, 124, 10)} fill={SKY} opacity={0.6} style={{ translate: '5px 5px' }} />
      <L i={0} d={rr(52, 12, 92, 124, 10)} />
      <L i={1} d="M68 36h60M68 52h60M68 68h38" />
      <path className="ln pen-line" d="M68 110c10-22 14 12 22-6s10 10 18-4 8 8 20-2" pathLength={1} stroke={VIOLET} strokeWidth={2.5} strokeLinecap="round" fill="none" style={order(4)} />
      <Group className="write">
        <F i={6} d="M150 74l14 14-34 34-18 4 4-18z" fill={MAGENTA} opacity={0.75} />
        <L i={5} d="M150 74l14 14-34 34-18 4 4-18z" />
      </Group>
    </Art>
  );
}

export function Exchange({ className }: { className?: string }) {
  const top = 'M58 44c24-30 60-30 84 0';
  const bottom = 'M142 106c-24 30-60 30-84 0';
  return (
    <Art className={className}>
      <F i={3} d={rr(16, 46, 52, 58, 10)} fill={SKY} opacity={0.7} style={{ translate: '4px 4px' }} />
      <L i={0} d={rr(16, 46, 52, 58, 10)} />
      <L i={1} d="M42 46V34" />
      <Dot i={3} x={42} y={30} r={4} fill={MAGENTA} className="blink" />
      <Dot i={3} x={31} y={68} r={4} fill="currentColor" />
      <Dot i={3} x={53} y={68} r={4} fill="currentColor" />
      <L i={2} d="M31 86h22" />
      <F i={3} d={rr(132, 46, 52, 58, 10)} fill={VIOLET} opacity={0.35} style={{ translate: '4px 4px' }} />
      <L i={0} d={rr(132, 46, 52, 58, 10)} />
      <L i={2} d="M144 64h28M144 76h28M144 88h16" />
      <L i={4} d={top} w={1.6} />
      <L i={4} d={bottom} w={1.6} />
      <circle className="flow" r="6" fill={MAGENTA}>
        <animateMotion dur="2.6s" repeatCount="indefinite" path={top} />
      </circle>
      <circle className="flow" r="6" fill={VIOLET}>
        <animateMotion dur="2.6s" begin="-1.3s" repeatCount="indefinite" path={bottom} />
      </circle>
    </Art>
  );
}

export function Hill({ className }: { className?: string }) {
  return (
    <Art viewBox="0 0 120 80" className={className}>
      <path className="pop" d={circle(86, 24, 12)} fill={MAGENTA} fillOpacity={0.6} style={order(2)} />
      <F i={2} d="M6 72c20-30 40-30 56-12 8-8 26-12 52 12z" fill="white" opacity={0.8} />
      <L i={0} d="M6 72c20-30 40-30 56-12 8-8 26-12 52 12z" />
    </Art>
  );
}

export function Steps({ className }: { className?: string }) {
  const steps = 'M6 72h24V56h24V40h24V24h30';
  return (
    <Art viewBox="0 0 120 80" className={className}>
      <F i={2} d={`${steps}v48z`} fill="white" opacity={0.8} />
      <L i={0} d={steps} />
      <circle className="flow climb" r="6" fill={MAGENTA}>
        <animateMotion dur="4s" repeatCount="indefinite" path="M18 64V64H42V48H66V32H90V16" />
      </circle>
    </Art>
  );
}

export function Summit({ className }: { className?: string }) {
  const peak = 'M4 74l34-46 16 20 16-34 44 60z';
  return (
    <Art viewBox="0 0 120 80" className={className}>
      <F i={2} d={peak} fill="white" opacity={0.8} />
      <L i={0} d={peak} />
      <L i={1} d="M70 14V2" />
      <F i={3} d="M70 2l18 5-18 6z" fill={MAGENTA} className="wave" />
    </Art>
  );
}

export function Stack({ className }: { className?: string }) {
  const box = (x: number, y: number, fill: string, opacity: number, i: number) => (
    <g key={`${x}${y}`} className="drop" style={order(i)}>
      <path d={rr(x, y, 62, 30, 5)} fill={fill} fillOpacity={opacity} />
      <path d={rr(x, y, 62, 30, 5)} stroke="currentColor" strokeWidth={2} />
      <path d={`M${x + 14} ${y + 8}v14M${x + 26} ${y + 8}v14M${x + 38} ${y + 8}v14M${x + 50} ${y + 8}v14`} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    </g>
  );
  return (
    <Art viewBox="0 0 260 170" className={className}>
      <L i={0} d={rr(54, 88, 152, 62, 8)} />
      <L i={1} d="M46 150h168l18 12H28z" />
      {box(66, 96, SKY, 0.8, 3)}
      {box(132, 96, VIOLET, 0.42, 5)}
      {box(99, 62, MAGENTA, 0.45, 7)}
      <Dot i={9} x={130} y={38} r={4} fill={VIOLET} className="blink" />
    </Art>
  );
}

/** The laptop on the hackathon poster, in white over the gradient. */
export function Launch({ className }: { className?: string }) {
  return (
    <Art viewBox="0 0 560 460" className={className}>
      <g className="turn-slow">
        <circle cx="280" cy="230" r="224" stroke="white" strokeOpacity="0.22" strokeWidth="1.2" />
        <circle cx="280" cy="230" r="172" stroke="white" strokeOpacity="0.22" strokeWidth="1.2" strokeDasharray="4 8" />
        <circle cx="280" cy="6" r="11" fill={SKY} />
        <circle cx="504" cy="230" r="8" fill="white" />
        <circle cx="108" cy="230" r="9" fill={MAGENTA} />
        <circle cx="402" cy="374" r="7" fill={SKY} />
      </g>
      <path className="pop" d={rr(140, 120, 280, 180, 16)} fill="white" fillOpacity={0.14} style={order(2)} />
      <L i={0} d={rr(140, 120, 280, 180, 16)} w={2.5} />
      <L i={1} d="M104 300h352l18 26a6 6 0 0 1-5 10H91a6 6 0 0 1-5-10z" w={2.5} />
      <L i={2} d="M250 318h60" w={2.5} />
      <L i={3} d="M210 244C240 170 320 170 350 244" />
      <L i={3} d="M210 244h140" />
      <L i={3} d="M280 188v-12" />
      <path className="pop" d={circle(210, 244, 16)} fill={SKY} style={order(4)} />
      <path className="pop" d={circle(350, 244, 16)} fill={MAGENTA} style={order(5)} />
      <path className="pop" d={circle(280, 166, 16)} fill="white" style={order(6)} />
      <circle className="flow" r="6" fill="white">
        <animateMotion dur="2.8s" repeatCount="indefinite" path="M210 244C240 170 320 170 350 244" />
      </circle>
      <circle className="flow" r="6" fill="white">
        <animateMotion dur="2.2s" begin="-1s" repeatCount="indefinite" path="M350 244H210" />
      </circle>
      <g className="float-a">
        <path className="pop" d={rr(26, 92, 104, 66, 12)} fill="white" fillOpacity={0.18} style={order(6)} />
        <L i={5} d={rr(26, 92, 104, 66, 12)} />
        <path className="pop" d={circle(56, 125, 12)} fill={SKY} style={order(7)} />
        <L i={7} d="M80 114h32M80 128h32M80 142h20" />
      </g>
      <g className="float-b">
        <path className="pop" d={rr(444, 96, 80, 104, 10)} fill="white" fillOpacity={0.18} style={order(7)} />
        <L i={6} d={rr(444, 96, 80, 104, 10)} />
        <L i={8} d="M458 120h52M458 136h52M458 152h34" />
        <path className="ln" d="M458 176c8-14 12 8 18-4s8 6 14-2 6 4 16-1" pathLength={1} stroke="white" strokeWidth={2.2} strokeLinecap="round" style={order(9)} />
      </g>
    </Art>
  );
}

/** Loose shapes around the first headline: they rise at different speeds as you scroll. */
export function Fragments() {
  const piece = 'M0 0h22v8a7 7 0 1 1 0 14v8H0z';
  const hex = 'M15 0l13 7.500v15L15 30 2 22.500v-15z';
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      {[
        { left: '7%', top: '38%', speed: -180, rotate: -14, size: 64, d: piece, fill: SKY },
        { left: '16%', top: '11%', speed: -90, rotate: 10, size: 40, d: hex, fill: VIOLET },
        { left: '83%', top: '12%', speed: -240, rotate: 16, size: 58, d: hex, fill: MAGENTA },
        { left: '90%', top: '48%', speed: -120, rotate: -22, size: 52, d: piece, fill: VIOLET },
        { left: '12%', top: '72%', speed: -300, rotate: 24, size: 36, d: hex, fill: SKY },
        { left: '80%', top: '74%', speed: -60, rotate: 8, size: 42, d: piece, fill: SKY },
      ].map((f, n) => (
        <div key={f.left} className="fragment absolute" style={{ left: f.left, top: f.top, '--speed': `${f.speed}px`, '--turn': `${f.rotate * 3}deg` } as CSSProperties}>
          <svg viewBox="-3 -3 42 38" width={f.size} className="animate-float text-ink" style={{ animationDelay: `${-n * 1.1}s`, rotate: `${f.rotate}deg` }}>
            <path d={f.d} fill={f.fill} fillOpacity="0.45" transform="translate(2.500 2.500)" />
            <path d={f.d} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
        </div>
      ))}
    </div>
  );
}
