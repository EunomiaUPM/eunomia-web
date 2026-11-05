# EUNOMIA web

The project website: a one-page landing for EUNOMIA and a landing for the hackathon, linked to each other. Next.js and Tailwind, exported as a static site.

```bash
npm install
npm run dev           # http://localhost:3000
npm run build         # static site in out/
npm run types:check
```

## Where things are

| Path | What |
| --- | --- |
| `app/page.tsx` | The project landing |
| `app/hackathon/page.tsx` | The hackathon landing, with its pointers to eunomia-deployment |
| `lib/site.ts` | Project facts: links, pieces, standards, projects, team, funding |
| `lib/hackathon.ts` | Event facts: dates, place, milestones, challenges. Fill in `schedule`, `room` and `registrationUrl` and the page shows them |
| `app/globals.css` | Theme tokens, from the logo, and every animation |
| `components/art.tsx` | The illustrations: `L` lines draw themselves, `F` shapes pop in after them |
| `components/constellation.tsx` | The pieces coming together with the scroll, on the project landing |
| `components/scroll-effects.tsx` | What drives the effects: `[data-draw]` and `[data-progress]`, which sets `--p` from 0 to 1 |

The technical side (how to deploy, the CLI, extensions) lives in [eunomia-deployment](https://github.com/EunomiaUPM/eunomia-deployment), not here.

## Publishing

`out/` is plain static files. `NEXT_PUBLIC_SITE_URL` sets the canonical URL (default: `https://eunomia.dit.upm.es`), and `NEXT_PUBLIC_BASE_PATH` the sub-path, when there is one.

Every push to `main` builds the site and publishes it to GitHub Pages, at <https://eunomiaupm.github.io/eunomia-web/>, through `.github/workflows/deploy.yml`. The workflow takes both variables from the Pages settings, so a custom domain needs no change here.
