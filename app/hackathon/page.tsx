import { ArrowRight, ArrowUpRight, BookOpen, CalendarDays, Check, Clock, FolderGit2, MapPin, Plus, Ticket } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { Contract, Exchange, Hill, Identity, Launch, Rocket, Stack, Steps, Summit } from '@/components/art';
import { Commands } from '@/components/commands';
import { DaysLeft } from '@/components/days-left';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { ScrollEffects } from '@/components/scroll-effects';
import { Aurora, Button, Eyebrow, Orb, Title } from '@/components/ui';
import { beforeYouCome, challenges, faq, hackathon, milestones, needs } from '@/lib/hackathon';
import { deployment } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Hackathon',
  description: `${hackathon.dateLabel} at ${hackathon.placeShort}: build a data space with EUNOMIA, then build on it.`,
};

const toBeAnnounced = 'To be announced';

const levelLooks = [
  { panel: 'from-sky/45 to-sky/10', pill: 'bg-sky/60', art: Hill },
  { panel: 'from-violet/25 to-violet/5', pill: 'bg-violet/25', art: Steps },
  { panel: 'from-magenta/25 to-magenta/5', pill: 'bg-magenta/30', art: Summit },
];

const milestoneArt = [Rocket, Identity, Contract, Exchange];

export default function HackathonPage() {
  const facts = [
    { icon: CalendarDays, label: 'When', value: hackathon.days.join(' and ') },
    { icon: MapPin, label: 'Where', value: `${hackathon.place}. ${hackathon.address}`, href: hackathon.map },
    { icon: Clock, label: 'Schedule and room', value: [hackathon.schedule, hackathon.room].filter(Boolean).join(', ') || toBeAnnounced },
    { icon: Ticket, label: 'Registration', value: hackathon.registrationUrl ? 'Save your seat' : toBeAnnounced, href: hackathon.registrationUrl ?? undefined },
  ];
  return (
    <div className="relative overflow-x-clip">
      <ScrollEffects />
      <Header
        items={[
          { text: 'The project', href: '/' },
          { text: 'Milestones', href: '#milestones' },
          { text: 'Challenges', href: '#challenges' },
          { text: 'Tools', href: '#tools' },
        ]}
      />

      <main>
        {/* Hero */}
        <div className="px-3 pt-4 sm:px-5">
          <section
            data-progress
            data-start="0"
            data-end="0"
            className="relative isolate mx-auto max-w-[1360px] overflow-hidden rounded-[40px] px-6 pb-36 pt-16 text-white md:px-16 md:pb-44 md:pt-24"
            style={{
              background:
                'radial-gradient(42% 62% at 84% 104%, #9dd5f2 0%, rgb(157 213 242 / 0) 100%), radial-gradient(52% 72% at 98% 6%, #e86cf0 0%, rgb(232 108 240 / 0) 100%), linear-gradient(112deg, #24234c 18%, #4f3fb4 60%, #8b6cff 100%)',
            }}
          >
            <div aria-hidden className="absolute right-2 top-7 -z-10 hidden w-[500px] lg:block xl:right-14" style={{ translate: '0 calc(var(--p) * -70px)', rotate: 'calc(var(--p) * -4deg)' }}>
              <Launch className="h-auto w-full text-white" />
            </div>
            <div className="mx-auto max-w-5xl">
              <p className="inline-flex flex-wrap items-center gap-x-2 rounded-3xl bg-white/15 px-4 py-2 text-sm font-medium ring-1 ring-white/25 backdrop-blur">
                {hackathon.dateLabel} · {hackathon.placeShort}
              </p>
              <Title as="h1" text="Build a data space. Then build on it." accent="Then build on it." accentClass="text-sky" className="mt-7 max-w-[640px] text-5xl leading-[1.03] sm:text-6xl md:text-[76px]" />
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/90 md:text-xl">
                Two days, hands-on with EUNOMIA. Start from a clean laptop, stand up your own authority and agents, negotiate a
                contract and move real data. Then take a challenge and make it yours.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button href={deployment.web} variant="white">
                  Open the deployment site
                </Button>
                <Button href={deployment.repo} variant="glass">
                  Clone the repository
                </Button>
                <p className="ml-1 text-sm font-medium text-white/90">
                  <DaysLeft start={hackathon.start} end={hackathon.end} />
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Facts */}
        <dl className="relative z-10 mx-auto -mt-24 grid w-full max-w-6xl gap-3 px-4 sm:grid-cols-2 sm:px-6 md:-mt-28 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="rounded-[28px] bg-white p-6 shadow-[0_24px_60px_-30px_rgb(36_35_76/0.4)]">
              <f.icon aria-hidden className="size-6 text-[#6a4fe0]" strokeWidth={1.8} />
              <dt className="mt-4 text-sm font-medium text-ink/60">{f.label}</dt>
              <dd className="mt-1 font-medium leading-snug">
                {f.href ? (
                  <a href={f.href} className="underline decoration-violet/40 underline-offset-4 hover:decoration-violet">
                    {f.value}
                  </a>
                ) : (
                  f.value
                )}
              </dd>
            </div>
          ))}
        </dl>

        {/* Milestones */}
        <section id="milestones" className="relative isolate mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <Aurora className="-right-52 top-20 h-[620px] w-[760px] opacity-50" />
          <div className="reveal max-w-3xl">
            <Eyebrow>Start here</Eyebrow>
            <Title text="Four milestones to your first data space." accent="your first data space." className="mt-3 text-4xl leading-[1.08] md:text-[56px]" />
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/75">Each one ends with something you can see. Together they take about an hour.</p>
          </div>
          <ol data-progress data-start="0.62" data-end="0.72" className="relative mt-14 space-y-5">
            <div aria-hidden className="absolute bottom-20 left-[27px] top-14 hidden w-0.5 rounded-full bg-ink/10 md:block">
              <div className="rail-fill size-full rounded-full bg-gradient-to-b from-sky via-violet to-magenta" />
              <span className="rail-mark absolute left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_4px_rgb(139_108_255/0.9),0_0_22px_6px_rgb(232_108_240/0.55)]" />
            </div>
            {milestones.map((m, n) => {
              const Art = milestoneArt[n];
              return (
              <li key={m.number} className="mile reveal relative md:pl-[84px]" style={{ '--a': n / 4 } as CSSProperties}>
                <span className="mile-badge absolute left-0 top-8 hidden size-14 place-items-center overflow-hidden rounded-full bg-white text-lg font-semibold shadow-[0_12px_26px_-10px_rgb(87_63_190/0.7)] ring-[6px] ring-paper md:grid">
                  <span aria-hidden className="mile-on bg-aurora absolute inset-0" />
                  <span className="relative">{m.number}</span>
                </span>
                <div className="card grid gap-6 p-7 md:p-9 lg:grid-cols-[1fr_1.05fr]">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-aurora font-soft text-3xl md:hidden">{m.number}</p>
                        <h3 className="font-soft text-[30px] leading-tight">{m.title}</h3>
                        <p className="mt-1 text-ink/65">{m.subtitle}</p>
                      </div>
                      <Art className="-mt-1 h-16 w-auto shrink-0 text-ink sm:-mt-3 sm:h-28" />
                    </div>
                    <ul className="mt-5 space-y-2.5 leading-relaxed text-ink/80">
                      {m.steps.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                    <p className="mt-5 flex gap-2.5 text-sm font-semibold">
                      <span aria-hidden className="bg-aurora mt-px grid size-5 shrink-0 place-items-center rounded-full">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      {m.result}
                    </p>
                  </div>
                  <Commands className="self-start" title={`milestone ${m.number}`} commands={m.commands} />
                </div>
              </li>
              );
            })}
          </ol>
        </section>

        {/* Challenges */}
        <section id="challenges" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <div className="reveal">
            <Eyebrow>Then</Eyebrow>
            <Title text="Pick a challenge." accent="challenge." className="mt-3 text-5xl leading-[1.05] md:text-[72px]" />
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {challenges.map((group, i) => {
              const Art = levelLooks[i].art;
              return (
              <div key={group.level} className={`reveal rounded-[32px] bg-gradient-to-b p-3 ${levelLooks[i].panel}`}>
                <div className="flex items-end justify-between px-3 pb-3 pt-2">
                  <p className={`rounded-full px-4 py-1.5 text-sm font-semibold ${levelLooks[i].pill}`}>{group.level}</p>
                  <Art className="h-20 w-auto text-ink" />
                </div>
                <div className="space-y-3">
                  {group.items.map((c) => (
                    <article key={c.title} className="rounded-[22px] bg-white/85 p-6 shadow-[0_14px_34px_-26px_rgb(36_35_76/0.5)]">
                      <h3 className="font-soft text-2xl leading-tight">{c.title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-ink/75">{c.body}</p>
                      {c.link && (
                        <a href={deployment[c.link.to]} className="group mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#5b41cf]">
                          {c.link.text}
                          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
                        </a>
                      )}
                    </article>
                  ))}
                </div>
              </div>
              );
            })}
          </div>
        </section>

        {/* What you need */}
        <section className="relative isolate mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <Aurora className="-left-52 top-10 h-[520px] w-[720px] opacity-50" />
          <div className="flex items-end justify-between gap-8">
            <div className="reveal max-w-3xl">
              <Eyebrow>What you need</Eyebrow>
              <Title text="A laptop and Docker. Or just a browser." accent="Or just a browser." className="mt-3 text-4xl leading-[1.08] md:text-[56px]" />
            </div>
            <Stack className="hidden h-40 w-auto shrink-0 text-ink sm:block" />
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            <ul className="card reveal space-y-5 p-8">
              {needs.map((n) => (
                <li key={n} className="flex gap-3.5 leading-relaxed">
                  <span aria-hidden className="bg-aurora mt-0.5 grid size-6 shrink-0 place-items-center rounded-full">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  {n}
                </li>
              ))}
            </ul>
            <div className="card reveal min-w-0 p-4">
              <Commands title="before you come" commands={beforeYouCome} />
              <p className="px-3 pb-2 pt-4 text-sm leading-relaxed text-ink/75">
                Run this at home: the images download once, and not over the venue’s network. Stuck? Open it in{' '}
                <a href={deployment.codespaces} className="font-semibold text-[#5b41cf] underline-offset-4 hover:underline">
                  Codespaces
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Tools */}
        <div className="px-3 sm:px-5">
          <section id="tools" data-progress data-start="1" data-end="0.55" className="grow bg-aurora relative isolate mx-auto max-w-[1360px] overflow-hidden rounded-[40px] px-6 py-20 md:px-16 md:py-24">
            <div className="mx-auto max-w-5xl">
              <Eyebrow className="text-ink/75">Your tools</Eyebrow>
              <Title text="Everything you run is in eunomia-deployment." className="mt-3 max-w-3xl text-4xl leading-[1.08] md:text-[56px]" />
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                <a href={deployment.web} className="card card-link group bg-white/85 p-8">
                  <span className="flex items-start justify-between">
                    <Orb icon={BookOpen} />
                    <ArrowUpRight aria-hidden className="size-5 text-ink/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                  <h3 className="font-soft mt-6 text-3xl">The deployment site</h3>
                  <p className="mt-2 text-ink/75">Quickstart, CLI, architecture and API reference.</p>
                  <p className="mt-4 break-all text-sm font-medium text-[#5b41cf]">{deployment.web.replace('https://', '')}</p>
                </a>
                <a href={deployment.repo} className="card card-link group bg-white/85 p-8">
                  <span className="flex items-start justify-between">
                    <Orb icon={FolderGit2} tone="magenta" />
                    <ArrowUpRight aria-hidden className="size-5 text-ink/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                  <h3 className="font-soft mt-6 text-3xl">The repository</h3>
                  <p className="mt-2 text-ink/75">The CLI, the demo factory and the extension to copy.</p>
                  <p className="mt-4 break-all text-sm font-medium text-[#5b41cf]">{deployment.repo.replace('https://', '')}</p>
                </a>
              </div>
              <ul className="mt-7 flex flex-wrap gap-2 text-sm font-medium">
                {[
                  ['Quickstart', deployment.quickstart],
                  ['Requirements', deployment.requirements],
                  ['Build an extension', deployment.extension],
                  ['The demo factory', deployment.factory],
                  ['API reference', deployment.api],
                ].map(([text, href]) => (
                  <li key={text}>
                    <a href={href} className="inline-block rounded-full bg-white/55 px-4 py-2 transition-colors hover:bg-white">
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* FAQ */}
        <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[1fr_1.5fr]">
          <div className="reveal">
            <Eyebrow>Questions</Eyebrow>
            <Title text="Before you ask." accent="you ask." className="mt-3 text-5xl leading-[1.05] md:text-[64px]" />
            <Link href="/" className="group mt-8 inline-flex items-center gap-1.5 font-semibold text-[#5b41cf]">
              What is EUNOMIA?
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {faq.map((f) => (
              <details key={f.q} className="card reveal group rounded-[22px] px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Plus aria-hidden className="size-5 shrink-0 text-[#6a4fe0] transition-transform group-open:rotate-45" />
                </summary>
                <p className="mt-3 leading-relaxed text-ink/75">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
