import type { GlobalConfig } from 'payload'
import HeroSection from '../_collections/HeroSection'
import TopOffers from '../_collections/TopOffers'
import { ReviewsBlock } from '../_collections/Reviews'
import AboutUs from '../_collections/AboutUs'

const MainPage: GlobalConfig = {
  slug: 'main-page',
  label: {
    en: 'Main Page',
  },

  fields: [
    {
      type: 'blocks',
      name: 'section',
      blocks: [HeroSection, TopOffers, ReviewsBlock, AboutUs],
      label: {
        en: 'Page sections',
      },
    },
  ],
}

export default MainPage
