# Rebuilding the 200-Page Website as a Next.js + MongoDB CMS

Oct 8, 2026

The plan in one line: build the new site with **Next.js + Payload CMS + MongoDB**, turn the 6 redesigned pages into about 18 reusable content blocks, import the 236 live URLs into the database, keep every old URL working, and host on a Node server (or Vercel) with MongoDB Atlas.

## 1. What the current project contains

The folder `D:\SUSHMITHA\PROD-3D\cms` is a plain HTML/CSS/jQuery site with 6 redesigned pages. Those 6 pages are the design system for the whole new site.

| Item | What is there | What it means for the rebuild |
| --- | --- | --- |
| Redesigned pages | `index.html`, `3d-modeling.html`, `3d-modeling/product.html`, `industries/fashion-industry.html`, `solutions.html`, `about.html` (1,270–1,840 lines each) | These become 5 page **templates**: Home, Service (parent), Sub-service, Industry, Generic/About |
| Header | One mega menu with 5 items: 3D Visualization (3 columns, ~30 links), 3D Solutions, Working Verticals, Customers, Resources; each panel has a CTA card | Header is copy-pasted in every page today. It becomes one **Header global** edited once in the admin |
| Page sections | Hero, Services intro, What we do, Why choose, Success stories, Portfolio carousel, Testimonials, FAQ, Contact form, CTA, Latest blogs, Verticals, Our approach, Highlights, Tech stack | These become **blocks** the editor stacks to build any page |
| CSS / JS | `style.css` (8,016 lines), jQuery, Slick, GSAP + ScrollTrigger, 6 page scripts | Port CSS into the Next.js app; replace jQuery/Slick with small React components; load GSAP only on pages that animate |
| Assets | 83 PNG, 31 WebP, 3 MP4, 2 PDF, fonts | Upload to the CMS Media library; serve as WebP/AVIF through `next/image` |
| SEO files | `sitemap_new.xml` (236 URLs), `images_sitemap.xml` (234), `video-sitemap.xml` (5), `feed.xml`, `robots.txt`, `.htaccess` with ~25 301 redirects, Bing/Ahrefs verification files | All of these must be **generated** by the new site, and the redirects moved into the CMS |
| Forms | `contact.php` (PHP mail handler) | Replaced by a Next.js form that saves to MongoDB and emails the team |

The live site's 236 URLs break down like this:

| URL group | Pages | Becomes |
| --- | --- | --- |
| `/blog/...` | 152 | **Posts** collection, one blog template |
| Root pages (`/about.html`, `/pricing.html`, ...) | 31 | **Pages** collection, built from blocks |
| `/case-studies/...` | 20 | **Case studies** collection, one template |
| `/3d-modeling/...` | 19 | **Pages** (Sub-service template) |
| `/3d-rendering/...` | 9 | **Pages** (Sub-service template) |
| `/portfolio/...`, `/careers`, others | 5 | **Pages** |

So "200 pages" is really **3 content types and about 5 layouts**. Nobody designs 200 pages; editors fill 200 records.

## 2. Target architecture

One Next.js application contains both the public website and the admin portal. MongoDB Atlas holds all content; images and videos live in S3-compatible storage.

```mermaid
flowchart LR
  V[Visitors<br/>browsers, Google] --> CDN[CDN cache<br/>Vercel / Cloudflare]
  CDN --> W
  E[Editors<br/>your content team] -- log in, edit, publish --> A
  subgraph APP[Next.js + Payload app]
    W[Website<br/>static pages + ISR] -- reads at build --> API[Payload Local API]
    A[Admin portal<br/>/admin, Payload CMS] -- saves content --> API
  end
  API <--> DB[(MongoDB Atlas<br/>content + users)]
  API --> S3[S3 / R2 storage<br/>images, video, PDF]
```

When an editor publishes, the admin saves to MongoDB and tells the website to rebuild just that page; visitors keep getting cached static HTML.

## 3. Tech stack and why

Use **Payload CMS 3** as the admin portal. It installs *inside* the Next.js app, stores everything in MongoDB, and gives you login, roles, a page builder, media library, drafts and live preview for free. Building a custom admin from scratch would take 2–3 months of extra work for less.

