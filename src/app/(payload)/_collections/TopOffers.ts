import { Block, CollectionSlug } from 'payload'

const TopOffers: Block = {
  slug: 'top-offers',
  imageURL: '/admin-blocks/top-offers.webp',
  interfaceName: 'ITopOffers',
  fields: [
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
    {
      type: 'relationship',
      name: 'relatedProducts',
      hasMany: true,
      relationTo: 'products' as CollectionSlug,
      label: {
        en: 'Related Products',
      },
    },
  ],
}

export default TopOffers
