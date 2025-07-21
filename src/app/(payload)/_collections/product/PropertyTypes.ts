import { CollectionConfig } from 'payload'

const PropertyTypes: CollectionConfig = {
  slug: 'property-types',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: {
        en: 'Type Name',
      },
    },
  ],
}

export default PropertyTypes