| Layer | Choice | Why |
| --- | --- | --- |
| Website framework | Next.js (App Router, TypeScript) | Pre-renders pages to static HTML, so 236 pages load as fast as today's static files |
| Admin portal / CMS | Payload CMS 3 (open source, MIT) | Runs at `/admin` in the same Next.js app; one codebase, one deploy |
| Database | MongoDB Atlas (`@payloadcms/db-mongodb`) | Managed, automatic backups, free tier for development |
| Rich text | Payload Lexical editor | Blog posts and long copy; can import old HTML |
| Media storage | Amazon S3 or Cloudflare R2 (`@payloadcms/storage-s3`) | Images and videos outside the server; required if you host on Vercel |
| Images | `next/image` + Payload image sizes | Auto WebP/AVIF, responsive sizes, lazy loading |
| Styling | Port existing `style.css` into CSS Modules or keep as a global file | Keeps the new design exactly as built |
| Animations | GSAP + ScrollTrigger as client components; Embla or Swiper instead of Slick | Drops jQuery (about 90 KB) |
| SEO | `@payloadcms/plugin-seo`, `@payloadcms/plugin-redirects`, Next.js `sitemap.ts` / `robots.ts` | Meta per page, admin-managed 301s, auto sitemaps |
| Forms | `@payloadcms/plugin-form-builder` + email (Resend, SendGrid or SMTP) | Replaces `contact.php`; submissions saved in MongoDB |
| Hosting | Option A: Vercel + Atlas + S3/R2. Option B: VPS (Ubuntu, Node, PM2, Nginx) + Atlas | See section 10 |

**Alternative if you want to build the admin yourself:** Next.js + Mongoose + NextAuth + a hand-made dashboard. Only pick this if you need a very custom workflow; you will rebuild what Payload already has (auth, uploads, versions, access control).

**Starting point:** Payload's official *website* template already has Pages, Posts, a block-based layout field, SEO, redirects, form builder, drafts and live preview wired up. Start from it and replace its blocks and styles with yours.

## 4. The core idea: blocks, not pages

Every `<section>` in your 6 HTML files becomes one **block**: a React component plus a matching field schema in the CMS. A page is just an ordered list of blocks stored in MongoDB. The editor picks blocks, fills the fields, and publishes.

| Block | Found in | Editable fields |
| --- | --- | --- |
| Hero | all pages | heading, sub-heading, background image or video, buttons |
| ServicesIntro | services, industry, about | title, rich text, image |
| WhatWeDo / SubserviceList | `3d-modeling`, `product` | items (icon, title, text, link) |
| WhyChoose | services, industry | items (icon, title, text) |
| SuccessStories | services | pick case studies (relationship) |
| PortfolioCarousel | most pages | images, light/dark variant |
| Testimonials | all pages | pick from Testimonials collection |
| FAQ | services, industry | question/answer pairs (also outputs FAQ schema) |
| ContactSection | services, industry | heading, form (from form builder) |
| CTA | home, solutions, about | heading, text, button |
| LatestBlogs | home, industry | number of posts, category (auto-filled) |
| Verticals | home, industry, solutions, about | items, light/dark variant |
| OurApproach | industry, about | steps |
| Highlights / SolutionsHighlights | about, solutions | stat or feature items |
| TechStack | solutions | logos |
| About / MapSystemsIntro | home, about | text, image |
| RichText | generic pages | free text (privacy, terms, careers) |
| ServicesGrid | home | service cards |

Shared content like testimonials, case studies and FAQs lives in its own collection and is *referenced* by blocks. Change a testimonial once and every page that shows it updates.

How it fits together in code:

```ts
// src/blocks/Hero/config.ts  (what the admin shows)
export const Hero: Block = {
  slug: 'hero',
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'textarea' },
    { name: 'media', type: 'upload', relationTo: 'media' },
    { name: 'buttons', type: 'array', fields: [
      { name: 'label', type: 'text' }, { name: 'url', type: 'text' } ] },
  ],
}

// src/blocks/RenderBlocks.tsx  (what the website shows)
const components = { hero: HeroBlock, faq: FAQBlock, cta: CTABlock /* ... */ }
export function RenderBlocks({ blocks }) {
  return blocks.map((b, i) => {
    const C = components[b.blockType]
    return C ? <C key={i} {...b} /> : null
  })
}
```

## 5. MongoDB data model

You define collections in Payload config files; Payload creates and indexes the MongoDB collections for you. You never write schemas twice.

