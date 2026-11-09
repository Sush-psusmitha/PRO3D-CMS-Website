import {
  faqBlock,
  portfolioIntro,
  portfolioItems,
  servicesContactBlock,
  showreel,
  successStories,
  successStoriesIntro,
  testimonialsBlock,
  whyChooseFeatures,
} from '@/content/shared'
import type { SitePage } from '@/site/types'

const INTRO_TEXT =
  'As a top 3D model design company, we have the support of skilled 3D modelers who can use the latest technology to create digital models and prototypes. High-detail models are used by various industries, including manufacturing, retail, eCommerce, architecture, advertising, and filmmaking.'
const CARD_TEXT = 'We create 3D models for products like furniture, gadgets'

// Live URL: https://professional3dservices.com/3d-modeling.html
export const modeling: SitePage = {
  path: '3d-modeling.html',
  meta: {
    title: '3D Modeling Services for Real Estate, eCommerce, Games, AR',
    description:
      'High-end 3D modeling services, detailed 3D models for √real estate √gaming, √eCommerce, and more. √affordable price √fast TAT! Request trial!',
    keywords:
      '3d modeling services, 3d modeling company, outsource 3d modeling services, outsourcing 3d modeling, 3d model design services, 3d modeling solutions, 3d modeling studio, 3d modeling companies',
    image: '/img/portfolio/electronic-device-3d-design.webp',
  },
  schema: [
    {
      '@type': 'Service',
      '@id': 'https://professional3dservices.com/3d-modeling.html#service',
      serviceType: '3D Modeling Services',
      name: '3D Modeling Services',
      url: 'https://professional3dservices.com/3d-modeling.html',
      description:
        'ThePro3DStudio offers professional 3D modeling services including eCommerce products, architecture designs, print-ready models, digital sculpting, AR, and game asset modeling for global clients.',
      provider: { '@id': 'https://professional3dservices.com/#organization' },
      areaServed: { '@type': 'Place', name: 'Global' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: '3D Modeling Categories',
        itemListElement: [
          ['Product Modeling', 'High-precision 3D product modeling for design visualization, manufacturing, and marketing.'],
          ['Architecture Modeling', 'Detailed 3D architectural models for residential, commercial, and industrial projects.'],
          ['Print-Ready Modeling', 'Accurate 3D models optimized for 3D printing applications.'],
          ['Digital Sculpting', 'Detailed organic 3D sculpting for characters, creatures, and artistic models.'],
          ['3D Modeling for AR', 'Optimized 3D assets for augmented reality experiences and mobile applications.'],
          ['Game Assets Modeling', 'Game-ready 3D assets designed for real-time rendering and performance.'],
        ].map(([name, description]) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name, description } })),
      },
    },
  ],
  layout: [
    {
      blockType: 'hero',
      background: { src: '/img/banner/3d-modeling.png', alt: '', width: 1920, height: 1020 },
      title: '3D MODELING SERVICES',
      description:
        'Experience <strong>best-in-class</strong>, <strong>affordable</strong>, and best quality 3D modeling solutions.',
      primaryButton: { label: 'Launch Experience', href: '/contact.html' },
      secondaryButton: { label: 'SEE CASE STUDIES', href: '/case-studies.html' },
    },
    {
      blockType: 'servicesIntro',
      image: { src: '/img/3d-modeling/3d-modeling-intro.png', alt: '3D furniture modeling render', width: 400, height: 550 },
      breadcrumb: [{ label: 'Home', href: '/' }, { label: 'Services', href: '/3d-modeling.html' }, { label: '3D Modeling Services' }],
      title: 'ThePro3DStudio Provides Custom 3D Modeling Services That Help Transform Ideas.',
      paragraphs: [INTRO_TEXT, INTRO_TEXT],
      stats: [
        { value: '17000', suffix: '+', label: '3D Assets' },
        { value: '$17.5m', suffix: '+', label: 'Revenue Boosted' },
        { value: '15', suffix: '+', label: 'Industries Served' },
        { value: '20', suffix: '+', unit: 'Yrs', label: 'Industry  Experience' },
      ],
    },
    {
      blockType: 'serviceCards',
      eyebrow: { label: 'WHAT WE DO?', href: '/3d-modeling.html' },
      title: 'Our 3D Modeling Services',
      description:
        'As a renowned 3D modeling agency, we maintain an all-inclusive portfolio of 3D model designing services, allowing our clients to choose from diverse options and leverage our customized service packages.',
      // Card links use the live URLs (the design used renamed files; see docs/url-map.md)
      cards: [
        ['Product Modeling', '/3d-modeling/product.html', 'product-modeling-s'],
        ['Architecture Modeling', '/3d-modeling/architectural.html', 'architecture-modeling-s'],
        ['Print-Ready Designs', '/3d-print-designs.html', 'print-design-s'],
        ['Digital Sculpting', '/3d-modeling/digital-sculpting.html', 'digital-sculpting-s'],
        ['3D Modeling for AR', '/3d-modeling-for-ar.html', '3d-modeling-ar-s'],
        ['360 Degree Product Views', '/interactive-product-360-view.html', '360-degree-product-modeling-s'],
        ['Packaging Design', '/3d-modeling/3d-product-package-design.html', 'packing-design-s'],
        ['3D Stall Design', '/3d-modeling/exhibition-stall-design.html', '3d-stall-design-s'],
        ['Game Prop Design', '/3d-modeling/game-props-design.html', 'game-prop-design-s'],
      ].map(([title, href, img]) => ({
        title: title!,
        href: href!,
        description: CARD_TEXT,
        image: { src: `/img/3d-modeling/${img}.png`, alt: title! },
      })),
    },
    {
      blockType: 'whyChoose',
      background: { src: '/img/working-vertical-bg.png', alt: '' },
      image: {
        src: '/img/3d-modeling/why-choose-lhs.png',
        alt: '3D modeling workstation with a wireframe drill model',
        width: 775,
        height: 814,
      },
      video: showreel,
      eyebrow: { label: 'WHY CHOOSE US?', href: '/about.html' },
      title:
        'ThePro3DStudio Is A Reputed 3D Design Company That Has Been Helping Its Clients With World-Class Design Support For The Past Few Years.',
      features: whyChooseFeatures,
      button: { label: 'Get Started', href: '/contact.html' },
    },
    { blockType: 'serviceSuccessStories', ...successStoriesIntro, stories: successStories },
    { blockType: 'portfolioCarousel', variant: 'light', ...portfolioIntro, items: portfolioItems },
    testimonialsBlock,
    faqBlock,
    servicesContactBlock,
  ],
}
