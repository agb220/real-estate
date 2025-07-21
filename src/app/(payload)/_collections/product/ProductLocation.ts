import { CollectionConfig } from 'payload'

const ProductLocation: CollectionConfig = {
  slug: 'locations',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: {
        en: 'City Name',
      },
    },
  ],
}

export default ProductLocation
