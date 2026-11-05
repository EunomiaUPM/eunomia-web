import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import type { ComponentType } from 'react';
import { Agent, Atlas, Balance, Catalog, Fragments, Gears, Interlock, Layers, Lightness, Shield, Sustainable } from '@/components/art';
import { Constellation } from '@/components/constellation';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { ScrollEffects } from '@/components/scroll-effects';
import { Aurora, Button, Eyebrow, Title } from '@/components/ui';
import { hackathon } from '@/lib/hackathon';
import { alignedWith, asset, deployment, drivers, funding, ging, pieces, projects, site, standards, team, type Piece } from '@/lib/site';

type Drawing = ComponentType<{ className?: string }>;

const driverArt: Drawing[] = [Lightness, Layers, Interlock];
const pieceArt: Record<string, Drawing> = {
  Heimdall: Shield,
  'DS-Agent': Agent,
  'Federated catalog': Catalog,
  Orchestrator: Gears,
  'Control and governance': Balance,
};
const projectArt: Drawing[] = [Sustainable, Atlas];

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('');
}

function Drawing({ art: Art, className = '-ml-2 h-36 w-auto text-ink' }: { art: Drawing; className?: string }) {
  return <Art className={className} />;
}

function Status({ status }: { status: Piece['status'] }) {
  if (!status) return null;
  return status === 'Available' ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-sky/30 px-3 py-1 text-xs font-medium text-[#1d6da6]">
      <span className="size-1.5 rounded-full bg-signal" />
      {status}
    </span>
  ) : (
    <span className="rounded-full bg-violet/12 px-3 py-1 text-xs font-medium text-[#5b41cf]">{status}</span>
  );
}

function PieceCard({ piece, big }: { piece: Piece; big?: boolean }) {
  const Art = pieceArt[piece.name];
  return (
    <article className={`card reveal relative isolate flex flex-col overflow-hidden p-7 md:p-8 ${big ? 'md:col-span-3' : 'md:col-span-2'}`}>
      {big && <div aria-hidden className="absolute -right-20 -top-24 -z-10 size-80 rounded-full bg-gradient-to-br from-sky/50 to-violet/25 blur-3xl" />}
      <div className="flex items-start justify-between gap-3">
        <Art className={`text-ink ${big ? 'h-44 w-auto' : 'h-32 w-auto'} -ml-3`} />
        <Status status={piece.status} />
      </div>
      <p className="mt-7 text-sm font-medium text-ink/60">{piece.role}</p>
      <h3 className={`font-soft mt-1 ${big ? 'text-[34px] leading-tight' : 'text-[26px] leading-tight'}`}>{piece.name}</h3>
      <p className="mt-3 leading-relaxed text-ink/75">{piece.body}</p>
      {piece.repo && (
        <a href={piece.repo} className="group mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-[#5b41cf]">
          Repository
          <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      )}
    </article>
  );
}

