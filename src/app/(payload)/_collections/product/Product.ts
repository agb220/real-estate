import { CollectionConfig, CollectionSlug } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

const Product: CollectionConfig = {
  slug: 'products',
  labels: {
    plural: {
      en: 'Products',
    },
    singular: {
      en: 'Product',
    },
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: { en: 'Title' },
    },
    {
      type: 'text',
      name: 'slug',
      required: true,
      unique: true,
      label: {
        en: 'Slug',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          interfaceName: 'ProductMain',
          label: {
            en: 'Main',
          },
          name: 'main',
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
              type: 'relationship',
              name: 'location',
              required: true,
              relationTo: 'locations',
              label: {
                en: 'Location',
              },
            },
            {
              type: 'relationship',
              name: 'type',
              required: true,
              relationTo: 'property-types',
              label: {
                en: 'Type',
              },
            },
            {
              type: 'upload',
              relationTo: 'media',
              name: 'mainImage',
              required: true,
              label: {
                en: 'Main Image',
              },
            },

            {
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
              name: 'images',
              required: true,
              label: {
                en: 'Images',
              },
            },
          ],
        },
        {
          interfaceName: 'ProductDetails',
          label: {
            en: 'Product Details',
          },
          name: 'productDetails',
          fields: [
            {
              type: 'richText',
              name: 'description',
              required: true,
              label: {
                en: 'Description',
              },
              editor: lexicalEditor(),
            },
            {
              type: 'group',
              name: 'prices',
              label: {
                en: 'Prices',
              },
              fields: [
                {
                  type: 'number',
                  name: 'fullPrice',
                  required: true,
                  label: {
                    en: 'fullPrice',
                  },
                },
                {
                  type: 'number',
                  name: 'Payment',
                  required: true,
                  label: {
                    en: 'Payment',
                  },
                },
              ],
            },
            {
              type: 'text',
              name: 'address',
              required: true,
              label: {
                en: 'Street (address)',
              },
            },
            {
              type: 'text',
              name: 'garages',
              required: true,
              label: {
                en: 'Garages',
              },
            },
            {
              type: 'text',
              name: 'roomNumbers',
              required: true,
              label: {
                en: 'Room Numbers',
              },
            },
            {
              type: 'text',
              name: 'usableArea',
              required: true,
              label: {
                en: 'Usable Area',
              },
            },
            {
              type: 'text',
              name: 'totalArea',
              required: true,
              label: {
                en: 'Total Area',
              },
            },
            {
              type: 'checkbox',
              name: 'insulatedObject',
              required: true,
              label: {
                en: 'Insulated object',
              },
            },
            {
              type: 'checkbox',
              name: 'balcony',
              required: true,
              label: {
                en: 'Balcony',
              },
            },
            {
              type: 'checkbox',
              name: 'terrace',
              required: true,
              label: {
                en: 'Terrace',
              },
            },
            {
              type: 'text',
              name: 'numberOfBathrooms',
              required: true,
              label: {
                en: 'Number of bathrooms',
              },
            },
            {
              type: 'text',
              name: 'mapLink',
              required: false,
              label: {
                en: 'Map Link (Google Maps Embed URL)',
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
        },
      ],
    },
  ],
}

export default Product
