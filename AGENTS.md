# Zella Studios website: brief for the coding agent

Read this before changing anything. It holds the positioning, brand rules and outstanding work for the site.

## What this is
A conversion-focused homepage for **Zella Studios**. Plain HTML, CSS and JS with no build step: `index.html`, `styles.css`, `main.js`, `assets/`.

## Positioning (keep this intact)
- **Promise:** "More clients. More capacity. No extra headcount."
- **Three outcomes** structure the whole site:
  1. **Get more leads:** reactivate the existing database (past enquiries, lapsed clients, upcoming remortgages and renewals), Google reviews, websites that convert, Google and Meta ads, AI outreach.
  2. **Win more of them:** every enquiry answered within a minute, day or night; proposals and quotes followed up automatically.
  3. **Take on more without hiring:** document chasing, reports and letters drafted automatically with human sign-off, automatic client updates.
- **Audience:** the hero is deliberately open ("For business owners who want to grow without hiring"). Further down, the page names the core niche: owner-led professional services firms, i.e. mortgage brokers, financial planners, accountants, conveyancers, estate agents and recruiters. Keep that split. Don't narrow the hero, and don't strip the sector detail lower down.
- **Not a marketing agency.** Marketing is one part of the offer, never the headline. Never say or imply the business is new.
- **Lead with outcomes, not tools.** Every feature must say what it means for the business: more clients, faster replies than competitors, more capacity per person. "AI and automation" is the how, not the headline.
- **Primary CTA everywhere: "Book a free discovery call"** (anchor `#audit`). Secondary offer: free website rebuild.
- **Trust:** Jen, the founder, has 15 years in marketing, agency side and in-house. Your team stays in control: anything client-facing is checked and signed off by a person.
- **Stats used:**
  - 391% more conversions when replying within 1 minute. Source: Velocify research. Do not attribute it to MIT.
  - 100× more likely to make contact within 5 minutes than 30. Source: the MIT / InsideSales Lead Response Management study.
  - Don't invent other statistics. The numbers in the hero cards and the simulator are illustrative UI examples.
- **Tone:** professional, warm and plain English; confident, not hypey. UK spelling and £.

## Brand
- **Logo:** `assets/zella-logo.png` for light backgrounds, `assets/zella-logo-white.png` for dark. Don't redraw or recolour it.
- **Palette: Midnight Premium (final).** Defined as CSS variables in `:root` in `styles.css`:
  - Logo violet `#6E01FC`: buttons, key numbers, selected states.
  - Background `#F4F4F7`; white cards; ink `#0D0B1E`.
  - Lavender `#DCD3FF` for highlights; soft section tint `#E7DCF8`.
  - Midnight panels and footer `#1C1838`.
- **Do not introduce other accent colours** (no yellow, lime, green, red and so on). Text on lavender is ink; text on violet or midnight is white.
- **Fonts:** Outfit for display, Instrument Sans for body, Geist Mono for labels. All load from Google Fonts.

## Page sections (in order)
Nav → Hero (headline, two CTAs, and a visual of three equal-size example cards arranged around a circle with the animated Zella mark in the centre: "Replied in 8 seconds", "Drafted in 4 minutes", "3 meetings booked" via old lead reactivation) → Lavender reassurance banner (No obligation · No tech knowledge needed · Your team stays in control, aligned to the 3-column grid below) → Midnight stat cards with count-up numbers → Hats picker (01) → "What we do" tabs grouped by the three outcomes (02) → Speed-to-lead simulator (03) → Back-office paperwork (04) → "Cost of standing still" calculator (05: lost clients + admin cost, and what winning back half is worth) → Agency comparison (06) → How it works (07) → Free rebuild offer → Founder (08) → FAQ (09) → Discovery call form → Footer.

Design decisions already made with the client: no scrolling marquee, no full-width dark bands, hero cards kept short (label, one-line headline, one short line), and "More clients. More capacity." stays on one line on desktop.

Most dynamic content (hats, tabs, simulator steps, comparison rows, FAQ) lives as data arrays in `main.js`.

## Outstanding work (TODO)
1. **Discovery call form** now submits to Web3Forms (web3forms.com) with a live access key and a honeypot field in place. Still no instant SMS/email auto-reply to the enquirer, only the notification email to Zella — add that if true speed-to-lead matters here. Test a real submission before launch to confirm the key is correct and the email actually arrives.
2. **Direct calendar booking**: the audit section has a tab switcher ("Send an enquiry" / "Book a time directly") and the calendar tab embeds Jen's live Google Calendar appointment schedule. If that schedule is ever recreated (not just edited), its URL changes — update the `iframe`'s `data-src` in `index.html`'s `#calendarPane`.
3. **Fill in the remaining placeholders** in square brackets: offer terms, company number/address and retention periods in `privacy.html`, and the terms page (not yet written). A cookie-consent banner and `privacy.html` now exist; the discovery-call form has a required consent checkbox and submits via Web3Forms.
4. **Add analytics and conversion tracking** (GA4 / Meta pixel) on CTA clicks and form submits. Only load it after the cookie banner's "Accept all" (check `localStorage.getItem('zella-cookie-consent') === 'all'`, see the TODO in `main.js`), and list the actual tool(s) used in `privacy.html`'s Cookies section.
5. **SEO:** add a favicon set, an OG image, `Organization` / `LocalBusiness` JSON-LD (Liverpool, UK), `sitemap.xml` and `robots.txt`.
6. **Optimise images:** convert `jen.jpg` to WebP/AVIF and add `srcset`.
7. **Later pages** (optional): sector pages (e.g. mortgage brokers, accountants), case studies, and a free website rebuild landing page. Reuse the same tokens and components.

## Rules
- Keep it accessible: real buttons and links, labelled inputs, focus states, `prefers-reduced-motion` respected, and 4.5:1 text contrast.
- Keep it fast: no heavy frameworks unless asked. If migrating to a framework (e.g. Next.js or Astro), preserve the copy, markup structure and tokens exactly.
- The page must work at phone width with no horizontal scroll.