| Collection / Global | Holds | Key fields |
| --- | --- | --- |
| `pages` | Home, services, sub-services, industries, about, legal (~84) | `title`, `path` (unique), `template`, `layout` (blocks), `meta` (SEO), `_status` (draft/published) |
| `posts` | Blog articles (152) | `title`, `slug`, `excerpt`, `content` (rich text), `heroImage`, `categories`, `author`, `publishedAt`, `meta` |
| `case-studies` | Case studies (20) | `title`, `slug`, `client`, `industry`, `challenge`, `solution`, `results`, `gallery`, `meta` |
| `testimonials` | Client quotes | `name`, `company`, `quote`, `photo`, `rating` |
| `categories` | Blog and portfolio categories | `title`, `slug` |
| `media` | All images, videos, PDFs | `alt` (required), `caption`, sizes (thumb, card, hero) |
| `redirects` | Old URL → new URL (from `.htaccess`) | `from`, `to`, `type` (301/302) |
| `form-submissions` | Contact form entries | `form`, `data`, `createdAt` |
| `users` | Admin users | `email`, `password` (hashed), `role` (admin / editor / author) |
| Global `header` | Mega menu | `navItems[]` → `columns[]` → `links[]`, `ctaCard` |
| Global `footer` | Footer links, social, address | arrays of links |
| Global `site-settings` | Logo, contact details, default SEO, analytics IDs | single document |

Example of one page as it sits in MongoDB:

```json
{
  "_id": "6703f1...",
  "title": "3D Product Modeling Services",
  "path": "3d-modeling/product.html",
  "template": "sub-service",
  "layout": [
    { "blockType": "hero", "heading": "3D Product Modeling", "media": "6703aa..." },
    { "blockType": "servicesIntro", "title": "...", "body": { "root": {} } },
    { "blockType": "whyChoose", "items": [ { "title": "...", "text": "..." } ] },
    { "blockType": "testimonials", "items": ["6702bb...", "6702bc..."] },
    { "blockType": "faq", "items": [ { "q": "...", "a": "..." } ] }
  ],
  "meta": { "title": "...", "description": "...", "image": "6703aa..." },
  "_status": "published",
  "updatedAt": "2026-10-08T10:00:00Z"
}
```

**Why `path` and not `slug` for pages:** your URLs are nested and end in `.html` (`3d-modeling/product.html`). Storing the full path lets one catch-all route serve any page and keeps every old URL exactly as Google knows it.

## 6. Admin portal

The admin lives at `https://yourdomain.com/admin` and is generated from the collection configs above. What editors get:

- **Page builder:** add, reorder and remove blocks with drag and drop; each block shows only its own fields.
- **Drafts and versions:** save drafts, schedule publishing, compare and restore older versions.
- **Live preview:** see the page in the real website design while typing.
- **Media library:** upload images once, set alt text, reuse anywhere; image sizes are generated automatically.
- **Menu editor:** change the mega menu (Header global) without a developer.
- **SEO panel per page:** meta title, description, OG image, with a Google-style preview.
- **Redirects manager:** add a 301 when a URL changes.
- **Form submissions:** read and export contact form entries.

Roles (set with Payload access control):

| Role | Can do |
| --- | --- |
| Admin | Everything, including users, header/footer, redirects, settings |
| Editor | Create, edit and publish pages, posts, case studies, media |
| Author | Write and edit own blog posts as drafts; cannot publish |

Publish workflow:

1. Author writes a post and saves it as a draft.
2. Editor reviews it in live preview and clicks Publish.
3. A Payload `afterChange` hook calls `revalidatePath()` for that URL (and the blog list and sitemap).
4. The next visitor gets the new static page within seconds; no rebuild or redeploy needed.

## 7. Website rendering and performance

Visitors never wait for MongoDB. Every page is rendered to static HTML at build time and refreshed only when an editor publishes, so the site stays as fast as your current static files.

**How pages are served**

1. `generateStaticParams()` reads all published `path` values from MongoDB and pre-builds all 236 pages during `next build`.
2. Each page is cached as static HTML (and on a CDN when on Vercel or behind Cloudflare).
3. On publish, the `afterChange` hook calls `revalidatePath('/3d-modeling/product.html')`. Only that page is rebuilt.
4. A page created after the build is rendered on its first visit, then cached (`dynamicParams = true`).

One catch-all route serves pages, and the template decides the layout:

```tsx
// src/app/(frontend)/[[...path]]/page.tsx
export async function generateStaticParams() {
  const pages = await payload.find({ collection: 'pages', limit: 1000, select: { path: true } })
  return pages.docs.map(p => ({ path: p.path.split('/') }))
}

export default async function Page({ params }) {
  const { path = [] } = await params
  const page = await getPageByPath(path.join('/') || 'home')
  if (!page) return notFound()
  return <RenderBlocks blocks={page.layout} />
}
```

