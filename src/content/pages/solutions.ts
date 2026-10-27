import { ctaContact, industryItems, testimonialsBlock, whyChooseFeatures } from '@/content/shared'
import type { SitePage } from '@/site/types'

// Live URL: https://professional3dservices.com/solutions.html
export const solutions: SitePage = {
  path: 'solutions.html',
  meta: {
    title: 'Solutions - ThePro3DStudio',
    description:
      'We at ThePro3DStudio provide the best 3D solutions like a 360-degree viewer, a 3D product configurator, web-enabled AR, product analytics, and more at affordable prices.',
    // The live page is noindex, nofollow; kept as-is until the team decides to index it
    index: false,
  },
  layout: [
    {
      blockType: 'hero',
      background: { src: '/img/banner/solution-bg.png', alt: '', width: 1920, height: 1020 },
      title: '360 DEGREE <br/>VIEWER',
      description:
        'Experience <strong>best-in-class</strong>, <strong>affordable</strong>, and best quality 3D modeling solutions.',
      primaryButton: { label: 'Launch Experience', href: '/contact.html' },
      secondaryButton: { label: 'SEE CASE STUDIES', href: '/case-studies.html' },
    },
    {
      blockType: 'solutionsIntro',
      image: {
        src: '/img/solution-intro.png',
        alt: 'Teal velvet armchair shown in the 360-degree product viewer',
        width: 678,
        height: 550,
      },
      breadcrumb: [{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions.html' }, { label: '360 Degree Viewer' }],
      title:
        'Offer A Deeply Engaging Viewing Experience To Your Customers With Our 360-Degree Product Viewer, Allowing Them To View The Product From Every Angle, And Explore Its Details.',
      features: [
        '360° Interactive View',
        'Multi-Angle Product Views',
        'High-Resolution Product Imaging',
        'Mobile & Desktop Ready',
        'Smooth 360° Rotation',
        'Fast-Loading Experience',
        '360° Zoom & Pan',
        'Interactive Hotspots',
      ],
      stats: [
        { value: '300+', label: 'Pixels per inch' },
        { value: 'Up to 8K', label: 'Resolution renders' },
        { value: '60 FPS', label: 'Smooth Rotation' },
        { value: '100%', label: 'Responsive' },
        { value: '360°', label: 'Product Angles' },
        { value: '24/7', label: 'Interactive Access' },
      ],
    },
    {
      blockType: 'solutionsHighlights',
      eyebrow: { label: 'HIGHLIGHTS', href: '/contact.html' },
      title: 'Interactive high poly 3D renders',
      description:
        'Transform product browsing with an immersive 360° Product Viewer that lets customers explore every detail. Deliver smooth rotation, zoom, and interactive experiences across devices. Showcase products more effectively with a fast, engaging, and easy-to-integrate solution.',
      button: { label: 'Get A Free Quote', href: '/contact.html' },
      image: {
        src: '/img/solution-rhs.png',
        alt: 'Teal armchair rendered in a luxury marble interior',
        width: 870,
        height: 550,
      },
    },
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
    {
      blockType: 'techStack',
      badge: '360° Product Viewer',
      title: 'Technology Stack',
      description:
        'Transform product browsing with an immersive 360° Product Viewer that lets customers explore every detail. Deliver smooth rotation, zoom, and interactive experiences across devices.',
      button: { label: 'Try Free Demo', href: '/contact.html' },
      rows: [
        { title: 'Frontend', items: ['React.js', 'Next.js', 'TypeScript', 'HTML5', 'CSS3'] },
        { title: '360° Viewer', items: ['JavaScript', 'WebGL', 'Three.js', '360° Image Sequence'] },
        { title: '3D & Visualization', items: ['Three.js', 'WebGL', 'GLTF/GLB', '3D Models'] },
        { title: 'Image Processing', items: ['Python', 'OpenCV', 'ImageMagick', 'FFmpeg'] },
        { title: 'Backend / APIs', items: ['Node.js', 'Python', 'REST APIs'] },
        { title: 'Database', items: ['PostgreSQL', 'MySQL', 'MongoDB'] },
        { title: 'Cloud & Storage', items: ['AWS S3', 'CloudFront', 'Azure Blob Storage', 'CDN'] },
        { title: 'E-commerce Integration', items: ['Shopify', 'WooCommerce', 'Magento', 'Custom APIs'] },
      ],
    },
    {
      blockType: 'ctaHome',
      background: { src: '/img/cta-home.png', alt: '' },
      ...ctaContact,
      card: {
        image: { src: '/img/cta-rhs2.png', alt: 'Two people wearing VR headsets' },
        eyebrow: 'CONTACT US',
        description: "Great digital experiences begin with a conversation. Let's talk.",
      },
    },
    testimonialsBlock,
  ],
}
