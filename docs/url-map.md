# URL map: first 50 pages

Source of content: `../pro3d-OG` (original site, 254 HTML files).
Source of design: `_design-reference/` (6 redesigned pages).
Rule: **every URL stays exactly as on the live site.** The CMS stores the path without `.html`; the site serves it with `.html`.

## Phase 1: the first 50 pages

| # | URL | Template | Content source | Notes |
| --- | --- | --- | --- | --- |
| 1 | `/` | home | design `index.html` | designed |
| 2 | `/about.html` | about | design `about.html` | designed |
| 3 | `/solutions.html` | solutions | design `solutions.html` | designed |
| 4 | `/3d-modeling.html` | service | design `3d-modeling.html` | designed |
| 5 | `/3d-modeling/product.html` | sub-service | design `3d-modeling/product.html` | designed |
| 6 | `/industries/fashion-industry.html` | industry | design `industries/fashion-industry.html` | designed, new URL |
| 7 | `/contact.html` | contact | OG | needs layout from design system |
| 8 | `/careers.html` | generic | OG | |
| 9 | `/faqs.html` | generic | OG | FAQ block + FAQ schema |
| 10 | `/our-clients.html` | generic | OG | new menu calls it "Customers" |
| 11 | `/testimonials.html` | generic | OG | uses Testimonials collection |
| 12 | `/portfolio.html` | portfolio | OG | menu anchors `#architecture`, `#fashion`, ... |
| 13 | `/privacy-policy.html` | generic | OG | rich text |
| 14 | `/terms-of-use.html` | generic | OG | rich text |
| 15 | `/404.html` | generic | OG | Next.js `not-found.tsx` |
| 16 | `/3d-rendering.html` | service | OG | |
| 17 | `/3d-print-designs.html` | service | OG | |
| 18 | `/3d-modeling-for-ar.html` | service | OG | |
| 19 | `/floor-plan-design.html` | service | OG | |
| 20 | `/3d-texturing-services.html` | service | OG | new menu links `3d-texturing.html`, fix menu |
| 21 | `/interactive-product-360-view.html` | service | OG | new menu links `360-degree-viewer.html`, fix menu |
| 22 | `/3d-modeling/architectural.html` | sub-service | OG | |
| 23 | `/3d-modeling/furniture.html` | sub-service | OG | |
| 24 | `/3d-modeling/digital-sculpting.html` | sub-service | OG | |
| 25 | `/3d-modeling/game-props-design.html` | sub-service | OG | new menu links `game-prop-design.html`, fix menu |
| 26 | `/3d-modeling/exhibition-stall-design.html` | sub-service | OG | new menu links `stall-design.html`, fix menu |
| 27 | `/3d-modeling/3d-product-package-design.html` | sub-service | OG | new menu links `packaging-design.html`, fix menu |
| 28 | `/3d-rendering/product.html` | sub-service | OG | |
| 29 | `/3d-rendering/architectural.html` | sub-service | OG | |
| 30 | `/3d-rendering/furniture.html` | sub-service | OG | |
| 31 | `/3d-rendering/architectural/walkthrough.html` | sub-service | OG | |
| 32 | `/3d-rendering/architectural/interior.html` | sub-service | OG | new menu links `3d-rendering/interior.html`, fix menu |
| 33 | `/3d-rendering/architectural/exterior.html` | sub-service | OG | new menu links `3d-rendering/exterior.html`, fix menu |
| 34 | `/blog.html` | blog-list | generated | replaces `blog-page-1..9.html` (301 to `/blog.html?page=N` or keep paged URLs) |
| 35 | `/case-studies.html` | case-study-list | generated | |
| 36 | `/case-studies/3d-furniture-design.html` | case-study | OG | |
| 37 | `/case-studies/architectural-3d-rendering.html` | case-study | OG | |
| 38 | `/case-studies/product-3d-designing-support.html` | case-study | OG | |
| 39 | `/case-studies/3d-modeling-for-amazon-product-listings.html` | case-study | OG | |
| 40 | `/case-studies/apparel-3d-design.html` | case-study | OG | supports the fashion industry page |
| 41 | `/blog/what-is-3d-modeling.html` | blog-post | OG | |
| 42 | `/blog/what-is-3d-rendering.html` | blog-post | OG | |
| 43 | `/blog/3D-file-formats.html` | blog-post | OG | |
| 44 | `/blog/list-of-best-3d-modeling-software.html` | blog-post | OG | |
| 45 | `/blog/free-cad-software.html` | blog-post | OG | |
| 46 | `/blog/3d-rendering-cost.html` | blog-post | OG | |
| 47 | `/blog/3d-furniture-modeling-costs.html` | blog-post | OG | |
| 48 | `/blog/what-is-a-3d-configurator.html` | blog-post | OG | |
| 49 | `/blog/floor-plans.html` | blog-post | OG | |
| 50 | `/blog/product-rendering-vs-traditional-photography.html` | blog-post | OG | |