**Performance checklist**

- Server Components by default; only sliders, menus, accordions and GSAP animations are `'use client'`.
- Remove jQuery and Slick; use Embla/Swiper or CSS scroll-snap for carousels.
- Load GSAP with `next/dynamic` only in blocks that animate.
- `next/image` for every image with `sizes`, and `priority` only on the hero image.
- `next/font` to self-host fonts (no layout shift); drop unused Font Awesome icons or switch to inline SVG icons.
- Videos: `preload="none"`, a poster image, and lazy-load below the fold.
- Split `style.css` (8,016 lines) per block with CSS Modules so each page ships only the CSS it uses.
- Use `select` / `depth` in Payload queries so pages fetch only the fields they render.
- Put Cloudflare (free plan) in front for CDN caching if you self-host.
- Targets: Lighthouse 90+ on mobile; LCP under 2.5 s, CLS under 0.1, INP under 200 ms.

## 8. Migrating the 200+ old pages

Script the bulk, hand-finish the important pages. Blog posts and case studies (172 of 236 URLs) can be imported automatically; the ~64 service and company pages need an editor to place content into the new block layout.

**Step 1. Inventory.** Download the full old site (FTP, or `wget --mirror`). Build a spreadsheet from `sitemap_new.xml`: old URL, type (blog / case study / service / other), template, owner, status. Add Search Console data (clicks, top pages) so you know which pages matter most.

**Step 2. URLs stay the same.** Decided: **keep every URL exactly as it is** (including `.html`). Your rankings, backlinks and the image/video sitemaps all point at these URLs. Only the layout changes: every old URL is rebuilt with the new design and served from the CMS at the same address. Each record's `path` field holds the exact old URL (for example `3d-modeling/product.html` or `blog/3d-printing.html`), and the import scripts copy it from the old file path. The existing 301s from `.htaccess` move unchanged into the `redirects` collection.

**Step 3. Import script.** A Node script using Payload's Local API and `cheerio`:

```ts
// scripts/import-blog.ts   (run: npx tsx scripts/import-blog.ts)
for (const file of blogFiles) {
  const $ = cheerio.load(fs.readFileSync(file, 'utf8'))
  const imageIds = await uploadImages($('article img'))   // -> media collection
  await payload.create({
    collection: 'posts',
    data: {
      title: $('h1').first().text().trim(),
      slug: path.basename(file),                         // keeps "xyz.html"
      content: convertHTMLToLexical({ html: $('article').html(), editorConfig }),
      meta: { title: $('title').text(), description: $('meta[name=description]').attr('content') },
      publishedAt: parseDate($),
      _status: 'published',
    },
  })
}
```

Run the same pattern for case studies. For service pages, the script creates a **draft** with the hero, intro text, FAQs and meta pre-filled; an editor then arranges the blocks.

**Step 4. Redirects.** Copy the ~25 `Redirect 301` lines from `.htaccess` into the `redirects` collection (script it). Add a redirect for every old URL you retire.

**Step 5. Verify.** Crawl old vs new with Screaming Frog: every old URL must return 200 or a single 301, with the same title, meta description, H1 and canonical. Fix anything missing before launch.

**Step 6. Generated SEO files.** Replace the static XML files with routes that read MongoDB:

- `app/sitemap.ts` → `/sitemap.xml` (pages, posts, case studies with `lastModified`)
- image and video sitemaps and `feed.xml` as route handlers
- `app/robots.ts` → `/robots.txt`
- keep `BingSiteAuth.xml` and the Ahrefs verification files in `/public`
- JSON-LD (Organization, BreadcrumbList, FAQPage, Article) rendered per template

## 9. Step-by-step build from scratch

**Prerequisites:** Node.js 20 LTS or newer, Git, VS Code, a free MongoDB Atlas account, a GitHub repository.

**Step 1. Create the database.** In MongoDB Atlas create a project, a free M0 cluster, a database user, and allow your IP. Copy the connection string (`mongodb+srv://...`).

**Step 2. Create the app.**

```bash
npx create-payload-app@latest pro3d-site -t website
# choose: MongoDB, paste the Atlas connection string
cd pro3d-site
npm run dev            # site: http://localhost:3000   admin: /admin
```

