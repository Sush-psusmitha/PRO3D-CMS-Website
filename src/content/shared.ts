import type {
  FaqBlock,
  ImageRef,
  OurApproachBlock,
  PortfolioCarouselBlock,
  VerticalsBlock,
  ServicesContactBlock,
  ServiceSuccessStoriesBlock,
  TestimonialsBlock,
  WhyChooseBlock,
} from '@/site/types'

// Content reused across many pages. In the CMS these become shared collections
// (Testimonials, Case studies, Portfolio) that blocks reference.

export const testimonialsBlock: TestimonialsBlock = {
  blockType: 'testimonials',
  eyebrow: { label: 'TESTIMONIALS', href: '/testimonials.html' },
  title: 'Hear what our Clients have to say',
  button: { label: 'View All Reviews', href: '/testimonials.html' },
  items: [
    ['CTO', 'NexusTech', "ThePro3DStudio doesn't just build models; they build assets that scale with our growth. Their ability to deploy production-ready 3D architecture sets their work apart."],
    ['Head of AI', 'Synthetix Systems', "The turnaround on our product renders was faster than any studio we've worked with, and the quality never dipped, even under tight deadlines."],
    ['Founder', 'Orbital Interiors', "Every render felt like a finished photograph. Our clients couldn't tell the difference between the 3D visuals and the actual build."],
    ['Marketing Director', 'Veltrix Group', 'From concept to final render, the process was smooth and collaborative. They understood our brand and elevated it beyond what we imagined.'],
    ['VP Product', 'Halcyon Labs', 'Reliable, precise, and genuinely invested in getting the details right. This is the team we call whenever a project needs to look flawless.'],
    ['Creative Lead', 'Modulo Studio', "Their team caught details we hadn't even flagged and fixed them before we asked. That level of care is rare to find in an outsourced partner."],
  ].map(([role, company, quote]) => ({
    role: role!,
    company: company!,
    quote: quote!,
    avatar: { src: '/img/testi-avatar.png', alt: '' },
    rating: 5,
  })),
}

export const clientLogos: ImageRef[] = [
  ['snap', 'Snap Inc.'],
  ['wayfair', 'Wayfair'],
  ['flipkart', 'Flipkart'],
  ['intiaro', 'Intiaro'],
  ['midas-furniture', 'Midas Furniture'],
  ['aurora-solar', 'Aurora Solar'],
  ['accenture', 'Accenture'],
  ['nike', 'Nike'],
  ['puma', 'Puma'],
  ['target', 'Target'],
  ['sonos', 'Sonos'],
  ['lacoste', 'Lacoste'],
].map(([file, alt]) => ({ src: `/img/clients/${file}.webp`, alt: alt! }))

export const industryItems: VerticalsBlock['items'] = [
  ['Architecture / Engineering', 'architecture-industry'],
  ['eCommerce', 'ecommerce-industry'],
  ['Fashion / Apparels', 'fashion-industry'],
  ['Furniture / Appliances', 'furniture-industry'],
  ['Sports / Fitness', 'sports-industry'],
  ['Gaming & Entertainment', 'gaming-industry'],
].map(([label, file]) => ({ label: label!, image: { src: `/img/industries/${file}.png`, alt: label! } }))

export const ctaContact = {
  title: 'Ready to architect your digital legacy?',
  description: "Let's discuss how we can turn your vision into an impactful, human-centered digital reality.",
  button: { label: 'Start your design journey', href: '/contact.html' },
}

export const portfolioItems: PortfolioCarouselBlock['items'] = [
  ['3D Architectural Texturing', '3d-architectural-texturing'],
  ['3D Product Modeling', '3d-product-modeling'],
  ['3D Furniture Modeling', '3d-furniture-modeling'],
  ['3D Interior Rendering', '3d-interior-rendering'],
  ['3D Architectural Modeling', '3d-architectural-modeling'],
  ['3D Interior Modeling', '3d-interiro-modeling'],
].map(([label, file]) => ({
  label: label!,
  href: '/portfolio.html',
  image: { src: `/img/portfolio/${file}.png`, alt: `${label} project` },
}))

export const portfolioIntro = {
  eyebrow: { label: 'PORTFOLIO', href: '/portfolio.html' },
  title: 'A Showcase of<br>Our 3D Excellence',
  description:
    'Explore a curated showcase of our 3D expertise, from photorealistic renders and product visualizations to immersive experiences and animation. Each project combines creativity, precision, and technical excellence.',
}

const storyTags = ['3D Modeling', 'Texturing', 'Visualization']

export const successStories: ServiceSuccessStoriesBlock['stories'] = [
  {
    title: 'Provided Unique 3D Product Model Designs To An UK-Based Electronic Appliance Manufacturer',
    href: '/portfolio.html',
    image: { src: '/img/insight1.png', alt: 'Custom 3D product model designs for a UK-based electronics manufacturer' },
    tags: storyTags,
  },
  {
    title: 'Offered Bathroom Fixtures 3D Textured Models For A Manufacturing Firm',
    href: '/portfolio.html',
    image: { src: '/img/insight2.png', alt: '3D textured bathroom fixture models for a manufacturing firm' },
    tags: storyTags,
  },
  {
    title: 'Case Study On Architectural 3D Modeling For UK Based Real Estate Client',
    href: '/portfolio.html',
    image: { src: '/img/insight3.png', alt: 'Architectural 3D modeling for a UK-based real estate client' },
    tags: storyTags,
  },
  {
    title: 'Case Study On 3D Furniture Design For A Leading UK Company',
    href: '/portfolio.html',
    image: { src: '/img/insight4.png', alt: '3D furniture design for a leading UK company' },
    tags: storyTags,
  },
]

