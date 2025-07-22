import type { GlobalConfig } from 'payload'
import HeroSection from '../_collections/HeroSection'
import TopOffers from '../_collections/TopOffers'

const MainPage: GlobalConfig = {
  slug: 'main-page',
  label: {
    en: 'Main Page',
  },

  fields: [
    {
      type: 'blocks',
      name: 'mainPage',
      blocks: [HeroSection, TopOffers],
      label: {
        en: 'Page sections',
      },
    },
  ],
}

export default MainPage
