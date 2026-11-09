// Content shapes for the public website.
// They mirror what the Payload collections/blocks will return, so the
// static data in src/content can later be swapped for CMS queries without
// touching the components.

/** Short trusted HTML (only <strong>, <em>, <br>) until Lexical rich text is wired in. */
export type InlineHtml = string

export type LinkItem = {
  label: string
  href: string
}

export type ImageRef = {
  src: string
  alt: string
  width?: number
  height?: number
}

// ---------------------------------------------------------------------------
// Navigation (Header global)

export type MegaLink = LinkItem & { icon: string }

export type MegaFeature = LinkItem & { icon: string; description: string }

export type MegaCta =
  | {
      variant: 'card'
      image: ImageRef
      title: InlineHtml
      description: string
      button: LinkItem
    }
  | {
      variant: 'horizontal'
      image: ImageRef
      title: InlineHtml
      description: string
      button: LinkItem
      extraClass?: string
    }
  | {
      variant: 'poster'
      image: ImageRef
      title: InlineHtml
      button: LinkItem
    }

export type MegaMenu =
  | {
      layout: 'columns'
      columns: { title: string; titleHref?: string; description: string; links: MegaLink[] }[]
      cta: MegaCta
    }
  | {
      layout: 'features'
      /** 'solution' or 'vertical' — picks the CSS class family */
      style: 'solution' | 'vertical'
      columns: MegaFeature[][]
      cta: MegaCta
    }

export type NavItem = LinkItem & {
  megaMenu?: MegaMenu
  /** Links shown in the mobile drawer accordion */
  mobileLinks?: MegaLink[]
}

export type HeaderData = {
  logo: { light: string; dark: string; alt: string }
  nav: NavItem[]
  cta: LinkItem
  search: { placeholder: string; quickLinks: LinkItem[] }
}

// ---------------------------------------------------------------------------
// Footer global

export type FooterData = {
  logo: ImageRef
  description: string
  badges: ImageRef[]
  linkColumns: { label: string; links: LinkItem[] }[]
  contact: {
    phone: LinkItem
    email: LinkItem
    hours: InlineHtml
    address: InlineHtml
  }
  social: (LinkItem & { icon: string })[]
  bottomNav: LinkItem[]
  legal: {
    text: string
    links: LinkItem[]
    copyright: string
    since: string
  }
}

// ---------------------------------------------------------------------------
// Page blocks (the `layout` field of the Pages collection)

export type HeroBlock = {
  blockType: 'hero'
  background: ImageRef
  title: InlineHtml
  description: InlineHtml
  primaryButton: LinkItem
  secondaryButton?: LinkItem
}

export type AboutIntroBlock = {
  blockType: 'aboutIntro'
  eyebrow: LinkItem
  headline: string
  button: LinkItem
  intro: { icon: ImageRef; text: string }
  stats: { value: string; suffix: string; label: string }[]
  media: { image: ImageRef; title: string; description: string }[]
  clientLogos: ImageRef[]
}

export type ServicesGridBlock = {
  blockType: 'servicesGrid'
  eyebrow: LinkItem
  title: string
  cards: {
    title: string
    description: string
    href: string
    image: ImageRef
    theme: 'dark' | 'light'
    contentPosition?: 'top' | 'bottom'
  }[]
}

export type VerticalsBlock = {
  blockType: 'verticals'
  /** 'light' = grey background without the image (Solutions page) */
  variant?: 'dark' | 'light'
  eyebrow: LinkItem
  title: string
  background?: ImageRef
  items: { label: string; image: ImageRef; href?: string }[]
}

export type SuccessStoriesBlock = {
  blockType: 'successStories'
  eyebrow: LinkItem
  title: InlineHtml
  description: string
  stories: { title: string; href: string; image: ImageRef; tags: string[] }[]
}

export type PortfolioCarouselBlock = {
  blockType: 'portfolioCarousel'
  variant: 'dark' | 'light'
  eyebrow: LinkItem
  title: InlineHtml
  description: string
  background?: ImageRef
  items: { label: string; href: string; image: ImageRef }[]
}

export type TestimonialsBlock = {
  blockType: 'testimonials'
  eyebrow: LinkItem
  title: string
  button: LinkItem
  items: { role: string; company: string; quote: string; avatar: ImageRef; rating: number }[]
}

export type CtaHomeBlock = {
  blockType: 'ctaHome'
  background: ImageRef
  title: string
  description: string
  button: LinkItem
  card: { image: ImageRef; eyebrow: string; description: string }
}

export type LatestBlogsBlock = {
  blockType: 'latestBlogs'
  eyebrow: LinkItem
  title: string
  button: LinkItem
  posts: { title: string; href: string; image: ImageRef; author: string; date: string }[]
}

export type ServicesIntroBlock = {
  blockType: 'servicesIntro'
  image: ImageRef
  /** Last crumb has no href (current page) */
  breadcrumb: { label: string; href?: string }[]
  title: string
  paragraphs: string[]
  stats?: { value: string; suffix: string; unit?: string; label: string }[]
  /** Industry pages: client logo marquee inside the text column, in place of the stats */
  contentLogos?: ImageRef[]
  /** About page: Our Mission / Our Vision cards under the intro */
  missionVision?: { mission: string; vision: string }
  /** About page: client logo marquee at the bottom of the section */
  clientLogos?: ImageRef[]
}