**Step 3. Environment file** (`.env`, never committed):

```bash
DATABASE_URI=mongodb+srv://user:pass@cluster.mongodb.net/pro3d
PAYLOAD_SECRET=<long random string>
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
S3_BUCKET=...  S3_ACCESS_KEY_ID=...  S3_SECRET_ACCESS_KEY=...  S3_REGION=...
RESEND_API_KEY=...     # or SMTP settings for the contact form
```

**Step 4. Folder structure.**

```text
src/
  app/
    (frontend)/
      layout.tsx              # <Header/>, <Footer/>, fonts, global CSS
      [[...path]]/page.tsx    # all CMS pages (catch-all)
      blog/[slug]/page.tsx    # blog post template
      blog.html/page.tsx      # blog listing (or a page with a LatestBlogs block)
      case-studies/[slug]/page.tsx
      sitemap.ts  robots.ts
    (payload)/admin/...       # admin portal (generated)
  collections/  Pages.ts Posts.ts CaseStudies.ts Testimonials.ts Media.ts Users.ts Categories.ts
  globals/      Header.ts Footer.ts SiteSettings.ts
  blocks/       Hero/ (config.ts + Component.tsx)  FAQ/  CTA/  WhyChoose/ ...
  components/   Header/MegaMenu.tsx  Footer/  Slider/  VideoModal/
  hooks/        revalidatePage.ts
  styles/       (ported from css/style.css)
  payload.config.ts
scripts/        import-blog.ts  import-case-studies.ts  import-redirects.ts
public/         fonts, favicon, verification files
```

**Step 5. Port the design.** Copy `style.css` and fonts in. Build the Header global and `MegaMenu.tsx` from the header in `index.html`. Build the footer.

**Step 6. Build the blocks.** For each section in section 4: write `config.ts` (fields) and `Component.tsx` (markup copied from your HTML, with text replaced by props). Rebuild Slick sliders, the video modal and the sub-service panel as small client components.

**Step 7. Build the templates.** Home, Service, Sub-service, Industry, Generic, Blog post, Blog list, Case study. Add SEO metadata (`generateMetadata`) and JSON-LD.

**Step 8. Recreate the 6 designed pages in the admin** using blocks, and compare side by side with the HTML versions until they match.

**Step 9. Add forms, redirects, sitemaps, revalidation hooks, roles.**

**Step 10. Run the migration scripts** (section 8), then let editors finish the service pages.

**Step 11. Test:** Lighthouse, mobile, all browsers, forms, 404 page, every old URL, admin roles.

**Step 12. Deploy to staging, then production** (section 10).

## 10. Hosting and deployment

Your current shared hosting (FTP, `.htaccess`, PHP) cannot run a Next.js server properly. Move to one of these; the database stays on MongoDB Atlas in every option.

| Option | Setup effort | Best when | Notes |
| --- | --- | --- | --- |
| **A. Vercel + Atlas + S3/R2** | Lowest | You want zero server maintenance | Push to GitHub = deploy; global CDN built in; commercial sites need the Pro plan; media must be on S3/R2 |
| **B. VPS + Atlas** (DigitalOcean, AWS Lightsail, Hostinger VPS, etc.) | Medium | You want a fixed monthly cost and full control | Ubuntu, Node, PM2, Nginx, free SSL; at least 2 vCPU / 4 GB RAM (builds are memory-heavy) |
| **C. Docker on any cloud** | Medium–high | You already run containers | Same as B, packaged as an image |

My recommendation: **Option A** if the team has no server admin; **Option B with Cloudflare in front** if you prefer to own the server. Check current plan prices on each provider's site before you decide.

**Production database (both options)**

1. In Atlas, create a production cluster (a dedicated tier such as M10 for backups and performance; M0 is for development only).
2. Create a separate database user for production with a strong password.
3. Network access: allow only your server IP (Option B) or Vercel's egress (Option A, or use Atlas's Vercel integration).
4. Turn on continuous cloud backups.

**Option A: Vercel, step by step**

1. Push the code to GitHub.
2. On vercel.com: Add New Project → import the repo.
3. Add every variable from `.env`, with `NEXT_PUBLIC_SERVER_URL=https://yourdomain.com`.
4. Deploy. Check `https://<project>.vercel.app` and `/admin`.
5. Settings → Domains → add `professional3dservices.com` and `www`; update DNS (A / CNAME) at your registrar as Vercel shows. SSL is automatic.
6. Every push to `main` deploys to production; every pull request gets a preview URL.

