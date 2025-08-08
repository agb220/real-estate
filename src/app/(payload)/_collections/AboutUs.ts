import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

const AboutUs: Block = {
  slug: 'about-us',
  imageURL: '/admin-blocks/about-us.webp',
  interfaceName: 'IAboutUs',
  fields: [
    {
      type: 'upload',
      relationTo: 'media',
      name: 'mainImage',
      required: true,
      label: {
        en: 'Image',
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
      type: 'richText',
      name: 'description',
      label: {
        en: 'Description',
      },
      editor: lexicalEditor(),
    },
  ],
}

export default AboutUs
