# Seagles Website

Public-facing website for Seagles, an Eagles tribute band based in North-East Scotland. Full requirements live in `docs/product-spec.md` (features/content) and `docs/technical-spec.md` (stack/architecture) — read those before making product or technical decisions here.

## Status

Initial Astro + Tailwind scaffold is in place: shared layout/nav/footer, all six pages from the product spec, and a `gigs` content collection. Not production-ready — several known placeholders still need real content (see below).

- Dev: `npm run dev` (http://localhost:4321) · Build: `npm run build` · Preview: `npm run preview`
- Stack: Astro 7, Tailwind CSS v4 added via `npx astro add tailwind` (wires up `@tailwindcss/vite` in `astro.config.mjs` — this is the current prescribed method; the older `@astrojs/tailwind` integration is v3-only and deprecated, don't use it)
- Theme tokens (`--color-seagles-*`) live in `src/styles/global.css`, derived from the real logo's colors — provisional until a proper branding pass, not final. Site-wide background is a navy → `seagles-black` gradient (with a subtle warm radial glow) applied on `<body>` in `BaseLayout.astro`, going for a 70s "desert dusk" feel rather than the earlier flat cream background — base text is `seagles-cream`; light surfaces (cards, placeholder boxes) use `seagles-cream` instead of white/navy-tint so they still read against the dark gradient
- Gigs: add a show by creating a new markdown file in `src/content/gigs/` with frontmatter `date`, `venue`, `location`, `ticketUrl` (optional) — schema is in `src/content.config.ts`

### Known placeholders to replace (see docs/product-spec.md Content Readiness table)
- `src/pages/about.astro` — bio copy is a placeholder callout, not real text
- `public/images/gallery/` — empty; `src/pages/gallery.astro` renders placeholder tiles until real photos are added
- `src/content/gigs/*.md` — the two existing entries are fake example data, replace/remove once real gig dates exist
- `src/pages/contact.astro` — booking email is a placeholder address; also has an open TODO on whether this stays a `mailto:` link or becomes a real form (needs a backend) — see `docs/technical-spec.md` Open Questions
- `public/images/logo.png` is 2.1MB, heavy for how small it's displayed — worth compressing or moving into `src/assets/` so Astro's `<Image>` component can optimize it at build time

## Git / GitHub

- Remote: https://github.com/bigmealy/seagles (public)
- This is a **personal** project — use the `bigmealy` GitHub account, not a work account, for commits and `gh` operations. If `gh auth status` ever shows a different active account, switch with `gh auth switch -h github.com -u bigmealy` (or `gh auth login` if it isn't stored at all) before pushing or creating PRs/issues.
- Default branch: `main`. CI/CD: `.github/workflows/azure-static-web-apps.yml` builds (`npm ci && npm run build`) and deploys `dist/` to Azure Static Web Apps on every push to `main` (also runnable manually via `workflow_dispatch`). No PR preview environments — deploy-on-push-to-main only. Requires a repo secret `AZURE_STATIC_WEB_APPS_API_TOKEN` (the existing SWA resource's deployment token, from Azure Portal → the resource → Overview → "Manage deployment token", or `az staticwebapp secrets list`) to be set before the workflow can succeed.
- **Never run `git commit` or `git push` in this repo without explicit go-ahead from the user for that specific change.** Make/stage changes and describe what would be committed, then wait for confirmation before committing or pushing.
- **Before committing/pushing, check whether this file (or `docs/`) needs updating first** — e.g. the Status/placeholders list above going stale, a new open decision, a changed setup step. Fold any doc update into the same commit rather than leaving it for later.
