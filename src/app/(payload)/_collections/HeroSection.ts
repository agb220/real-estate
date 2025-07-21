import { Block } from 'payload'

const HeroSection: Block = {
  slug: 'hero-section',
  imageURL: '/admin-blocks/hero-section-exmp.png',
  interfaceName: 'IHeroSection',
  fields: [
    {
      type: 'upload',
      relationTo: 'media',
      name: 'mainImage',
      required: true,
      label: {
        en: 'Main image',
      },
    },
    {
      type: 'text',
      name: 'title',
      required: true,
      label: {
        en: 'Title',
      },
    },
    {
      type: 'text',
      name: 'description',
      required: true,
      label: {
        en: 'Description',
      },
    },
  ],
}

export default HeroSection
