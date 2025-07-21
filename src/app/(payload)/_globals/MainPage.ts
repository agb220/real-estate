import type { GlobalConfig } from 'payload'
import HeroSection from '../_collections/HeroSection'
import ProductLocation from '../_collections/product/ProductLocation'

const MainPage: GlobalConfig = {
  slug: 'main-page',
  label: {
    en: 'Main Page',
  },

  fields: [
    {
      type: 'blocks',
      name: 'mainPage',
      blocks: [HeroSection],
      label: {
        en: 'Page sections',
      },
    },
  ],
}

export default MainPage
