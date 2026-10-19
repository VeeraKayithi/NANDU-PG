<div align="center">

<img src="public/nandu_group_of_hostels_logo.svg" alt="NANDU Group of Hostels logo" width="120" />

# NANDU Group of Hostels

**One Brand. Multiple Locations.**

A responsive public website for discovering NANDU men's and women's paying guest (PG) accommodation near Hyderabad's IT corridors.

[**Visit the website**](https://nandu-pg.nandu-pg.workers.dev/) · [**Browse the source**](https://github.com/VeeraKayithi/NANDU-PG)

</div>

## About the project

NANDU PG is a public-facing property discovery and enquiry website, built to help prospective residents:

- Explore NANDU hostel branches and choose between men's and women's PGs.
- Review branch-specific photographs, locality, amenities and published room pricing.
- See nearby places and open Google Maps for directions.
- Contact the relevant property directly by WhatsApp or phone.

This is a **marketing and enquiry website**, not the internal PG management application. It does not handle tenant accounts, bookings, online rent payments or live inventory.

## Features

- **Responsive, mobile-first interface** with compact property cards and branch detail pages.
- **Men's / women's property browsing** with a shareable `?gender=men` or `?gender=women` URL.
- **Six branch detail pages** with images, amenities, nearby places and room-price tables.
- **Fullscreen property image gallery** with swipe, keyboard controls and accessible navigation.
- **Branch-specific enquiries** using WhatsApp links, phone calls and map directions.
- **Mobile contact bar** with quick WhatsApp, Call and Directions actions.
- **Optional light/dark mode**, with the selected preference stored in the browser.
- **SEO support**, including property-specific metadata, structured data and build-time prerendering of property pages.
- **Frequently asked questions** and shared footer with social and property-navigation links.

### Current branches

| Men's PG | Women's PG |
| --- | --- |
| Ashwamedha | Sindhoor |
| Indraprastha | Skanda |
| Samaveda | |
| Himavana | |

Branch locations, contact numbers, images, published prices and nearby places are maintained in `src/data/campuses.js`. **Room prices and availability must be confirmed directly with the relevant property before making decisions.** Some published pricing is still pending final verification.

## Tech stack

| Technology | Purpose |
| --- | --- |
| React 19 | User interface |
| Vite 8 | Development server and production build |
| React Router 7 | Homepage and property detail routes |
| Tailwind CSS 4 | Responsive styling and theme-aware design |
| Framer Motion | Animations and photo-gallery transitions |
| Lucide React / React Icons | Interface and social icons |
| Oxlint | Static code checks |
| Sharp | Image optimization tooling |
| Cloudflare Workers (static assets) | Public hosting and deployment |

The public site is frontend-only: no production database or backend API is required for its current functionality.

## Getting started

### Prerequisites

- Node.js compatible with the installed Vite version (see `package.json` and Vite's current Node.js requirements).
- npm.
- Git (optional, for cloning).

### Run locally

```bash
git clone https://github.com/VeeraKayithi/NANDU-PG.git
cd NANDU-PG
npm install
npm run dev
```

Open the local address displayed by Vite (typically `http://localhost:5173`).

### Check and build

```bash
npm run lint
npm run build
npm run preview
```

`npm run build` runs `vite build` followed by `scripts/prerender-property-pages.mjs`; the deployable output is generated in `dist/`.

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run lint` | Run Oxlint |
| `npm run build` | Build the site and prerender property pages |
| `npm run preview` | Preview the production build locally |
| `npm run optimize-images` | Run the project's image optimization script |

## Project organization

```text
NANDU-PG/
├── public/                    # Logo, public assets and SEO/static files
├── scripts/                   # Build-time prerendering and image optimization
├── src/
│   ├── assets/                # Property photography and optimized assets
│   ├── components/            # Navbar, hero, property cards, FAQ, footer, etc.
│   ├── data/                  # Branch and FAQ content
│   │   ├── campuses.js
│   │   └── faqs.js
│   ├── hooks/                 # Theme preference logic
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── PropertyDetails.jsx
│   ├── App.jsx                # Routing
│   └── main.jsx               # App entry point
├── wrangler.jsonc             # Cloudflare Workers static-asset configuration
└── package.json
```

## Editing property content

The public website is driven by data defined in `src/data/campuses.js`.

When editing or adding a branch, verify the following before publishing:

1. **Name and location:** Use the correct branch name, locality and map link.
2. **Contact details:** Keep the phone and WhatsApp number specific to that branch.
3. **Photos:** Use genuine, authorized photographs of the corresponding property; do not present stock photos as real rooms.
4. **Pricing:** Confirm rent for each room type and AC/Non-AC option before publishing.
5. **Amenities and landmarks:** Include only facilities and nearby places that have been checked.

Room availability is **not live**. WhatsApp and phone actions are enquiry channels, not confirmed reservations.

## Deployment

The project is configured for Cloudflare Workers static assets in `wrangler.jsonc`:

- Worker name: `nandu-pg`
- Static asset directory: `./dist`
- SPA fallback: `single-page-application`

**Live site:** https://nandu-pg.nandu-pg.workers.dev/

Build before deploying:

```bash
npm run build
```

If deploying through the Cloudflare dashboard's connected Git repository, confirm the project's build command, output directory and deployment status in Cloudflare. A Git push alone does not guarantee a successful deployment.

If deploying manually with an appropriately configured Cloudflare account, use Wrangler according to the Cloudflare project's deployment settings.

## Roadmap

The following ideas are **planned or under consideration**, not features claimed to be live:

- [ ] Room-type-specific WhatsApp enquiries (for example, “Two Sharing AC at Samaveda”).
- [ ] Verified room-specific descriptions and genuine room-type photographs when available.
- [ ] Clearer explanations of rent inclusions and property policies after confirmation.
- [ ] Additional branch information and photo updates as supplied.

A public vacancy counter or reservation system should only be introduced if the underlying availability data can be kept accurate.

## Important notes

- This repository is for the **public NANDU PG website**, separate from any Java/Spring Boot + PostgreSQL admin or tenant-management system.
- Property photographs, branding and content belong to their respective owners; repository visibility does not grant permission to reuse them commercially.
- Prices, facilities and contact details may change. Verify operational information before publishing updates.

---

<div align="center">

**NANDU Group of Hostels — Hyderabad, Telangana**

[Website](https://nandu-pg.nandu-pg.workers.dev/) · [Instagram](https://www.instagram.com/nandumenspg/)

</div>