export const successStoriesIntro = {
  eyebrow: { label: 'SUCCESS STORIES', href: '/portfolio.html' },
  title: 'Insights from<br>Industry Partners',
  description:
    'Backed by a team of vetted 3D modelers, renderers, and professionally trained 3D texturing artists, ThePro3DStudio is an industry leader in providing high-end 3D production.',
}

export const whyChooseFeatures: WhyChooseBlock['features'] = [
  { icon: 'fa-stopwatch', title: 'Shorter Turnarounds', description: 'Given our 3D modeling specialists team strength and bandwidth, we deliver high-quality projects within short time frames.' },
  { icon: 'fa-tags', title: 'Competitive Pricing', description: 'Our pricing is affordable, and clients with different budgets find it easier to do business with us.' },
  { icon: 'fa-user-group', title: 'Experienced Team', description: 'Our in-house 3D artists bring years of specialized experience across architecture, product, and animation.' },
  { icon: 'fa-headset', title: 'End-to-End Support', description: 'From initial concept to final delivery, we stay involved and responsive at every stage of your project.' },
  { icon: 'fa-industry', title: 'Proven Industry Expertise', description: "We've delivered thousands of projects across real estate, retail, gaming, and manufacturing." },
  { icon: 'fa-shield-halved', title: 'Confidentiality Guaranteed', description: "We sign NDAs on request and treat every client's designs as strictly confidential." },
]

export const showreel = { src: '/video/thepro3dstudio-showreel.mp4', poster: '/video/thepro3dstudio-showreel.webp' }

export const servicesContactBlock: ServicesContactBlock = {
  blockType: 'servicesContact',
  background: { src: '/img/working-vertical-bg.png', alt: '' },
  title: 'Ready to architect your digital legacy?',
  description:
    "Let's discuss how we can transform your vision into meaningful digital experiences. Together, we'll create intuitive, engaging, and human-centered solutions.",
  cardIntro: 'We appreciate your interest in ThePro3DStudio. Please select from the options below.',
  countryCodes: [
    { label: 'India +91', value: '+91' },
    { label: 'USA +1', value: '+1' },
    { label: 'UK +44', value: '+44' },
    { label: 'Australia +61', value: '+61' },
    { label: 'UAE +971', value: '+971' },
  ],
  services: ['3D Modeling', '3D Rendering', '3D Texturing', '3D Animation', '3D Product Visualization', 'Other'],
}

export const faqBlock: FaqBlock = {
  blockType: 'faq',
  eyebrow: { label: 'FAQ', href: '/contact.html' },
  title: 'Answered questions. Everything you might want to know—up front.',
  items: [
    { question: 'How does your 3D modeling process work?', answer: 'Our process includes discovery, concept, modeling, feedback, and delivery — ensuring precision, collaboration, and quality at every stage.' },
    { question: 'How long does a typical 3D modeling project take?', answer: 'Turnaround depends on complexity and scope, but most projects are delivered within a few days to a couple of weeks, with clear milestones shared upfront.' },
    { question: 'Do you work with startups or only established brands?', answer: "Both. We partner with early-stage startups and established enterprises alike, tailoring our process and packages to fit each client's scale and budget." },
    { question: 'Can you handle custom or complex requests?', answer: 'Yes. Our 3D modeling team regularly handles highly detailed and non-standard requests across industries, from intricate mechanical assemblies to bespoke product geometry.' },
    { question: 'What file formats do you deliver 3D models in?', answer: 'We deliver in all major formats including OBJ, FBX, STL, GLTF, and Blend, or any other format your pipeline requires.' },
    { question: "Do you offer revisions if I'm not satisfied with the model?", answer: 'Yes, every project includes revision rounds so the final model matches your expectations before final delivery.' },
    { question: 'Can you model from just photos or sketches?', answer: 'Absolutely. Our modelers can reconstruct accurate 3D models from reference photos, sketches, or rough dimensions alone.' },
    { question: 'Do you sign NDAs to protect our product designs?', answer: "Yes, we sign NDAs on request and treat every client's designs and reference materials as strictly confidential." },
  ],
}

export const ourApproachBlock: OurApproachBlock = {
  blockType: 'ourApproach',
  title: 'Our Approach',
  description:
    'As a trusted 3D modeling agency, we deliver complete 3D design solutions, helping clients transform creative concepts into detailed, realistic, and market-ready digital models.',
  image: { src: '/img/creative-expertise-intro.png', alt: 'ThePro3DStudio team at work' },
  button: { label: 'Get A Free Quote', href: '/contact.html' },
  phases: [
    {
      title: 'Requirement Gathering',
      description:
        'We analyze your project goals, visual references, dimensions, style preferences, and technical requirements to establish a clear production direction.',
      duration: '1 Day',
      deliverable: 'Project Brief',
    },
    {
      title: 'Concept & Planning',
      description:
        'Our specialists develop the visual direction, model structure, workflow, and material approach before beginning the detailed production process.',
      duration: '1-2 Days',
      deliverable: 'Concept Plan',
    },
    {
      title: '3D Modeling, Texturing & Rendering',
      description:
        'We create detailed 3D models, apply realistic materials and textures, and produce polished renders with professional lighting and composition.',
      duration: '3-5 Days',
      deliverable: 'Rendered Model',
    },
    {
      title: 'Review & Delivery',
      description:
        'We incorporate your feedback, complete final refinements, optimize the model, and deliver all approved files in the required formats.',
      duration: '1-2 Days',
      deliverable: 'Final 3D Files',
    },
  ],
}
