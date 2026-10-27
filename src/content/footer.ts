import type { FooterData } from '@/site/types'

// Footer global. Placeholder copy (lorem ipsum, phone, address) is as in the
// design and is replaced when the real content is entered in the CMS.
export const footer: FooterData = {
  logo: { src: '/img/logo-white.png', alt: 'ThePro3DStudio Logo', height: 34 },
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tellus fringilla nulla imperdiet consectetur.',
  badges: [
    { src: '/img/iso-2022.png', alt: 'ISO 27001:2022 Certified' },
    { src: '/img/iso-2015.png', alt: 'ISO 9001:2015 Certified' },
  ],
  linkColumns: [
    {
      label: 'Company',
      links: [
        { label: 'Services', href: '/services.html' },
        { label: 'Solutions', href: '/solutions.html' },
        { label: 'Industries', href: '/industries.html' },
        { label: 'Careers', href: '/careers.html' },
        { label: 'Sitemap', href: '/sitemap.html' },
      ],
    },
    {
      label: 'Resources',
      links: [
        { label: 'Testimonials', href: '/testimonials.html' },
        { label: 'FAQs', href: '/faqs.html' },
        { label: 'Customers', href: '/our-clients.html' },
        { label: 'News & Events', href: '/news-events.html' },
        { label: 'Case Studies', href: '/case-studies.html' },
      ],
    },
  ],
  contact: {
    phone: { label: '+212 - 555-7398', href: 'tel:+2125557398' },
    email: { label: 'hello@thepro3dstudio.com', href: 'mailto:hello@thepro3dstudio.com' },
    hours: 'Monday – Saturday<br><strong>9am - 5pm</strong>',
    address: '245 Fifth Avenue, Suite 1800<br>New York, NY 10016, USA',
  },
  social: [
    { label: 'Twitter', href: 'https://x.com/thepro3dstudio', icon: 'fa-x-twitter' },
    { label: 'Facebook', href: 'https://www.facebook.com/thepro3dcompany', icon: 'fa-facebook-f' },
    { label: 'Linkedin', href: 'https://www.linkedin.com/company/thepro3dstudio', icon: 'fa-linkedin-in' },
    { label: 'Instagram', href: 'https://www.instagram.com/thepro3dstudio/', icon: 'fa-instagram' },
    { label: 'Youtube', href: 'https://www.youtube.com/@thepro3dstudio', icon: 'fa-youtube' },
  ],
  bottomNav: [
    { label: 'HOME', href: '/' },
    { label: 'ABOUT US', href: '/about.html' },
    { label: 'PORTFOLIO', href: '/portfolio.html' },
    { label: 'BLOG', href: '/blog.html' },
    { label: 'CONTACT', href: '/contact.html' },
  ],
  legal: {
    text: 'Complete content including text and visuals in this website are copyrighted. Without prior consent from ThePro3DStudio, the information cannot be used by visitors in any manner.',
    links: [
      { label: 'Privacy policy', href: '/privacy-policy.html' },
      { label: 'Terms of use', href: '/terms-of-use.html' },
    ],
    copyright: 'Copyright © 2026 ThePro3DStudio. All rights reserved.',
    since: '[ Since 2010 ]',
  },
}
