import { Block, CollectionConfig, CollectionSlug } from 'payload'

export const ReviewsCollection: CollectionConfig = {
  slug: 'reviews',
  labels: {
    singular: {
      en: 'Review',
    },
    plural: {
      en: 'Reviews',
    },
  },
  admin: {
    useAsTitle: 'reviewerName',
  },
  fields: [
    {
      type: 'text',
      name: 'reviewerName',
      required: true,
      label: {
        en: 'Reviewer Name',
      },
    },
    {
      type: 'relationship',
      name: 'reviewProduct',
      relationTo: 'products',
      required: true,
      label: {
        en: 'Reviewed Product',
      },
    },
    {
      type: 'textarea',
      name: 'reviewMessage',
      required: true,
      label: {
        en: 'Review Message',
      },
    },
    {
      type: 'upload',
      relationTo: 'media',
      name: 'mainImage',
      label: {
        en: 'Reviewer image',
      },
    },
  ],
}

export const ReviewsBlock: Block = {
  slug: 'reviews',
  imageURL: '/admin-blocks/reviews.webp',
  interfaceName: 'IReviewsBlock',
  labels: {
    singular: {
      en: 'Reviews Block',
    },
    plural: {
      en: 'Reviews Blocks',
    },
  },
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
      name: 'reviews',
      required: true,
      hasMany: true,
      relationTo: 'reviews' as CollectionSlug,
      label: {
        en: 'Selected Reviews',
      },
    },
  ],
}