export default function HomePage() {
  return (
    <div className="relative overflow-x-clip">
      <ScrollEffects />
      <Header
        items={[
          { text: 'Framework', href: '#framework' },
          { text: 'Pieces', href: '#pieces' },
          { text: 'In the field', href: '#field' },
          { text: 'Team', href: '#team' },
          { text: 'Hackathon', href: '/hackathon' },
        ]}
      />

      <main>
        {/* Hero */}
        <section data-progress data-start="0" data-end="0" className="relative isolate px-4 pb-6 pt-14 sm:px-6 md:pt-20">
          <Aurora className="-top-24 left-1/2 h-[820px] w-[1500px] max-w-none -translate-x-1/2" />
          <Fragments />
          <div className="mx-auto max-w-4xl text-center">
            <Link
              href="/hackathon"
              className="group inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 rounded-3xl border border-white bg-white/70 py-1.5 pl-1.5 pr-4 text-sm shadow-[0_10px_30px_-18px_rgb(36_35_76/0.5)] backdrop-blur transition-colors hover:bg-white"
            >
              <span className="bg-aurora rounded-full px-3 py-1 text-[13px] font-semibold text-ink">Hackathon</span>
              <span className="text-ink/80">
                {hackathon.dateLabel}, {hackathon.placeShort}
              </span>
              <ArrowRight aria-hidden className="size-4 text-ink/60 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Eyebrow className="mt-9">Open-source data spaces</Eyebrow>
            <Title as="h1" text="The pieces to build a data space." accent="data space." className="mt-4 text-5xl leading-[1.02] sm:text-6xl md:text-[84px]" />
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-ink/75 md:text-xl">
              EUNOMIA is a framework with a minimal footprint and an ergonomic API, compliant with the open standards data
              spaces run on. Made from scratch in Rust and Go, and ready for the cloud and the edge.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button href={deployment.web}>Deploy EUNOMIA</Button>
              <Button href={site.github} variant="ghost">
                Source on GitHub
              </Button>
            </div>
          </div>
        </section>

        {/* The pieces come together with the scroll */}
        <section data-progress data-start="0.8" data-end="1" className="stage relative h-[250vh] px-4 sm:px-6">
          <div className="sticky top-0 flex h-svh items-center justify-center pt-16">
            <div className="grow card w-full max-w-[min(72rem,calc((100svh-8rem)*1.82))] rounded-[36px] p-3 sm:p-6">
              <Constellation />
            </div>
          </div>
        </section>

        {/* Framework */}
        <section id="framework" className="relative isolate mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <Aurora className="-left-40 top-1/3 h-[560px] w-[760px] opacity-60" />
          <div className="reveal max-w-3xl">
            <Eyebrow>The framework</Eyebrow>
            <Title text="Small enough for the edge. Strict enough for a data space." accent="Strict enough for a data space." className="mt-3 text-4xl leading-[1.08] md:text-[56px]" />
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {drivers.map((d, i) => (
              <div key={d.title} className="card reveal overflow-hidden p-8">
                <Drawing art={driverArt[i]} />
                <h3 className="font-soft mt-6 text-[26px] leading-tight">{d.title}</h3>
                <p className="mt-3 leading-relaxed text-ink/75">{d.body}</p>
              </div>
            ))}
          </div>
          <dl className="card reveal mt-4 flex flex-wrap justify-between gap-x-8 gap-y-7 p-8">
            {standards.map((s) => (
              <div key={s.group}>
                <dt className="text-sm font-medium text-ink/60">{s.group}</dt>
                <dd className="mt-3 flex flex-wrap gap-1.5">
                  {s.items.map((item) => (
                    <span key={item} className="whitespace-nowrap rounded-full bg-mist px-2.5 py-1.5 text-[13px] font-medium">
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
            <div>
              <dt className="text-sm font-medium text-ink/60">Aligned with</dt>
              <dd className="mt-3 flex flex-wrap gap-1.5">
                {alignedWith.map((item) => (
                  <span key={item} className="bg-aurora rounded-full px-2.5 py-1.5 text-[13px] font-semibold">
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </section>

        {/* Pieces */}
        <section id="pieces" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <div className="reveal max-w-3xl">
            <Eyebrow>The pieces</Eyebrow>
            <Title text="Take what your data space needs." accent="what your data space needs." className="mt-3 text-4xl leading-[1.08] md:text-[56px]" />
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-6">
            {pieces.map((p, i) => (
              <PieceCard key={p.name} piece={p} big={i < 2} />
            ))}
          </div>
        </section>

        {/* In the field */}
        <div className="px-3 sm:px-5">
          <section id="field" data-progress data-start="1" data-end="0.55" className="grow relative isolate mx-auto max-w-[1360px] overflow-hidden rounded-[40px] bg-ink px-6 py-20 text-white md:px-16 md:py-24">
            <div aria-hidden className="animate-drift absolute -left-24 -top-32 -z-10 size-[520px] rounded-full bg-violet/55 blur-[110px]" />
            <div aria-hidden className="animate-drift-slow absolute -bottom-40 right-0 -z-10 size-[560px] rounded-full bg-magenta/30 blur-[120px]" />
            <div aria-hidden className="animate-drift absolute right-1/4 top-0 -z-10 size-[340px] rounded-full bg-sky/30 blur-[100px]" />
            <div className="mx-auto max-w-5xl">
              <Eyebrow className="text-sky">In the field</Eyebrow>
              <Title text="Deployed in real data space projects." accent="real data space projects." accentClass="text-sky" className="mt-3 max-w-3xl text-4xl leading-[1.08] md:text-[56px]" />
              <div className="mt-12 grid gap-4 md:grid-cols-2">
                {projects.map((p, i) => (
                  <a key={p.name} href={p.repo} className="card-link group rounded-[28px] border border-white/15 bg-white/10 p-8 backdrop-blur-xl">
                    <span className="flex items-start justify-between">
                      <Drawing art={projectArt[i]} className="-ml-2 h-40 w-auto text-white" />
                      <ArrowUpRight aria-hidden className="size-5 text-white/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                    <h3 className="font-soft mt-6 text-3xl">{p.name}</h3>
                    <p className="mt-3 leading-relaxed text-white/80">{p.body}</p>
                  </a>
                ))}
              </div>
              <div className="mt-12 flex flex-col gap-8 border-t border-white/15 pt-10 md:flex-row md:items-center md:justify-between">
                <div className="flex shrink-0 items-center gap-10">
                  <img src={asset('/brand/incibe_logo_white.png')} alt="INCIBE" className="h-10 w-auto" />
                  <img src={asset('/brand/upm_logo_light.svg')} alt="Universidad Politécnica de Madrid" className="h-12 w-auto" />
                </div>
                <p className="max-w-xl text-sm leading-relaxed text-white/75">{funding}</p>
              </div>
            </div>
          </section>
        </div>

        {/* Team */}
        <section id="team" className="relative isolate mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[1.1fr_1fr]">
          <Aurora className="-right-52 top-10 h-[520px] w-[720px] opacity-50" />
          <div className="reveal">
            <Eyebrow>Made by {ging.name}</Eyebrow>
            <Title text="From scratch, at Universidad Politécnica de Madrid." accent="From scratch," className="mt-3 text-4xl leading-[1.08] md:text-[56px]" />
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75">
              <a href={ging.url} className="font-semibold text-[#5b41cf] underline-offset-4 hover:underline">
                {ging.name}, the {ging.fullName}
              </a>
              : {ging.about.charAt(0).toLowerCase() + ging.about.slice(1)}
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {team.map((m, i) => (
              <li key={m.name} className={`card reveal p-6 ${i % 2 === 1 ? 'sm:translate-y-6' : ''}`}>
                <span aria-hidden className="bg-aurora grid size-14 place-items-center rounded-full text-base font-semibold text-ink">
                  {initials(m.name)}
                </span>
                <p className="mt-5 text-lg font-semibold leading-snug">{m.name}</p>
                <p className="mt-1 text-sm text-ink/65">{m.role}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Next steps */}
        <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 pb-20 pt-6 sm:px-6 md:grid-cols-2">
          <Link href="/hackathon" className="card-link reveal bg-aurora group flex min-h-64 flex-col justify-end rounded-[32px] p-9">
            <ArrowUpRight aria-hidden className="mb-auto ml-auto size-6 text-ink/70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <p className="text-sm font-semibold">{hackathon.dateLabel}</p>
            <h2 className="font-soft mt-2 text-4xl leading-[1.08]">Build on it with us at the hackathon</h2>
            <p className="mt-3 text-ink/85">Two days at {hackathon.placeShort}.</p>
          </Link>
          <a href={deployment.web} className="card card-link reveal group flex min-h-64 flex-col justify-end rounded-[32px] p-9">
            <ArrowUpRight aria-hidden className="mb-auto ml-auto size-6 text-ink/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <p className="text-sm font-semibold text-[#5b41cf]">eunomia-deployment</p>
            <h2 className="font-soft mt-2 text-4xl leading-[1.08]">Run it yourself</h2>
            <p className="mt-3 text-ink/75">From one laptop to one server per participant.</p>
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
