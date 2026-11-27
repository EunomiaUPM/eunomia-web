import { ArrowRight, ArrowUpRight, BookOpen, CalendarDays, Check, ChevronDown, Clock, Coffee, FolderGit2, MapPin, Plus, Scale, Ticket, Trophy } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import type { CSSProperties, ReactNode } from 'react';
import { Contract, Exchange, Hill, Identity, Launch, Rocket, Stack, Summit } from '@/components/art';
import { Commands } from '@/components/commands';
import { DaysLeft } from '@/components/days-left';
import { Footer } from '@/components/footer';
import { TrackTabs } from '@/components/track-tabs';
import { Header } from '@/components/header';
import { ScrollEffects } from '@/components/scroll-effects';
import { Aurora, Button, Eyebrow, Orb, Title } from '@/components/ui';
import { agenda, beforeYouCome, faq, hackathon, milestones, needs, tracks, treeJudging, upmJudging, type Criterion, type Item, type Section, type Track } from '@/lib/hackathon';
import { deployment } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Hackathon',
  description: `${hackathon.dateLabel} at ${hackathon.placeShort}: ${hackathon.tagline} Build a data space with EUNOMIA, then take a challenge.`,
};

const toBeAnnounced = 'To be announced';

const trackLooks: Record<string, { wash: string; art: typeof Hill; tone: 'sky' | 'magenta' }> = {
  upm: {
    wash: 'radial-gradient(60% 70% at 0% 0%, rgb(157 213 242 / 0.75) 0%, rgb(157 213 242 / 0) 100%), radial-gradient(50% 60% at 100% 100%, rgb(139 108 255 / 0.28) 0%, rgb(139 108 255 / 0) 100%)',
    art: Hill,
    tone: 'sky',
  },
  tree: {
    wash: 'radial-gradient(60% 70% at 100% 0%, rgb(232 108 240 / 0.38) 0%, rgb(232 108 240 / 0) 100%), radial-gradient(50% 60% at 0% 100%, rgb(139 108 255 / 0.3) 0%, rgb(139 108 255 / 0) 100%)',
    art: Summit,
    tone: 'magenta',
  },
};

function ItemText({ item }: { item: Item }) {
  return typeof item === 'string' ? (
    <>{item}</>
  ) : (
    <>
      <strong className="font-semibold text-ink">{item[0]}</strong> {item[1]}
    </>
  );
}

function ChallengeSection({ section }: { section: Section }) {
  const List = section.ordered ? 'ol' : 'ul';
  return (
    <div>
      <h4 className="text-sm font-semibold uppercase tracking-wide text-[#6a4fe0]">{section.heading}</h4>
      {section.text?.map((t) => (
        <p key={t} className="mt-2 leading-relaxed text-ink/80">
          {t}
        </p>
      ))}
      {section.items && (
        <List className={`mt-2 space-y-1.5 pl-5 leading-relaxed text-ink/80 ${section.ordered ? 'list-decimal' : 'list-disc'}`}>
          {section.items.map((item, n) => (
            <li key={n}>
              <ItemText item={item} />
            </li>
          ))}
        </List>
      )}
      {section.closing && <p className="mt-3 border-l-2 border-violet/50 pl-4 italic leading-relaxed text-ink/75">{section.closing}</p>}
    </div>
  );
}

function Points({ criteria, total, header = 'Criterion' }: { criteria: Criterion[]; total?: string; header?: string }) {
  return (
    <table className="mt-3 w-full border-collapse text-[15px]">
      <thead>
        <tr className="border-b border-ink/15 text-left text-sm text-ink/60">
          <th className="py-2 pr-3 font-medium">{header}</th>
          <th className="py-2 text-right font-medium">Points</th>
        </tr>
      </thead>
      <tbody>
        {criteria.map((c) => (
          <tr key={c.title} className="border-b border-ink/10 align-top">
            <td className="py-3 pr-3">
              <span className="font-semibold">{c.title}</span>
              <span className="mt-0.5 block text-sm leading-relaxed text-ink/65">{c.body}</span>
            </td>
            <td className="py-3 text-right font-semibold tabular-nums text-[#5b41cf]">{c.points}</td>
          </tr>
        ))}
      </tbody>
      {total && (
        <tfoot>
          <tr className="font-semibold">
            <td className="pt-3">Total</td>
            <td className="pt-3 text-right tabular-nums text-[#5b41cf]">{total}</td>
          </tr>
        </tfoot>
      )}
    </table>
  );
}

const levelLabels = [
  { range: '0–1', className: 'text-[#b3261e]' },
  { range: '2', className: 'text-[#8a6500]' },
  { range: '3–4', className: 'text-[#1e7e34]' },
];