export type SubserviceListBlock = {
  blockType: 'subserviceList'
  eyebrow: LinkItem
  title: string
  description: string
  items: { title: string; text: string; image: ImageRef; thumb: ImageRef }[]
  button: LinkItem
}

export type WhyChooseBlock = {
  blockType: 'whyChoose'
  background: ImageRef
  image: ImageRef
  video?: { src: string; poster: string }
  eyebrow: LinkItem
  title: string
  features: { icon: string; title: string; description: string }[]
  button: LinkItem
}

export type ServiceSuccessStoriesBlock = {
  blockType: 'serviceSuccessStories'
  eyebrow: LinkItem
  title: InlineHtml
  description: string
  stories: { title: string; href: string; image: ImageRef; tags: string[] }[]
}

export type FaqBlock = {
  blockType: 'faq'
  eyebrow: LinkItem
  title: string
  /** Shown in two columns: first half left, second half right */
  items: { question: string; answer: string }[]
}

export type ServicesContactBlock = {
  blockType: 'servicesContact'
  background: ImageRef
  title: string
  description: string
  cardIntro: string
  countryCodes: { label: string; value: string }[]
  services: string[]
}

export type SolutionsIntroBlock = {
  blockType: 'solutionsIntro'
  image: ImageRef
  breadcrumb: { label: string; href?: string }[]
  title: string
  features: string[]
  stats: { value: string; label: string }[]
}

export type SolutionsHighlightsBlock = {
  blockType: 'solutionsHighlights'
  eyebrow: LinkItem
  title: string
  description: string
  button: LinkItem
  image: ImageRef
}

export type IndustriesWhyChooseBlock = {
  blockType: 'industriesWhyChoose'
  background: ImageRef
  eyebrow: LinkItem
  title: string
  button: LinkItem
  cards: { icon: string; title: string; description: string }[]
}

export type TechStackBlock = {
  blockType: 'techStack'
  badge: string
  title: string
  description: string
  button: LinkItem
  rows: { title: string; items: string[] }[]
}

export type HighlightsBlock = {
  blockType: 'highlights'
  eyebrow: LinkItem
  title: InlineHtml
  description: string
  cards: { icon: ImageRef; title: string; description: string }[]
}

export type OurApproachBlock = {
  blockType: 'ourApproach'
  title: string
  description: string
  image: ImageRef
  button: LinkItem
  phases: { title: string; description: string; duration: string; deliverable: string }[]
}

export type MapsystemsIntroBlock = {
  blockType: 'mapsystemsIntro'
  image: ImageRef
  title: string
  description: string
  points: { title: string; description: string }[]
}

export type ServiceCardsBlock = {
  blockType: 'serviceCards'
  eyebrow: LinkItem
  title: string
  description: string
  cards: { title: string; description: string; href: string; image: ImageRef }[]
}

export type BlogTocItem = {
  id: string
  label: string
  isSub?: boolean
  isActive?: boolean
}

export type BlogRecentPost = {
  category: string
  title: string
  href: string
  hasArrow?: boolean
}

export type BlogSidebarPromo = {
  badge: string
  bgImage: ImageRef
  title: string
  description: string
  button: LinkItem
}

export type BlogChallenge = {
  id: string
  number: number
  title: string
  description: string
  solutionBullets: string[]
}

export type BlogTool = {
  name: string
  role: string
  description: string
  bullets: string[]
  note?: string
}

export type BlogDetailBlock = {
  blockType: 'blogDetail'
  heroBg: ImageRef
  bannerImage: ImageRef
  title: string
  category?: string
  author: {
    name: string
    avatar?: ImageRef
    bio: string
    social?: { icon: string; href: string; label: string }[]
  }
  publishDate: string
  updatedDate?: string
  readTime?: string
  leadParagraph: string
  secondaryParagraph?: string
  sections: {
    id: string
    title: string
    paragraphs?: string[]
    challenges?: BlogChallenge[]
    tools?: BlogTool[]
    points?: string[]
    closingParagraphs?: string[]
  }[]
  toc: BlogTocItem[]
  recentPosts: BlogRecentPost[]
  sidebarPromo: BlogSidebarPromo
}

export type PageBlock =
  | BlogDetailBlock
  | ServiceCardsBlock
  | SolutionsIntroBlock
  | SolutionsHighlightsBlock
  | IndustriesWhyChooseBlock
  | TechStackBlock
  | HighlightsBlock
  | OurApproachBlock
  | MapsystemsIntroBlock
  | ServicesIntroBlock
  | SubserviceListBlock
  | WhyChooseBlock
  | ServiceSuccessStoriesBlock
  | FaqBlock
  | ServicesContactBlock
  | HeroBlock
  | AboutIntroBlock
  | ServicesGridBlock
  | VerticalsBlock
  | SuccessStoriesBlock
  | PortfolioCarouselBlock
  | TestimonialsBlock
  | CtaHomeBlock
  | LatestBlogsBlock

export type SitePage = {
  /** URL path without the leading slash, exactly as on the live site: '' for home, '3d-modeling/product.html' */
  path: string
  meta: {
    title: string
    description: string
    keywords?: string
    /** Site-relative image path, e.g. '/img/portfolio/headset-model.webp' */
    image?: string
    /** Set to false to keep a page out of search results (noindex, nofollow) */
    index?: boolean
  }
  /** Extra JSON-LD for this page (Organization/WebSite are added site-wide; FAQPage is built from the FAQ block) */
  schema?: Record<string, unknown>[]
  layout: PageBlock[]
}
