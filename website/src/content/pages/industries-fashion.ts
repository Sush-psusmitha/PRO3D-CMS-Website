import {
  clientLogos,
  faqBlock,
  industryItems,
  ourApproachBlock,
  portfolioIntro,
  servicesContactBlock,
  testimonialsBlock,
  whyChooseFeatures,
} from '@/content/shared'
import type { SitePage } from '@/site/types'

// New URL from the redesign: https://professional3dservices.com/industries/fashion-industry.html
export const fashionIndustry: SitePage = {
  path: 'industries/fashion-industry.html',
  meta: {
    title: '3D Fashion Industry Modeling & Visualization Services - ThePro3DStudio',
    description:
      'ThePro3DStudio helps fashion brands bring footwear, apparel, and accessories to life with photorealistic 3D modeling, rendering, and visualization services.',
    keywords:
      '3d fashion modeling, fashion industry 3d services, 3d apparel modeling, 3d footwear modeling, 3d fashion accessories modeling, fashion visualization studio.',
    image: '/img/industries/fashion-industry.png',
  },
  schema: [
    {
      '@type': 'Service',
      '@id': 'https://professional3dservices.com/industries/fashion-industry.html#service',
      serviceType: 'Fashion Industry 3D Modeling Services',
      name: 'Fashion Industry 3D Modeling & Visualization Services',
      url: 'https://professional3dservices.com/industries/fashion-industry.html',
      description:
        'ThePro3DStudio helps fashion brands and retailers bring footwear, apparel, and accessories to life with photorealistic 3D modeling, rendering, and visualization for eCommerce, marketing, and virtual try-on.',
      provider: { '@id': 'https://professional3dservices.com/#organization' },
      areaServed: { '@type': 'Place', name: 'Global' },
    },
  ],
  layout: [
    {
      blockType: 'hero',
      background: { src: '/img/banner/fashion-industry.png', alt: '', width: 1920, height: 1020 },
      title: 'FASHION INDUSTRY',
      description:
        'Experience <strong>best-in-class</strong>, <strong>affordable</strong>, and best quality 3D modeling solutions for footwear, apparel, and accessories.',
      primaryButton: { label: 'Launch Experience', href: '/contact.html' },
      secondaryButton: { label: 'SEE CASE STUDIES', href: '/case-studies.html' },
    },
    {
      blockType: 'servicesIntro',
      image: { src: '/img/industries/fashion-intro.png', alt: '3D fashion accessory render', width: 400, height: 550 },
      breadcrumb: [{ label: 'Home', href: '/' }, { label: 'Industries', href: '/industries.html' }, { label: 'Fashion / Apparels' }],
      title: 'ThePro3DStudio Helps Fashion Brands Bring Products To Life In 3D.',
      paragraphs: [
        'From footwear and apparel to jewelry, bags, and eyewear, our 3D modelers translate fashion products into photorealistic, production-ready 3D assets built for eCommerce, marketing, and virtual try-on experiences.',
        'We work closely with fashion brands and retailers to capture fabric texture, stitching detail, and material finish accurately, helping collections launch faster without the cost and lead time of traditional product photography.',
      ],
      contentLogos: clientLogos,
    },
    {
      blockType: 'portfolioCarousel',
      variant: 'light',
      ...portfolioIntro,
      title: 'A Showcase of Our<br>3D Excellence',
      items: [
        ['3D Bag Design', '3d-bag-design', '3D Bag Design project'],
        ['3D Clothing Modeling', '3d-cloth-modeling', '3D Clothing Modeling project'],
        ['3D Suit Modeling / Texturing', '3d-suit-modeling', '3D Suit Modeling / Texturing project'],
        ['3D Watch Design', '3d-watch-design', '3D Watch Design project'],
        ['Fashion Jewellery 3D Design', '3d-jewllery', 'Fashion Jewellery 3D Design project'],
        ['3D Shoe Design', '3d-shoe-design', '3D Shoe Design project'],
      ].map(([label, file, alt]) => ({
        label: label!,
        href: '/portfolio.html',
        image: { src: `/img/industries/portfolio/${file}.png`, alt: alt! },
      })),
    },
    ourApproachBlock,
    {
      blockType: 'industriesWhyChoose',
      background: { src: '/img/working-vertical-bg.png', alt: '' },
      eyebrow: { label: 'WHY CHOOSE US?', href: '/contact.html' },
      title:
        'ThePro3DStudio Is A Reputed 3D Design Company That Has Been Helping Its Clients With World-Class Design.',
      button: { label: 'Get Started', href: '/contact.html' },
      cards: whyChooseFeatures,
    },
    {
      blockType: 'verticals',
      variant: 'light',
      eyebrow: { label: 'WORKING VERTICALS', href: '/portfolio.html' },
      title: 'Other Industries We Specialize In',
      items: industryItems,
    },
    testimonialsBlock,
    faqBlock,
    servicesContactBlock,
    {
      blockType: 'latestBlogs',
      eyebrow: { label: 'ARTICLES', href: '/blog.html' },
      title: 'Latest news from our blog.',
      button: { label: 'View All Articles', href: '/blog.html' },
      posts: [
        {
          title: 'Virtual Models and Their Benefits for eCommerce Fashion',
          href: '/blog/virtual-models-benefits-for-fashion-ecommerce.html',
          image: { src: '/img/blog/blog4.png', alt: 'Virtual Models and Their Benefits for eCommerce Fashion' },
          author: 'Olivia',
          date: 'May 2, 2026',
        },
        {
          title: 'The ROI of Empathy: What is Your Best Business Investment',
          href: '/blog.html',
          image: { src: '/img/blog/blog5.png', alt: 'The ROI of Empathy: What is Your Best Business Investment' },
          author: 'Olivia',
          date: 'July 7, 2026',
        },
        {
          title: 'The Secret Weapon for Scaling Global Digital Products',
          href: '/blog.html',
          image: { src: '/img/blog/blog6.png', alt: 'The Secret Weapon for Scaling Global Digital Products' },
          author: 'Lucas',
          date: 'Aug 15, 2026',
        },
      ],
    },
  ],
}
