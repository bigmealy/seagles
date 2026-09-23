# Seagles Website — Product Spec

## Overview

Seagles is an Eagles tribute band based in North-East Scotland. The website is a public-facing site for two audiences: fans who want to find out about the band and see upcoming shows, and venues/promoters who want to book the band. It should present the band professionally and make it easy to find gigs, hear/see the band, and get in touch.

## Goals

- Venues and promoters can quickly find booking/contact information
- Fans can easily find upcoming gig dates and locations
- Visitors get a sense of the band through photos, video, and music before deciding to attend a show or make contact
- The site reads as professional and polished — reflecting a serious touring act, not a hobby page

## Pages / Sections

### Home
Hero section (band name, logo, tagline), brief intro, and a teaser for the next upcoming gig. Acts as the entry point that funnels visitors to Gigs, Gallery, or Booking.

### About / Bio
The band's story — how it formed, what it plays, member info if the band wants to include it. Establishes credibility and personality.

### Gigs / Tour Dates
List of upcoming shows: date, venue, location, and ticket link where available. Past gigs may be shown further down the page or omitted — optional, not required for launch.

### Gallery
Photos and/or embedded video from performances and promo shoots. Gives visitors a feel for the live show.

### Music
Embedded audio player or links out to existing platforms (e.g. Spotify, YouTube, SoundCloud) so visitors can hear the band before committing to a booking or a ticket.

### Booking / Contact
A form or clear contact method (email/phone) aimed primarily at venues and promoters, with fan enquiries as a secondary use case.

## Non-Functional Requirements

- **Responsive**: must look and work well on mobile, tablet, and desktop — this is a priority, not an afterthought
- **Fast**: quick load times, especially on mobile networks
- **Accessible**: basic accessibility (readable contrast, alt text on images, keyboard-navigable nav)
- **Professional visual polish**: consistent branding, no default/unstyled-looking elements
- **Legal**: the site must carry a persistent, clearly visible statement that Seagles is an independent tribute act and is not affiliated with, endorsed by, or connected to the Eagles, their members, or their estate (footer, site-wide). When the About/Bio copy below is written, it should also include an explicit non-affiliation sentence near the top, not rely on the footer alone.

## Content Readiness

| Asset | Status |
|---|---|
| Logo | Ready |
| Band photos | TBD — need to be supplied |
| Bio copy | TBD — needs to be written; must include an explicit non-affiliation sentence near the top (see Non-Functional Requirements → Legal) |
| Color scheme / visual branding | TBD — not yet decided |
| Gig date data | TBD — ongoing, updated as shows are booked |

These gaps are known and acceptable for now — the technical build should use clearly-marked placeholders wherever this content is still missing, rather than inventing content.

## Out of Scope (for now)

- CMS/admin panel — content is static and edited directly by the developer
- E-commerce / merchandise sales
- User accounts / logins
- Blog / news section

These may be revisited later, but are explicitly excluded from the current spec so scope doesn't creep during the initial build.
