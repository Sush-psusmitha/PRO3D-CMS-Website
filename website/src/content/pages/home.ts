import {
  clientLogos,
  industryItems,
  portfolioIntro,
  portfolioItems,
  testimonialsBlock,
} from '@/content/shared'
import type { SitePage } from '@/site/types'

const LOREM_SHORT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus in varius nulla.'
const LOREM_MEDIA =
  'Morbi nec turpis convallis, maximus sem eu, accumsan metus. Ut ullamcorper, eros elementum luctus rhoncus, augue sem euismod magna, ut tempor magna nisi at tunc.'

const storyTags = ['3D Modeling', 'Texturing', 'Visualization']

export const home: SitePage = {
  path: '',
  meta: {
    title: '3D Design Studio - ThePro3DStudio',
    description:
      'As a renowned 3D design studio, ThePro3DStudio provides custom 3D design services, which include modeling, rendering, and texturing, at affordable prices.',
    keywords:
      '3D design services, 3d modeling company, 3d rendering company, 3d design studio, 3d design company, 3D model design company, 3D solutions, 3d modeling and rendering services',
    image: '/img/logo-white.png',
  },
  layout: [
    {
      blockType: 'hero',
      background: { src: '/img/banner/home-bg.png', alt: '', width: 1920, height: 1020 },
      title: 'WE FRAME<br>THE FUTURE',
      description:
        'Experience <strong>best-in-class</strong>, <strong>affordable</strong>, and best quality 3D modeling solutions.',
      primaryButton: { label: 'Launch Experience', href: '/contact.html' },
      secondaryButton: { label: 'SEE CASE STUDIES', href: '/case-studies.html' },
    },
    {
      blockType: 'aboutIntro',
      eyebrow: { label: 'ABOUT US', href: '/about.html' },
      headline:
        'We Have A Team Of Professional 3D Product Designers Offering Exceptional Quality Designs Which Helping To Decrease Cost And Production Time.',
      button: { label: 'Learn more', href: '/about.html' },
      intro: {
        icon: { src: '/img/pro3d-vector.png', alt: 'ThePro3DStudio' },
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consectetur posuere ipsum ac tincidunt. Vivamus placerat orci, vel elementum odio pretium vel. Aenean blandit nibh eu orci tincidunt tempor. Quisque sit amet sollicitudin ligula non vestibulum ultricies. Aenean sollicitudin ligula non vestibulum ultricies.',
      },
      stats: [
        { value: '100', suffix: '+', label: 'Experts Onboard' },
        { value: '14000', suffix: '+', label: 'Projects Delivered' },
        { value: '15', suffix: '+', label: 'Years In Industry' },
        { value: '92', suffix: '%', label: 'Client Retention' },
      ],
      media: [
        {
          image: { src: '/img/creative-expertise-intro.png', alt: 'Creative Expertise - 3D Designer at Work' },
          title: 'Creative Expertise',
          description: LOREM_MEDIA,
        },
        {
          image: { src: '/img/experience-intro.png', alt: 'Experience & Innovation - Immersive VR Visualization' },
          title: 'Experience & Innovation',
          description: LOREM_MEDIA,
        },
      ],
      clientLogos,
    },
    {
      blockType: 'servicesGrid',
      eyebrow: { label: 'OUR SERVICES', href: '/services.html' },
      title: 'Your Vision, Brought to Life',
      cards: [
        {
          title: '3D Modeling Services',
          description: LOREM_SHORT,
          href: '/3d-modeling.html',
          image: { src: '/img/3d-modeling-services.png', alt: '3D Modeling Services' },
          theme: 'dark',
        },
        {
          title: '3D Rendering Services',
          description: LOREM_SHORT,
          href: '/3d-rendering.html',
          image: { src: '/img/3d-rendering-services.png', alt: '3D Rendering Services' },
          theme: 'light',
          contentPosition: 'top',
        },
        {
          title: '3D Texturing Services',
          description: LOREM_SHORT,
          href: '/3d-texturing-services.html',
          image: { src: '/img/3d-texturing-services.png', alt: '3D Texturing Services' },
          theme: 'light',
        },
      ],
    },
    {
      blockType: 'verticals',
      eyebrow: { label: 'WORKING VERTICALS', href: '/portfolio.html' },
      title: 'Industries We Specialized in',
      background: { src: '/img/working-vertical-bg.png', alt: '' },
      items: industryItems,
    },
    {
      blockType: 'successStories',
      eyebrow: { label: 'SUCCESS STORIES', href: '/portfolio.html' },
      title: 'Insights from<br>Industry Partners',
      description:
        'Backed by a team of vetted 3D modelers, renderers, and professionally trained 3D texturing artists, ThePro3DStudio is an industry leader in providing high-end 3D production.',
      stories: [
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
      ],
    },
    {
      blockType: 'portfolioCarousel',
      variant: 'dark',
      ...portfolioIntro,
      background: { src: '/img/working-vertical-bg.png', alt: '' },
      items: portfolioItems,
    },
    testimonialsBlock,
    {
      blockType: 'ctaHome',
      background: { src: '/img/cta-home.png', alt: '' },
      title: 'Ready to architect your digital legacy?',
      description: "Let's discuss how we can turn your vision into an impactful, human-centered digital reality.",
      button: { label: 'Start your design journey', href: '/contact.html' },
      card: {
        image: { src: '/img/cta-rhs.png', alt: 'Two people wearing VR headsets' },
        eyebrow: 'CONTACT US',
        description: "Great digital experiences begin with a conversation. Let's talk.",
      },
    },
    {
      blockType: 'latestBlogs',
      eyebrow: { label: 'ARTICLES', href: '/blog.html' },
      title: 'Latest news from our blog.',
      button: { label: 'View All Articles', href: '/blog.html' },
      posts: [
        {
          title: 'Virtual Models and Their Benefits for eCommerce Fashion',
          href: '/blog/virtual-models-benefits-for-fashion-ecommerce.html',
          image: { src: '/img/blog/blog1.png', alt: 'Virtual Models and Their Benefits for eCommerce Fashion' },
          author: 'Olivia',
          date: 'May 2, 2026',
        },
        {
          title: 'The ROI of Empathy: What is Your Best Business Investment',
          href: '/blog.html',
          image: { src: '/img/blog/blog2.png', alt: 'The ROI of Empathy: What is Your Best Business Investment' },
          author: 'Olivia',
          date: 'July 7, 2026',
        },
        {
          title: 'The Secret Weapon for Scaling Global Digital Products',
          href: '/blog.html',
          image: { src: '/img/blog/blog3.png', alt: 'The Secret Weapon for Scaling Global Digital Products' },
          author: 'Lucas',
          date: 'Aug 15, 2026',
        },
      ],
    },
  ],
}
