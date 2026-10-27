import type { SitePage } from '@/site/types'

import { modeling } from './3d-modeling'
import { productModeling } from './3d-modeling-product'
import { about } from './about'
import { home } from './home'
import { fashionIndustry } from './industries-fashion'
import { solutions } from './solutions'

// Every page of the site. To add a page: create its content file in this folder
// and add it here. Once the CMS is connected, this list is replaced by a
// MongoDB query on the Pages collection.
export const pages: SitePage[] = [home, about, solutions, modeling, productModeling, fashionIndustry]

export const getPage = (path: string) => pages.find((page) => page.path === path)