function UpmJudging() {
  return (
    <>
      <ul className="mt-4 flex flex-wrap gap-2 text-sm">
        {upmJudging.summary.map((x) => (
          <li key={x.label} className="rounded-full bg-sky/30 px-4 py-2">
            {x.label} <span className="font-semibold text-[#5b41cf]">{x.points}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div>
          <h4 className="text-lg font-semibold">I. Cross-cutting criteria, for every team</h4>
          <Points criteria={upmJudging.crossCutting} total="50" />
        </div>
        <div>
          <h4 className="text-lg font-semibold">III. Bonus: conceptual design and business models (up to +10)</h4>
          <Points criteria={upmJudging.bonus} header="Level" />
        </div>
        {upmJudging.technical.map((t) => (
          <div key={t.challenge}>
            <h4 className="text-lg font-semibold">
              II. Technical execution · Challenge {t.challenge}: {t.title}
            </h4>
            <p className="mt-2 border-l-2 border-violet/50 pl-4 text-sm leading-relaxed text-ink/70">{t.note}</p>
            <Points criteria={t.criteria} total="50" />
          </div>
        ))}
      </div>
      <h4 className="mt-10 text-lg font-semibold">Tiebreak</h4>
      <ol className="mt-2 list-decimal space-y-1.5 pl-5 leading-relaxed text-ink/80">
        {upmJudging.tiebreak.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ol>
    </>
  );
}

function TreeJudging() {
  return (
    <>
      <p className="mt-2 leading-relaxed text-ink/75">
        Out of <strong className="font-semibold text-ink">100 points</strong>. For each criterion the jury gives a level from 0 to 4, on this scale.
      </p>
      <div className="mt-6 space-y-3">
        {treeJudging.map((c, n) => (
          <div key={c.title} className="overflow-hidden rounded-[18px] ring-1 ring-ink/10">
            <div className="flex justify-between gap-3 bg-mist px-5 py-3 font-semibold">
              <span>
                {n + 1}. {c.title}
              </span>
              <span className="whitespace-nowrap text-[#5b41cf]">{c.points} pts</span>
            </div>
            <div className="grid md:grid-cols-3">
              {c.levels.map((l, k) => (
                <p key={k} className="border-t border-ink/10 px-5 py-3 text-sm leading-relaxed text-ink/75 md:border-l md:first:border-l-0">
                  <span className={`block text-xs font-bold uppercase tracking-wide ${levelLabels[k].className}`}>{levelLabels[k].range}</span>
                  {l}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

const judgingOf: Record<string, () => ReactNode> = { upm: UpmJudging, tree: TreeJudging };

/** What a track tab shows: its challenges, then how they are scored, folded away. */
function TrackPanel({ track }: { track: Track }) {
  const look = trackLooks[track.id];
  const Judging = judgingOf[track.id];
  return (
    <div className="mx-auto max-w-5xl">
      <div className="tab-item flex items-center gap-5 rounded-[26px] bg-white/80 p-5 shadow-[0_14px_34px_-26px_rgb(36_35_76/0.5)] sm:p-6">
        <Orb icon={Trophy} tone={look.tone} />
        <div className="min-w-0 flex-1">
          <p className="font-soft text-3xl leading-tight">{track.prize}</p>
          <p className="mt-1 text-sm leading-snug text-ink/70">{track.prizeNote}</p>
        </div>
        <look.art className="tab-art hidden h-20 w-auto shrink-0 text-ink sm:block" />
      </div>

      <div className="mt-4 space-y-3">
        {track.challenges.map((c, n) => (
          <details
            key={c.number}
            open={n === 0}
            className="smooth tab-item group rounded-[22px] bg-white/85 shadow-[0_14px_34px_-26px_rgb(36_35_76/0.5)] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_-26px_rgb(36_35_76/0.6)]"
            style={{ '--i': n + 1 } as CSSProperties}
          >
            <summary className="flex cursor-pointer list-none items-center gap-4 p-6 [&::-webkit-details-marker]:hidden">
              <span className="bg-aurora grid size-11 shrink-0 place-items-center rounded-full text-lg font-semibold transition-transform duration-500 group-open:rotate-[360deg]">
                {c.number}
              </span>
              <span className="min-w-0 flex-1">
                <span className="font-soft block text-2xl leading-tight">
                  {c.title}
                  {c.prize && (
                    <span className="ml-2 inline-block translate-y-[-3px] rounded-full bg-[#fff6dd] px-2.5 py-0.5 align-middle font-sans text-xs font-semibold text-[#8a6500]">
                      {c.prize}
                    </span>
                  )}
                </span>
                <span className="mt-1 block text-ink/65">{c.tagline}</span>
              </span>
              <Plus aria-hidden className="size-5 shrink-0 text-[#6a4fe0] transition-transform duration-300 group-open:rotate-45" />
            </summary>
            <div className="space-y-6 px-6 pb-7 md:pl-[84px]">
              {c.sections.map((sec) => (
                <ChallengeSection key={sec.heading} section={sec} />
              ))}
              {c.milestones && (
                <a href="#milestones" className="group/l inline-flex items-center gap-1 text-sm font-semibold text-[#5b41cf]">
                  The four milestones get you there
                  <ArrowRight aria-hidden className="size-4 transition-transform group-hover/l:translate-x-0.5" />
                </a>
              )}
            </div>
          </details>
        ))}
      </div>

      <details
        className="smooth tab-item group/j mt-6 rounded-[22px] border border-dashed border-ink/20 bg-white/45 backdrop-blur transition-colors open:border-solid open:bg-white/85"
        style={{ '--i': track.challenges.length + 1 } as CSSProperties}
      >
        <summary className="flex cursor-pointer list-none items-center gap-3 px-6 py-5 [&::-webkit-details-marker]:hidden">
          <Scale aria-hidden className="size-5 shrink-0 text-[#6a4fe0]" strokeWidth={1.8} />
          <span className="flex-1 font-semibold">How the jury scores</span>
          <span className="text-sm text-ink/55 group-open/j:hidden">Show the rubric</span>
          <ChevronDown aria-hidden className="size-5 shrink-0 text-[#6a4fe0] transition-transform duration-300 group-open/j:rotate-180" />
        </summary>
        <div className="px-6 pb-7">
          <Judging />
        </div>
      </details>

      {track.funding && <p className="tab-item mt-5 px-2 text-sm leading-relaxed text-ink/60" style={{ '--i': track.challenges.length + 2 } as CSSProperties}>{track.funding}</p>}
    </div>
  );
}

const milestoneArt = [Rocket, Identity, Contract, Exchange];

export default function HackathonPage() {
  const facts = [
    { icon: CalendarDays, label: 'When', value: hackathon.days.join(' and ') },
    { icon: MapPin, label: 'Where', value: `${hackathon.format}. ${hackathon.place}, ${hackathon.address}`, href: hackathon.map },
    { icon: Clock, label: 'Schedule and room', value: [hackathon.schedule, hackathon.room].filter(Boolean).join(', ') || toBeAnnounced, href: '#agenda' },
    { icon: Ticket, label: 'Registration', value: hackathon.registrationUrl ? 'Register for the hackathon' : toBeAnnounced, href: hackathon.registrationUrl ?? undefined },
  ];
  return (
    <div className="relative overflow-x-clip">
      <ScrollEffects />
      <Header
        items={[
          { text: 'The project', href: '/' },
          { text: 'Agenda', href: '#agenda' },
          { text: 'Challenges', href: '#challenges' },
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
                {hackathon.tagline} One day, at UPM and online. Stand up a data space with EUNOMIA in under an hour, then take on
                emergencies, the cloud or privacy, with an iPad Pro or €1,000 for the winners.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                {hackathon.registrationUrl && (
                  <Button href={hackathon.registrationUrl} variant="white">
                    Register
                  </Button>
                )}
                <Button href="#challenges" variant="glass">
                  See the challenges
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

        {/* Agenda */}
        <section id="agenda" className="mx-auto grid w-full max-w-6xl gap-10 px-4 pt-20 sm:px-6 md:pt-28 lg:grid-cols-[1fr_1.4fr]">
          <div className="reveal">
            <Eyebrow>The day</Eyebrow>
            <Title text="One day, from welcome to awards." accent="to awards." className="mt-3 text-4xl leading-[1.08] md:text-[56px]" />
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/75">
              {hackathon.days[0]}. {hackathon.format}.
            </p>
          </div>
          <ol className="card reveal overflow-hidden">
            {agenda.map((a) => (
              <li key={a.time} className={`flex gap-5 border-b border-ink/8 px-7 py-4 last:border-b-0 ${a.pause ? 'bg-sky/25' : ''}`}>
                <span className="w-28 shrink-0 font-semibold tabular-nums text-[#5b41cf]">{a.time}</span>
                <span className="flex items-center gap-2">
                  {a.pause && <Coffee aria-hidden className="size-4 text-ink/60" />}
                  {a.activity}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* Milestones */}
        <section id="milestones" className="relative isolate mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <Aurora className="-right-52 top-20 h-[620px] w-[760px] opacity-50" />
          <div className="reveal max-w-3xl">
            <Eyebrow>Challenge 1 starts here</Eyebrow>
            <Title text="Four milestones to your first data space." accent="your first data space." className="mt-3 text-4xl leading-[1.08] md:text-[56px]" />
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/75">
              Each one ends with something you can see. Together they take about an hour: Challenge 1 asks you to do it in under 60 minutes.
            </p>
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
        <section id="challenges" className="py-16 md:py-20">
          <div className="reveal mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="max-w-3xl">
              <Eyebrow>Then</Eyebrow>
              <Title text="Pick a challenge." accent="challenge." className="mt-3 text-5xl leading-[1.05] md:text-[72px]" />
              <p className="mt-5 text-lg leading-relaxed text-ink/75">
                Four challenges in two tracks. Each track has its own judging and its own prize.
              </p>
            </div>
          </div>
          <div className="reveal mt-10 px-3 sm:px-5">
            <TrackTabs
              tabs={tracks.map((t) => ({
                id: t.id,
                name: t.name,
                span: t.span,
                prize: t.prize,
                wash: trackLooks[t.id].wash,
                content: <TrackPanel track={t} />,
              }))}
            />
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
