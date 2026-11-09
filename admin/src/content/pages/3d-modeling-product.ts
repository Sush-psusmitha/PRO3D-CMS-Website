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

const thumb = (alt: string) => ({
  image: { src: '/img/what-we-do/wwd-img-one.png', alt },
  thumb: { src: '/img/what-we-do/wwdo-img-one-sm.png', alt },
})

// Live URL: https://professional3dservices.com/3d-modeling/product.html
export const productModeling: SitePage = {
  path: '3d-modeling/product.html',
  meta: {
    title: '3D Product Modeling Services for Marketing - ThePro3DStudio',
    description:
      'ThePro3DStudio have a experienced 3D modelers team with the required skill set in providing high-quality 3D product modeling services at affordable prices.',
    keywords:
      '3D product modeling services, 3d product modeling services, 3d product modeling company, product 3d model design services, product 3d design studio.',
    image: '/img/portfolio/headset-model.webp',
  },
  schema: [
    {
      '@type': 'Service',
      '@id': 'https://professional3dservices.com/3d-modeling/product.html#service',
      serviceType: 'Product 3D Modeling Services',
      name: 'Product 3D Modeling Services',
      url: 'https://professional3dservices.com/3d-modeling/product.html',
      description:
        'ThePro3DStudio offers professional product 3D modeling services to create accurate, photorealistic 3D models for design visualization, marketing, and manufacturing across industries.',
      provider: { '@id': 'https://professional3dservices.com/#organization' },
      areaServed: { '@type': 'Place', name: 'Global' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Product 3D Modeling Categories',
        itemListElement: [
          ['Furniture Modeling', 'High-quality 3D furniture modeling services for interior visualization, catalogs, and eCommerce.'],
          ['Home Appliances Modeling', 'Detailed and photorealistic 3D modeling of home appliances for product design and marketing.'],
          ['Fashion Accessories Modeling', 'Precise 3D modeling of fashion accessories like bags, shoes, and watches for visual marketing and prototyping.'],
          ['Product Package Modeling', '3D modeling of product packaging for branding, visualization, and presentation design.'],
          ['Electronic Products Modeling', 'Accurate 3D modeling of electronic devices and gadgets for design, visualization, and manufacturing.'],
        ].map(([name, description]) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name, description } })),
      },
    },
  ],
  layout: [
    {
      blockType: 'hero',
      background: { src: '/img/banner/product-hero.png', alt: '', width: 1920, height: 1020 },
      title: '3D PRODUCT MODELING',
      description:
        'Experience <strong>best-in-class</strong>, <strong>affordable</strong>, and best quality 3D modeling solutions.',
      primaryButton: { label: 'Launch Experience', href: '/contact.html' },
      secondaryButton: { label: 'SEE CASE STUDIES', href: '/case-studies.html' },
    },
    {
      blockType: 'servicesIntro',
      image: { src: '/img/3d-modeling/product-modeling-intro.png', alt: '3D furniture modeling render', width: 400, height: 550 },
      breadcrumb: [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/3d-modeling.html' },
        { label: '3D Modeling Services', href: '/3d-modeling.html' },
        { label: 'Product Modeling' },
      ],
      title: 'ThePro3DStudio Provides Custom 3D Modeling Services That Help Transform Ideas.',
      paragraphs: [
        'As a top 3D model design company, we have the support of skilled 3D modelers who can use the latest technology to create digital models and prototypes. High-detail models are used by various industries, including manufacturing, retail, eCommerce, architecture, advertising, and filmmaking.',
        'As a top 3D model design company, we have the support of skilled 3D modelers who can use the latest technology to create digital models and prototypes. High-detail models are used by various industries, including manufacturing, retail, eCommerce, architecture, advertising, and filmmaking.',
      ],
      stats: [
        { value: '17000', suffix: '+', label: '3D Assets' },
        { value: '$17.5m', suffix: '+', label: 'Revenue Boosted' },
        { value: '15', suffix: '+', label: 'Industries Served' },
        { value: '20', suffix: '+', unit: 'Yrs', label: 'Industry  Experience' },
      ],
    },
    {
      blockType: 'subserviceList',
      eyebrow: { label: 'WHAT WE DO?', href: '/3d-modeling.html' },
      title: 'Our Product Modeling Services',
      description:
        'As a renowned 3D modeling agency, we maintain an all-inclusive portfolio of 3D model designing services, allowing our clients to choose from diverse options and leverage our customized service packages.',
      items: [
        {
          title: 'Furniture Modeling',
          text: 'We create photorealistic 3D furniture models that capture every joint, texture, and finish accurately, ready for catalogs, AR previews, and eCommerce listings that need production-ready visuals.',
          ...thumb('Furniture Modeling'),
        },
        {
          title: 'Home Appliances Modeling',
          text: 'Our modelers deliver precise 3D models of home appliances, capturing intricate mechanical detail and finishes for marketing, prototyping, and online retail with complete accuracy.',
          ...thumb('Home Appliances Modeling'),
        },
        {
          title: 'Fashion Accessories Modeling',
          text: 'We have a thorough knowledge of fashion and accessory intricacies in online retail. It enables us to facilitate a professional display of your fashion accessories. The types of models we can deliver include jewelry, bags, caps, hats, belts, shoes, watches, glasses, wallets, gloves, and more.',
          ...thumb('Fashion Accessories Modeling'),
        },
        {
          title: 'Apparels Modeling',
          text: 'From everyday wear to high-fashion pieces, we create true-to-life 3D apparel models with accurate draping, fabric texture, and fit, helping brands visualize collections without physical samples.',
          ...thumb('Apparels Modeling'),
        },
        {
          title: 'Product Package Modeling',
          text: 'We design 3D packaging models that highlight branding, material, and structure with precision, giving marketing and design teams a realistic preview before mass production.',
          ...thumb('Product Package Modeling'),
        },
        {
          title: 'Electronic Products Modeling',
          text: 'Our 3D modelers replicate electronic products down to the smallest button and port, delivering assets ready for product visualization, technical documentation, and marketing campaigns.',
          ...thumb('Electronic Products Modeling'),
        },
      ],
      button: { label: 'Get A Free Quote', href: '/contact.html' },
    },
    {
      blockType: 'whyChoose',
      background: { src: '/img/working-vertical-bg.png', alt: '' },
      image: {
        src: '/img/3d-modeling/why-choose-us-2.png',
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
