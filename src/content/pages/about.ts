import {
  clientLogos,
  ctaContact,
  industryItems,
  ourApproachBlock,
  testimonialsBlock,
} from '@/content/shared'
import type { SitePage } from '@/site/types'

const INTRO_TEXT =
  'As a top 3D model design company, we have the support of skilled 3D modelers who can use the latest technology to create digital models and prototypes. High-detail models are used by various industries, including manufacturing, retail, eCommerce, architecture, advertising, and filmmaking.'

const POINT_TEXT = 'Aenean tempor gravida ex, sed volutpat mi suscipit vitae. Ut porta lorem erat, eu faucibus mi semper sodales.'

// Live URL: https://professional3dservices.com/about.html
export const about: SitePage = {
  path: 'about.html',
  meta: {
    title: 'About us | ThePro3DStudio',
    description:
      'ThePro3DStudio is among the best 3D designing companies offering apex quality 3D visuals for global clients. Reach us for more details.',
    keywords:
      'professional 3D services, 3D design company, 3D modeling services, 3D rendering services, outsource 3D animation, virtual services, 3D service provider, affordable 3D services',
    image: '/img/logo-white.png',
  },
  layout: [
    {
      blockType: 'hero',
      background: { src: '/img/banner/about-home.png', alt: '', width: 1920, height: 1020 },
      title: 'PROFESSIONAL <br>3D SOLUTIONS',
      description:
        'Experience <strong>best-in-class</strong>, <strong>affordable</strong>, and best quality 3D modeling solutions.',
      primaryButton: { label: 'Launch Experience', href: '/contact.html' },
      secondaryButton: { label: 'SEE CASE STUDIES', href: '/case-studies.html' },
    },
    {
      blockType: 'servicesIntro',
      image: { src: '/img/about-intro.png', alt: '3D furniture modeling render', width: 400, height: 550 },
      breadcrumb: [{ label: 'Home', href: '/' }, { label: 'Services', href: '/3d-modeling.html' }, { label: '3D Modeling Services' }],
      title: 'ThePro3DStudio Provides Custom 3D Modeling Services That Help Transform Ideas.',
      paragraphs: [INTRO_TEXT, INTRO_TEXT],
      stats: [
        { value: '17000', suffix: '+', label: '3D Assets' },
        { value: '$17.5m', suffix: '+', label: 'Revenue Boosted' },
        { value: '15', suffix: '+', label: 'Industries Served' },
        { value: '20', suffix: '+', unit: 'Yrs', label: 'Industry  Experience' },
      ],
      missionVision: {
        mission:
          'Our mission is to offer our clients original, unique & stunning 3D designs while ensuring matchless quality and complete adherence to specifications.',
        vision:
          'Our vision is to grow as the preferred 3D design studio in the market, leveraging our creative and business acumen all the while expanding our services across the globe.',
      },
      clientLogos,
    },
    {
      blockType: 'verticals',
      eyebrow: { label: 'WORKING VERTICALS', href: '/portfolio.html' },
      title: 'Industries We Specialized in',
      background: { src: '/img/working-vertical-bg.png', alt: '' },
      items: industryItems,
    },
    {
      blockType: 'highlights',
      eyebrow: { label: 'HIGHLIGHTS', href: '/contact.html' },
      title: 'Why Choose<br>ThePro3DStudio?',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam egestas convallis consectetur. Etiam elementum nulla nec mauris tincidunt, in dictum nulla maximus. Praesent eros nisl, hendrerit ac mattis sed, dapibus ac magna.',
      cards: [
        ['top-notch-experience', 'Top Notch Experience', 'We have incredible experience in all spectrums of 3D designs. This experience is visible in the approaches that we take for every project that we execute. This ensures the delivery of top-quality deliverables.'],
        ['superior-technical-expertise', 'Superior technical expertise', 'Our growing technological skill forte is the direct result of the learning experiences we imbibe, and we are constantly driven by our expertise in delivering the most valuable and outstanding 3D design services.'],
        ['impeccably-creative-talent', 'Impeccably creative talent', 'We are fortified with the most creative and professional 3D artists to offer the best-in-class design services to all our clients. Our creative talent is what persistently transforms us into one of the best 3D firms in the town.'],
        ['custom-service-propositions', 'Custom service propositions', 'We have always operated to meet the requirements of the clients at all times and all our services are custom-made to provide exactly what the clients need, meeting even the most pressing requirements unfailingly.'],
        ['effective-customer-support', 'Effective customer support', 'We understand that most of our clients will have a trove of questions regarding the services we deliver, the progress of the project, and the benefits we offer. In order to effectively meet this, we have a dedicated customer support wing.'],
        ['advanced-infrastructure', 'Advanced infrastructure', 'Having implemented some of the most advanced and cutting-edge technology platforms in the realm of 3D design, we know how to leverage the opportunities and possibilities of technological infrastructure to support our clients.'],
        ['economic-services', 'Economic services', "Even though we have the reputation of being one of the best providers of 3D design solutions, we handle all types of projects, regardless of it's size or difficulty, at the most affordable price."],
        ['collaborative-project-ecosystem', 'Collaborative project ecosystem', 'We work closely with our clients as their business partners to create the best 3D designs, and as such, we work closely with them in a collaborative project ecosystem.'],
      ].map(([icon, title, description]) => ({
        icon: { src: `/img/icon/${icon}.png`, alt: '' },
        title: title!,
        description: description!,
      })),
    },
    ourApproachBlock,
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
    {
      blockType: 'mapsystemsIntro',
      image: { src: '/img/maps-building.png', alt: 'MAPSystems headquarters building at dusk', width: 678, height: 510 },
      title:
        'ThePro3DStudio is a world-class 3D design studio owned by MAPSystems that focuses primarily on high-end 3D designs and visualizations for a diverse range of industries across the world.',
      description:
        'With 20+ years of legacy, MAPSystems is a globally acclaimed creative and technology solutions provider having a robust clientele worldwide. It is an ISO 27001 certified agency backed by a team of extremely talented, skilled, and committed professionals who deliver the utmost quality. Headquartered in Bengaluru, India and having functional branches in all the leading countries, MAPSystems also possesses a well-planned infrastructure that adheres to global standards.',
      points: [
        { title: 'Trusted by 600+ Global Clientele', description: POINT_TEXT },
        { title: '350+ Experts on-board', description: POINT_TEXT },
      ],
    },
    testimonialsBlock,
  ],
}