**Option B: VPS, step by step**

```bash
# 1. On the server (Ubuntu 24.04)
sudo apt update && sudo apt install -y nginx git
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - && sudo apt install -y nodejs
sudo npm i -g pm2

# 2. Get the code and build
git clone https://github.com/<you>/pro3d-site.git && cd pro3d-site
nano .env                     # production values
npm ci && npm run build
pm2 start npm --name pro3d -- start   # runs on port 3000
pm2 save && pm2 startup
```

```nginx
# 3. /etc/nginx/sites-available/pro3d
server {
  server_name professional3dservices.com www.professional3dservices.com;
  client_max_body_size 50M;           # media uploads
  location / {
    proxy_pass http://localhost:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

```bash
# 4. Enable site + free SSL
sudo ln -s /etc/nginx/sites-available/pro3d /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo apt install -y certbot python3-certbot-nginx && sudo certbot --nginx
```

5. DNS: point the A record of the domain to the server IP (or to Cloudflare, proxied).
6. Redeploys: a GitHub Actions workflow that SSHes in and runs `git pull && npm ci && npm run build && pm2 reload pro3d`.
7. Keep the `www` → non-www and HTTPS redirects (Nginx or Cloudflare rule), as the current `.htaccess` does.

**Environments:** `local` (your machine, Atlas dev DB) → `staging` (preview URL, copy of prod DB) → `production`. Never test migrations on the production database.

## 11. Security, backups and monitoring

**Security**

- Secrets only in environment variables; `.env` in `.gitignore`.
- Strong `PAYLOAD_SECRET`; admin users with strong passwords; enable login rate limiting (`maxLoginAttempts`, `lockTime`).
- Access control on every collection: public can only read `published` documents.
- Contact form: server-side validation, honeypot field or Cloudflare Turnstile against spam.
- Restrict upload types and size on the `media` collection.
- Atlas: IP allow-list, least-privilege DB user, TLS (on by default).
- Keep Next.js and Payload updated (`npm outdated` monthly; patch security releases quickly).

**Backups**

- Atlas continuous backups with point-in-time restore.
- S3/R2 bucket versioning for media.
- Code in GitHub (the code is the backup for templates and blocks).
- Before every migration or big change: `mongodump` to a dated archive.

**Monitoring**

- Uptime check every minute (UptimeRobot, Better Stack).
- Error tracking with Sentry for the website and the admin.
- Google Search Console: watch coverage, 404s and Core Web Vitals daily for the first 4 weeks after launch.
- GA4 or a privacy-friendly analytics tool via Site Settings.
- On a VPS: `pm2 monit`, log rotation (`pm2 install pm2-logrotate`), disk alerts.

## 12. Timeline and launch checklist

Expect roughly 11 weeks from kickoff to launch; blocks and content migration overlap because editors can start filling pages as soon as the first blocks exist.

Estimate for 1 to 2 developers plus 1 content editor, weeks from kickoff:

```text
Phase                      W0  W1  W2  W3  W4  W5  W6  W7  W8  W9  W10 W11
Plan and URL inventory     ====
Setup, design, header          ========
Blocks and templates                   ============
Roles, SEO, forms                              ========
Content migration                                  ============
QA and staging                                                 ========
Go live                                                                ◆
```

The estimate assumes the 6 designed pages are final. Each new layout the designers add later costs about 2–4 days of block work.

**Launch checklist**

- [ ] All 236 URLs from `sitemap_new.xml` return 200 or a single 301
- [ ] Titles, meta descriptions, H1s and canonicals match or improve on the old site
- [ ] Redirects from `.htaccess` imported; www → non-www and HTTPS redirects working
- [ ] `sitemap.xml`, image and video sitemaps, `feed.xml`, `robots.txt` generated and valid
- [ ] Bing and Ahrefs verification files present in `/public`
- [ ] Contact form sends email and saves submissions; spam protection on
- [ ] Lighthouse mobile 90+ on Home, a service page and a blog post
- [ ] Every image has alt text; 404 page designed
- [ ] Admin roles tested (author cannot publish)
- [ ] Publish → page updates within seconds (revalidation works)
- [ ] Atlas backups on; uptime and error monitoring on
- [ ] DNS TTL lowered 24 hours before the switch
- [ ] After launch: submit sitemap in Search Console and Bing; watch 404s and rankings for 4 weeks
