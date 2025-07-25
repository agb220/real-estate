import type { GlobalConfig } from 'payload'
import HeroSection from '../_collections/HeroSection'
import TopOffers from '../_collections/TopOffers'
import { ReviewsBlock } from '../_collections/Reviews'

const MainPage: GlobalConfig = {
  slug: 'main-page',
  label: {
    en: 'Main Page',
  },

  fields: [
    {
      type: 'blocks',
      name: 'section',
      blocks: [HeroSection, TopOffers, ReviewsBlock],
      label: {
        en: 'Page sections',
      },
    },
  ],
}

export default MainPage
