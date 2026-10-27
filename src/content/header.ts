import type { HeaderData } from '@/site/types'

// Header global. Links use the live URLs (see docs/url-map.md): where the new
// design used a renamed file, the live URL is kept.
export const header: HeaderData = {
  logo: { light: '/img/logo-white.png', dark: '/img/logo-black.png', alt: 'ThePro3DStudio Logo' },
  cta: { label: 'Get Started', href: '/contact.html' },
  search: {
    placeholder: 'Search services, solutions, portfolio...',
    quickLinks: [
      { label: '3D Product Rendering', href: '/3d-rendering/product.html' },
      { label: 'Architectural Rendering', href: '/3d-rendering/architectural.html' },
      { label: '3D Modeling', href: '/3d-modeling.html' },
      { label: 'Floor Plans', href: '/floor-plan-design.html' },
      { label: 'AR Models', href: '/3d-modeling-for-ar.html' },
    ],
  },
  nav: [
    {
      label: '3D Visualization',
      href: '/3d-rendering.html',
      megaMenu: {
        layout: 'columns',
        columns: [
          {
            title: '3D MODELING',
            titleHref: '/3d-modeling.html',
            description:
              'Custom 3D modeling services that help transform ideas into three-dimensional representations.',
            links: [
              { label: 'Product Modeling', href: '/3d-modeling/product.html', icon: 'fa-cube' },
              { label: 'Architectural Modeling', href: '/3d-modeling/architectural.html', icon: 'fa-building-columns' },
              { label: 'Furniture Modeling', href: '/3d-modeling/furniture.html', icon: 'fa-couch' },
              { label: 'Industrial & Engineering Modeling', href: '/3d-modeling/industrial.html', icon: 'fa-gear' },
              { label: 'Automotive 3D Modeling', href: '/3d-modeling/automotive.html', icon: 'fa-car' },
              { label: 'Fashion 3D Modeling', href: '/3d-modeling/fashion.html', icon: 'fa-shirt' },
              { label: 'Environment & Asset Modeling', href: '/3d-modeling/environment.html', icon: 'fa-mountain-sun' },
              { label: 'AR/VR & Real-Time 3D Modeling', href: '/3d-modeling-for-ar.html', icon: 'fa-vr-cardboard' },
              { label: '3D Sculpting & Print-Ready Modeling', href: '/3d-print-designs.html', icon: 'fa-wand-magic-sparkles' },
              { label: '3D Game Assets Modeling', href: '/3d-modeling/game-assets.html', icon: 'fa-gamepad' },
            ],
          },
          {
            title: '3D RENDERING & TEXTURING',
            description:
              'Creating photorealistic 3D visuals and immersive renders that bring concepts and products to life.',
            links: [
              { label: 'Product Rendering', href: '/3d-rendering/product.html', icon: 'fa-box-open' },
              { label: 'Architectural Rendering', href: '/3d-rendering/architectural.html', icon: 'fa-building' },
              { label: 'Furniture Rendering', href: '/3d-rendering/furniture.html', icon: 'fa-couch' },
              { label: 'Interior Rendering', href: '/3d-rendering/architectural/interior.html', icon: 'fa-door-open' },
              { label: 'Exterior Rendering', href: '/3d-rendering/architectural/exterior.html', icon: 'fa-house-chimney' },
              { label: 'Automotive Rendering', href: '/3d-rendering/automotive.html', icon: 'fa-car-side' },
              { label: 'Lifestyle Rendering', href: '/3d-rendering/lifestyle.html', icon: 'fa-martini-glass-citrus' },
              { label: 'Fashion Rendering', href: '/3d-rendering/fashion.html', icon: 'fa-vest-patches' },
              { label: '360° Floorplan Rendering', href: '/floor-plan-design.html', icon: 'fa-draw-polygon' },
              { label: '3D Walkthrough Rendering', href: '/3d-rendering/architectural/walkthrough.html', icon: 'fa-person-walking-arrow-right' },
            ],
          },
          {
            title: '3D ANIMATION & CGI',
            description:
              'Bringing ideas to life through 3D animations that engage, explain, and captivate audiences.',
            links: [
              { label: 'Logo & Brand Animation', href: '/3d-animation/logo.html', icon: 'fa-circle-notch' },
              { label: '3D Simulation Animation', href: '/3d-animation/simulation.html', icon: 'fa-atom' },
              { label: 'Product Animation', href: '/3d-animation/product.html', icon: 'fa-shoe-prints' },
              { label: 'Character Animation', href: '/3d-animation/character.html', icon: 'fa-person-running' },
              { label: 'Motion Graphics', href: '/3d-animation/motion-graphics.html', icon: 'fa-bezier-curve' },
              { label: 'Industrial Animation', href: '/3d-animation/industrial.html', icon: 'fa-industry' },
              { label: 'Medical & Scientific Animation', href: '/3d-animation/medical.html', icon: 'fa-heart-pulse' },
              { label: 'VFX & Cinematic Animation', href: '/3d-animation/vfx.html', icon: 'fa-clapperboard' },
              { label: 'Game & Interactive Animation', href: '/3d-animation/game.html', icon: 'fa-gamepad' },
              { label: 'Architectural Animation', href: '/3d-animation/architectural.html', icon: 'fa-city' },
            ],
          },
        ],
        cta: {
          variant: 'card',
          image: { src: '/img/cta-3d-visualization-img.png', alt: '3D Visual Experience' },
          title: '<span class="mega-title-gradient">Ready to level-up</span> your<br>3D Visual Experience?',
          description:
            'Create sophisticated visuals that make your ideas impossible to overlook, while elevating your brand, engaging audiences, and leaving a lasting impression.',
          button: { label: 'Get a free quote', href: '/contact.html' },
        },
      },
      mobileLinks: [
        { label: 'Product Modeling', href: '/3d-modeling/product.html', icon: 'fa-cube' },
        { label: 'Architectural Modeling', href: '/3d-modeling/architectural.html', icon: 'fa-building-columns' },
        { label: 'Furniture Modeling', href: '/3d-modeling/furniture.html', icon: 'fa-couch' },
        { label: 'Product Rendering', href: '/3d-rendering/product.html', icon: 'fa-box-open' },
        { label: 'Architectural Rendering', href: '/3d-rendering/architectural.html', icon: 'fa-building' },
        { label: '360° Floorplan Rendering', href: '/floor-plan-design.html', icon: 'fa-draw-polygon' },
        { label: '3D Walkthrough', href: '/3d-rendering/architectural/walkthrough.html', icon: 'fa-person-walking-arrow-right' },
        { label: '3D Animation & CGI', href: '/3d-animation/logo.html', icon: 'fa-circle-notch' },
      ],
    },
    {
      label: '3D Solutions',
      href: '/solutions.html',
      megaMenu: {
        layout: 'features',
        style: 'solution',
        columns: [
          [
            {
              label: '360-Degree Viewer',
              href: '/interactive-product-360-view.html',
              icon: 'fa-arrows-spin',
              description: 'Custom 3D modeling services that help transform ideas into three-dimensional representations.',
            },
            {
              label: 'CMS',
              href: '/cms.html',
              icon: 'fa-sliders',
              description: 'Custom 3D modeling services that help transform ideas into three-dimensional representations.',
            },
            {
              label: 'Web-Enabled AR',
              href: '/web-enabled-ar.html',
              icon: 'fa-cubes',
              description: 'Custom 3D modeling services that help transform ideas into three-dimensional representations.',
            },
          ],
          [
            {
              label: '3D Product Configurator',
              href: '/3d-product-configurator.html',
              icon: 'fa-cube',
              description: 'Custom 3D modeling services that help transform ideas into three-dimensional representations.',
            },
            {
              label: 'Product Analytics',
              href: '/product-analytics.html',
              icon: 'fa-chart-pie',
              description: 'Custom 3D modeling services that help transform ideas into three-dimensional representations.',
            },
          ],
        ],
        cta: {
          variant: 'horizontal',
          image: { src: '/img/cta-3d-solution.png', alt: 'Select, Configure, and Deploy 3D Models' },
          title:
            'Select, <span class="mega-title-gradient">Configure, and Deploy</span> a versatile library of high-quality 3D models',
          description:
            'Select the right 3D models, customize them to your specific requirements, and deploy them seamlessly across platforms and applications. Streamline your 3D workflow with flexible, ready-to-use solutions that improve efficiency, consistency, and creative possibilities.',
          button: { label: 'Get a free quote', href: '/contact.html' },
        },
      },
      mobileLinks: [
        { label: '360-Degree Viewer', href: '/interactive-product-360-view.html', icon: 'fa-arrows-spin' },
        { label: '3D Product Configurator', href: '/3d-product-configurator.html', icon: 'fa-cube' },
        { label: 'CMS', href: '/cms.html', icon: 'fa-sliders' },
        { label: 'Product Analytics', href: '/product-analytics.html', icon: 'fa-chart-pie' },
        { label: 'Web-Enabled AR', href: '/web-enabled-ar.html', icon: 'fa-cubes' },
      ],
    },
    {
      label: 'Working Verticals',
      href: '/portfolio.html',
      megaMenu: {
        layout: 'features',
        style: 'vertical',
        columns: [
          [
            { label: 'Architecture & Real Estate', href: '/portfolio.html#architecture', icon: 'fa-building', description: 'Visualize buildings, properties, and spaces realistically.' },
            { label: 'Product & Consumer Goods', href: '/portfolio.html#product-goods', icon: 'fa-box', description: 'Showcase products through detailed, photorealistic 3D visuals.' },
            { label: 'Automotive & Transportation', href: '/portfolio.html#automotive', icon: 'fa-car', description: 'Visualize vehicles, components, and transportation concepts effectively.' },
          ],
          [
            { label: 'Construction & Infrastructure', href: '/portfolio.html#construction', icon: 'fa-helmet-safety', description: 'Present complex structures, projects, and engineering concepts.' },
            { label: 'Gaming & Entertainment', href: '/portfolio.html#gaming', icon: 'fa-gamepad', description: 'Create immersive characters, environments, assets, and experiences.' },
            { label: 'Furniture & Interior Design', href: '/portfolio.html#furniture', icon: 'fa-couch', description: 'Showcase furniture and interiors through stunning 3D visuals.' },
          ],
          [
            { label: 'Retail & E-commerce', href: '/portfolio.html#ecommerce', icon: 'fa-bag-shopping', description: 'Enhance product presentation with interactive, realistic 3D experiences.' },
            { label: 'Advertising & Marketing', href: '/portfolio.html#advertising', icon: 'fa-bullhorn', description: 'Create compelling 3D visuals that strengthen brand communication.' },
            { label: 'Fashion & Apparel', href: '/portfolio.html#fashion', icon: 'fa-person-dress', description: 'Develop realistic 3D garments, products, and fashion experiences.' },
          ],
        ],
        cta: {
          variant: 'poster',
          image: { src: '/img/working-vertical-cta-menu.png', alt: 'Solutions that Scale Across Industries' },
          title: 'Solutions that Scalable<br>Across Industries',
          button: { label: 'Get a free quote', href: '/contact.html' },
        },
      },
      mobileLinks: [
        { label: 'Architecture & Real Estate', href: '/portfolio.html#architecture', icon: 'fa-building' },
        { label: 'Product & Consumer Goods', href: '/portfolio.html#product-goods', icon: 'fa-box' },
        { label: 'Automotive & Transportation', href: '/portfolio.html#automotive', icon: 'fa-car' },
        { label: 'Construction & Infrastructure', href: '/portfolio.html#construction', icon: 'fa-helmet-safety' },
        { label: 'Gaming & Entertainment', href: '/portfolio.html#gaming', icon: 'fa-gamepad' },
        { label: 'Furniture & Interior Design', href: '/portfolio.html#furniture', icon: 'fa-couch' },
        { label: 'Retail & E-commerce', href: '/portfolio.html#ecommerce', icon: 'fa-bag-shopping' },
        { label: 'Advertising & Marketing', href: '/portfolio.html#advertising', icon: 'fa-bullhorn' },
        { label: 'Fashion & Apparel', href: '/portfolio.html#fashion', icon: 'fa-person-dress' },
      ],
    },
    { label: 'Customers', href: '/our-clients.html' },
    {
      label: 'Resources',
      href: '#',
      megaMenu: {
        layout: 'features',
        style: 'solution',
        columns: [
          [
            { label: 'News & Events', href: '/blog.html#news', icon: 'fa-bullhorn', description: 'Stay updated with the latest industry trends, events, and announcements.' },
            { label: '3D Assets Gallery & Portfolio', href: '/portfolio.html', icon: 'fa-images', description: 'Discover high-quality 3D assets, creative work, and project showcases.' },
            { label: 'About Us & Company Culture', href: '/about.html', icon: 'fa-circle-info', description: 'Learn about our journey, expertise, values, and creative culture.' },
          ],
          [
            { label: 'Blogs & Articles', href: '/blog.html', icon: 'fa-newspaper', description: 'Explore expert insights, trends, tips, and ideas across 3D modeling industry.' },
            { label: 'Case Studies', href: '/case-studies.html', icon: 'fa-chart-line', description: 'Explore real-world projects, challenges, solutions, and successful outcomes.' },
            { label: 'Testimonials', href: '/about.html#testimonials', icon: 'fa-comment-dots', description: 'Hear from clients about their experiences, partnerships, and results.' },
          ],
        ],
        cta: {
          variant: 'horizontal',
          extraClass: 'resources-cta-col',
          image: { src: '/img/cta-3d-solution.png', alt: 'Explore Insights, Guides, and Resources' },
          title:
            'Explore <span class="mega-title-gradient">insights, guides, and resources</span> to stay ahead in the world of 3D.',
          description:
            'Explore expert insights, industry trends, and the latest in 3D technology through practical guides, tips, and valuable knowledge. Discover resources covering visualization, animation, and immersive experiences to stay informed, get inspired, and bring your next 3D vision to life.',
          button: { label: 'Explore Insights', href: '/blog.html' },
        },
      },
      mobileLinks: [
        { label: 'News & Events', href: '/blog.html#news', icon: 'fa-bullhorn' },
        { label: '3D Assets Gallery & Portfolio', href: '/portfolio.html', icon: 'fa-images' },
        { label: 'About Us & Company Culture', href: '/about.html', icon: 'fa-circle-info' },
        { label: 'Blogs & Articles', href: '/blog.html', icon: 'fa-newspaper' },
        { label: 'Case Studies', href: '/case-studies.html', icon: 'fa-chart-line' },
        { label: 'Testimonials', href: '/about.html#testimonials', icon: 'fa-comment-dots' },
      ],
    },
  ],
}
