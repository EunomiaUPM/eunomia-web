import Link from 'next/link';
import { asset, deployment, ging, site } from '@/lib/site';

export function Footer() {
  const links = [
    { text: 'Project', href: '/' },
    { text: 'Hackathon', href: '/hackathon' },
    { text: 'Deployment site', href: deployment.web },
    { text: 'Deployment repository', href: deployment.repo },
    { text: 'GitHub', href: site.github },
    { text: 'GING', href: ging.url },
  ];
  return (
    <footer className="relative isolate overflow-hidden rounded-t-[40px] bg-night text-white">
      <div aria-hidden className="absolute -right-32 -top-40 -z-10 size-[520px] rounded-full bg-violet/35 blur-[110px]" />
      <div aria-hidden className="absolute -bottom-52 left-1/4 -z-10 size-[460px] rounded-full bg-magenta/20 blur-[110px]" />
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.4fr_1fr]">
        <div>
          <img src={asset('/brand/eunomia_logo_lg_light.svg')} alt={site.name} className="h-8 w-auto" />
          <address className="mt-6 text-sm not-italic leading-relaxed text-white/70">
            {site.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <a href={`mailto:${site.contact}`} className="mt-2 block underline-offset-4 hover:text-white hover:underline">
              {site.contact}
            </a>
          </address>
        </div>
        <ul className="grid grid-cols-2 content-start gap-x-8 gap-y-3 text-sm">
          {links.map((l) => (
            <li key={l.text}>
              {l.href.startsWith('/') ? (
                <Link href={l.href} className="text-white/80 transition-colors hover:text-white">
                  {l.text}
                </Link>
              ) : (
                <a href={l.href} className="text-white/80 transition-colors hover:text-white">
                  {l.text}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
      <p className="mx-auto w-full max-w-6xl px-6 pb-9 text-xs text-white/50">Open source under {site.license}</p>
    </footer>
  );
}