**Before Step 6, confirm against Search Console:** the 10 blog posts and 5 case studies above are chosen by topic fit with the main services. Swap in the top pages by clicks.

## Templates needed

| Template | Design status | Used by |
| --- | --- | --- |
| home, about, solutions, service, sub-service, industry | designed | 1–6, 16–33 |
| generic (rich text + optional blocks) | derive from design system | 8–15 |
| contact | derive from design system (reuse `services-contact-section`) | 7 |
| portfolio | derive from design system (reuse portfolio carousel) | 12 |
| blog-list, blog-post | **new design needed** | 34, 41–50 |
| case-study-list, case-study | **new design needed** | 35–40 |

## New menu links: renames back to the live URLs

The new mega menu (in `_design-reference/index.html`) links to new filenames for pages that already exist. The menu in the CMS will use the live URLs:

| Live URL (keep) | New menu link (change) |
| --- | --- |
| `/3d-texturing-services.html` | `/3d-texturing.html` |
| `/interactive-product-360-view.html` | `/360-degree-viewer.html` |
| `/3d-modeling/game-props-design.html` | `/3d-modeling/game-prop-design.html` |
| `/3d-modeling/exhibition-stall-design.html` | `/3d-modeling/stall-design.html` |
| `/3d-modeling/3d-product-package-design.html` | `/3d-modeling/packaging-design.html` |
| `/3d-rendering/architectural/interior.html` | `/3d-rendering/interior.html` |
| `/3d-rendering/architectural/exterior.html` | `/3d-rendering/exterior.html` |
| `/our-clients.html` | `/customers.html` |

## Phase 2: new pages from the new menu (content to be written)

These links in the new menu have no page on the live site. Until each one is written, it is hidden from the menu.

- `3d-animation/`: logo, simulation, product, character, motion-graphics, industrial, medical, vfx, game, architectural (10)
- `3d-modeling/`: automotive, environment, fashion, industrial, game-assets, 360-product-views, print-ready (7)
- `3d-rendering/`: automotive, lifestyle, fashion (3)
- Solutions: `cms.html`, `web-enabled-ar.html`, `3d-product-configurator.html`, `product-analytics.html` (4)
- Other: `industries.html`, `news-events.html`, more industry pages (architecture, automotive, furniture, ...)

## The other ~200 live URLs (never 404)

| Group | Count | Plan |
| --- | --- | --- |
| Remaining blog posts | 145 | **Auto-import by script** in Step 6 (same script as the 10 above) |
| Remaining case studies | 18 | **Auto-import by script** |
| `blog-page-1..9.html` | 9 | Replaced by paginated blog list; 301 or keep paged URLs |
| Remaining 3d-modeling sub-pages (apparel, beauty-products, bed-room-furniture-designs, commercial-furniture-design, electronic-devices-3d-design, fashion-accessories, home-furniture, home-products, kitchen-furniture-design, living-room-furniture-designs, office-furniture-designs, 360-degree-furniture-view-design) | 12 | Draft by script; finish in Phase 2. Meanwhile serve old HTML from `public/` |
| `3d-rendering/aerial-view-rendering-services.html`, `architectural/commercial-buildings.html`, `architectural/residential-buildings.html` | 3 | Same as above |
| Landing pages (`3d-architecture-design-services`, `3d-furniture-design-services`, `3d-product-design-services`, `3d-visualization-services`, `3d-scan-cleanup`) | 5 | Phase 2 (check if used by ads first) |
| `pricing`, `turnaround-time`, `data-security`, `quality-assurance`, `academic-scholarship`, `sitemap`, `careers/3D-modeling-artist` | 7 | Generic template, Phase 2 |
| `portfolio/architectural-design-samples`, `portfolio/product-design-samples` | 2 | Portfolio template, Phase 2 |
| `index1.html` | 1 | 301 to `/` |
| Verification files (`google*.html`, `pinterest-*.html`, `BingSiteAuth.xml`, `ahrefs_*`) | 6 | Copy as-is to `public/` |
