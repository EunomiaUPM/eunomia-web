import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { asset, deployment, site } from '@/lib/site';

type Item = { text: string; href: string };

/** A floating bar on top of both landings. */
export function Header({ items }: { items: Item[] }) {
  return (
    <header className="sticky top-3 z-30 mx-auto mt-3 w-full max-w-6xl px-3 sm:px-6">
      <div className="flex h-[60px] items-center justify-between gap-6 rounded-full border border-white/90 bg-white/75 pl-6 pr-2.5 shadow-[0_14px_40px_-22px_rgb(36_35_76/0.45)] backdrop-blur-xl">
        <Link href="/" aria-label="EUNOMIA home">
          <img src={asset('/brand/eunomia_logo_lg_dark.svg')} alt={site.name} className="h-[26px] w-auto" />
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {items.map((item) => {
            const look = 'hidden rounded-full px-3.5 py-2 text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink md:inline';
            return item.href.startsWith('/') && !item.href.includes('#') ? (
              <Link key={item.text} href={item.href} className={look}>
                {item.text}
              </Link>
            ) : (
              <a key={item.text} href={item.href} className={look}>
                {item.text}
              </a>
            );
          })}
          <a href={deployment.web} className="group ml-2 inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 font-medium text-white transition-colors hover:bg-[#2f2d63]">
            Deploy
            <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </nav>
      </div>
    </header>
  );
}
