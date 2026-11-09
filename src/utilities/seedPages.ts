import { getPayload } from 'payload'
import config from '../payload.config'
import { modeling } from '../content/pages/3d-modeling'
import { productModeling } from '../content/pages/3d-modeling-product'
import { about } from '../content/pages/about'
import { home } from '../content/pages/home'
import { solutions } from '../content/pages/solutions'
import { fashionIndustry } from '../content/pages/industries-fashion'
import { blogModelingChallenges } from '../content/pages/blog-3d-modeling-challenges'

async function seed() {
  console.log('--- Starting Hierarchical Seeder ---')
  const payload = await getPayload({ config })

  // 1. Seed Primary Service: 3D Modeling
  console.log('Seeding Primary Service: 3D Modeling...')
  let serviceDoc: any
  const existingService = await payload.find({
    collection: 'services',
    where: { slug: { equals: '3d-modeling' } },
  })

  const serviceData = {
    title: '3D Modeling Services',
    slug: '3d-modeling',
    path: '3d-modeling.html',
    shortDescription: 'Custom 3D modeling services for eCommerce, AR/VR, gaming, and real estate.',
    icon: 'fa-cube',
    layout: modeling.layout as any,
    meta: {
      title: modeling.meta.title,
      description: modeling.meta.description,
    },
    _status: 'published' as const,
  }

  if (existingService.totalDocs > 0) {
    serviceDoc = await payload.update({
      collection: 'services',
      id: existingService.docs[0].id,
      data: serviceData,
      draft: false,
      context: { disableRevalidate: true },
    })
    console.log(`✓ Updated Primary Service: 3D Modeling (ID: ${serviceDoc.id})`)
  } else {
    serviceDoc = await payload.create({
      collection: 'services',
      data: serviceData,
      draft: false,
      context: { disableRevalidate: true },
    })
    console.log(`✓ Created Primary Service: 3D Modeling (ID: ${serviceDoc.id})`)
  }

  // 2. Seed Subservice: 3D Product Modeling under 3D Modeling
  console.log('Seeding Subservice: 3D Product Modeling under 3D Modeling...')
  const existingSubservice = await payload.find({
    collection: 'subservices',
    where: { path: { equals: '3d-modeling/product.html' } },
  })

  const subserviceData = {
    title: '3D Product Modeling Services',
    parentService: serviceDoc.id,
    slug: 'product.html',
    path: '3d-modeling/product.html',
    shortDescription: 'High precision 3D product models for Amazon, eCommerce, and marketing.',
    icon: 'fa-box-open',
    layout: productModeling.layout as any,
    meta: {
      title: productModeling.meta.title,
      description: productModeling.meta.description,
    },
    _status: 'published' as const,
  }

  if (existingSubservice.totalDocs > 0) {
    const updatedSub = await payload.update({
      collection: 'subservices',
      id: existingSubservice.docs[0].id,
      data: subserviceData,
      draft: false,
      context: { disableRevalidate: true },
    })
    console.log(`✓ Updated Subservice: Product Modeling under 3D Modeling (ID: ${updatedSub.id})`)
  } else {
    const createdSub = await payload.create({
      collection: 'subservices',
      data: subserviceData,
      draft: false,
      context: { disableRevalidate: true },
    })
    console.log(`✓ Created Subservice: Product Modeling under 3D Modeling (ID: ${createdSub.id})`)
  }

  // 3. Seed Company Pages (Home, About, Solutions, Fashion, Blog)
  const companyPages = [
    { title: 'Home', slug: 'home', path: '', page: home },
    { title: 'About Us', slug: 'about', path: 'about.html', page: about },
    { title: 'Solutions', slug: 'solutions', path: 'solutions.html', page: solutions },
    { title: 'Fashion Industry', slug: 'fashion-industry', path: 'industries/fashion-industry.html', page: fashionIndustry },
    { title: '3D Modeling Challenges Blog', slug: 'blog-challenges', path: 'blog/3d-modeling-challenges-in-ar-vr-xr.html', page: blogModelingChallenges },
  ]

  for (const { title, slug, path, page } of companyPages) {
    const existing = await payload.find({
      collection: 'pages',
      where: { path: { equals: path } },
    })

    const pageData = {
      title,
      slug,
      path,
      layout: page.layout as any,
      meta: {
        title: page.meta.title,
        description: page.meta.description,
      },
      _status: 'published' as const,
    }

    if (existing.totalDocs > 0) {
      await payload.update({
        collection: 'pages',
        id: existing.docs[0].id,
        data: pageData,
        draft: false,
        context: { disableRevalidate: true },
      })
      console.log(`✓ Updated Company Page: ${title}`)
    } else {
      await payload.create({
        collection: 'pages',
        data: pageData,
        draft: false,
        context: { disableRevalidate: true },
      })
      console.log(`✓ Created Company Page: ${title}`)
    }
  }

  console.log('--- Hierarchical Seeder Complete ---')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seeding error:', err)
  process.exit(1)
})
