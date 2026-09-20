# Seagles Website — Technical Spec

See `product-spec.md` for the features and content this build needs to support.

## Recommended Stack

- **Framework**: [Astro](https://astro.build) — a static site generator well suited to a mostly-static, content-driven site like this. Ships zero JS by default (fast page loads), has strong built-in image optimization, and supports typed content collections for structured data like gig listings.
- **Styling**: [Tailwind CSS](https://tailwindcss.com) — utility-first CSS with a built-in responsive breakpoint system (`sm:`, `md:`, `lg:`, `xl:`). This directly addresses the stated difficulty with hand-rolled CSS/layout: instead of writing custom media queries and fighting layout bugs, responsive behavior is expressed inline via utility classes, and a small set of shared layout components (below) means most responsive decisions only need to be made once.

This isn't the only valid stack, but it's a good fit for: a static content site, a developer who wants to avoid deep custom CSS, and a straightforward deploy to Azure Static Web Apps.

## Project Structure (indicative)

```
src/
  components/     # Header, Footer, Nav, Section wrapper, GigCard, GalleryItem, etc.
  content/
    gigs/         # Astro content collection — one entry per gig (date, venue, location, ticket link)
  layouts/        # Shared page layout(s)
  pages/          # index.astro, about.astro, gigs.astro, gallery.astro, music.astro, contact.astro
public/
  images/         # Logo, photos (as supplied)
```

## Responsive Design Approach

- Mobile-first: base styles target small screens, with `md:`/`lg:` overrides for larger viewports
- A small number of reusable layout components (header/nav, footer, section wrapper, card components) so responsive behavior is handled once in the component, not repeated per page
- Nav collapses to a mobile menu below the `md` breakpoint

## Content Management

No CMS or backend database. Content lives in the repo as structured data:

- **Gigs**: an Astro content collection (e.g. `src/content/gigs/*.md` or a single `gigs.json`) with fields for date, venue, location, and optional ticket URL. Adding a gig means adding one entry.
- **Gallery/photos**: static files in `public/images/`, referenced from the gallery page.
- **Bio/copy**: plain text/markdown in the relevant `.astro` page or a content collection entry.

This keeps updates to a `git commit` + redeploy, matching the "developer edits directly, no CMS" decision in the product spec.

## Deployment

- **Target**: Azure Static Web Apps (existing account)
- **Build output**: Astro's static build (`astro build`) produces a static `dist/` folder, which Azure SWA serves directly — no server runtime required
- **CI/CD**: Azure Static Web Apps' standard GitHub Actions integration — push to the main branch triggers a build and deploy
- **Custom domain**: to be configured in Azure SWA once a domain is chosen/available (follow-up step, not blocking initial build)

## Assets

- Logo: already available — place in `public/images/` once supplied, referenced from the header/hero
- Photos, bio copy, color scheme: not yet finalized. Build pages with clearly-marked placeholder content/comments (e.g. `<!-- TODO: replace with band photo -->`) rather than filler content that might get missed, so gaps stay visible until real content is supplied.

## Open Questions / Deferred Decisions

- Exact color scheme / visual identity beyond the existing logo — TBD before final styling pass
- Whether the booking/contact form needs a backend to send email (e.g. Azure Functions, or a third-party form service like Formspree) or whether a `mailto:` link is sufficient for launch
- Custom domain name and DNS setup
- Whether past gigs should be shown, and for how long
