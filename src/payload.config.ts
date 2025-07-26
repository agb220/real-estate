// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import path from 'path'
import { buildConfig, CollectionConfig, GlobalConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { Users } from './collections/Users'
import MainPage from './app/(payload)/_globals/MainPage'
import Media from './collections/Media'
import ProductLocation from './app/(payload)/_collections/product/ProductLocation'
import PropertyTypes from './app/(payload)/_collections/product/PropertyTypes'
import Product from './app/(payload)/_collections/product/Product'
import { ReviewsCollection } from './app/(payload)/_collections/Reviews'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const groupGlobals = (group: string, globals: GlobalConfig[]): GlobalConfig[] => {
  return globals.map((collection) => {
    return {
      ...collection,
      admin: {
        ...collection.admin,
        group,
      },
    }
  })
}

const groupCollections = (group: string, collections: CollectionConfig[]): CollectionConfig[] => {
  return collections.map((collection) => {
    return {
      ...collection,
      admin: {
        ...collection.admin,
        group,
      },
    }
  })
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    ...groupCollections('Other', [Users, Media]),
    ...groupCollections('Product', [ProductLocation, PropertyTypes, Product]),
    ...groupCollections('Reviews', [ReviewsCollection]),
  ],
  globals: [...groupGlobals('Pages', [MainPage])],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
