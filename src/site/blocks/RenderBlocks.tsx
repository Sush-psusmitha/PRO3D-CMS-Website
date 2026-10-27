import React from 'react'

import type { PageBlock } from '@/site/types'

import { AboutIntro } from './AboutIntro'
import { BlogDetail } from './BlogDetail'
import { CtaHome } from './CtaHome'
import { Faq } from './Faq'
import { Hero } from './Hero'
import { Highlights } from './Highlights'
import { IndustriesWhyChoose } from './IndustriesWhyChoose'
import { LatestBlogs } from './LatestBlogs'
import { MapsystemsIntro } from './MapsystemsIntro'
import { OurApproach } from './OurApproach'
import { PortfolioCarousel } from './PortfolioCarousel'
import { ServiceCards } from './ServiceCards'
import { ServiceSuccessStories } from './ServiceSuccessStories'
import { ServicesContact } from './ServicesContact'
import { ServicesGrid } from './ServicesGrid'
import { ServicesIntro } from './ServicesIntro'
import { SolutionsHighlights } from './SolutionsHighlights'
import { SolutionsIntro } from './SolutionsIntro'
import { SubserviceList } from './SubserviceList'
import { SuccessStories } from './SuccessStories'
import { TechStack } from './TechStack'
import { Testimonials } from './Testimonials'
import { Verticals } from './Verticals'
import { WhyChoose } from './WhyChoose'

/** Picks the component for each block in a page's `layout` list, in order. */
export function RenderBlocks({ blocks }: { blocks: PageBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.blockType) {
          case 'blogDetail':
            return <BlogDetail key={i} {...block} />
          case 'hero':
            return <Hero key={i} {...block} />
          case 'aboutIntro':
            return <AboutIntro key={i} {...block} />
          case 'servicesGrid':
            return <ServicesGrid key={i} {...block} />
          case 'verticals':
            return <Verticals key={i} {...block} />
          case 'successStories':
            return <SuccessStories key={i} {...block} />
          case 'portfolioCarousel':
            return <PortfolioCarousel key={i} {...block} />
          case 'testimonials':
            return <Testimonials key={i} {...block} />
          case 'ctaHome':
            return <CtaHome key={i} {...block} />
          case 'latestBlogs':
            return <LatestBlogs key={i} {...block} />
          case 'servicesIntro':
            return <ServicesIntro key={i} {...block} />
          case 'subserviceList':
            return <SubserviceList key={i} {...block} />
          case 'whyChoose':
            return <WhyChoose key={i} {...block} />
          case 'serviceSuccessStories':
            return <ServiceSuccessStories key={i} {...block} />
          case 'faq':
            return <Faq key={i} {...block} />
          case 'servicesContact':
            return <ServicesContact key={i} {...block} />
          case 'serviceCards':
            return <ServiceCards key={i} {...block} />
          case 'solutionsIntro':
            return <SolutionsIntro key={i} {...block} />
          case 'solutionsHighlights':
            return <SolutionsHighlights key={i} {...block} />
          case 'industriesWhyChoose':
            return <IndustriesWhyChoose key={i} {...block} />
          case 'techStack':
            return <TechStack key={i} {...block} />
          case 'highlights':
            return <Highlights key={i} {...block} />
          case 'ourApproach':
            return <OurApproach key={i} {...block} />
          case 'mapsystemsIntro':
            return <MapsystemsIntro key={i} {...block} />
          default:
            return null
        }
      })}
    </>
  )
}
