// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import path from 'path'
import { buildConfig, CollectionConfig, GlobalConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { s3Storage } from '@payloadcms/storage-s3'
import { Users } from './app/(payload)/_collections/Users'
import MainPage from './app/(payload)/_globals/MainPage'
import Media from './app/(payload)/_collections/Media'
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
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  cors: ['http://localhost:3000', 'https://real-estate-beta-flame.vercel.app'],
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    ...groupCollections('Other', [Users, Media]),
    ...groupCollections('Producs', [PropertyTypes, Product]),
    ...groupCollections('Reviews', [ReviewsCollection]),
  ],
  globals: [...groupGlobals('Pages', [MainPage])],
  editor: lexicalEditor(),
  defaultDepth: 3,
  maxDepth: 10,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || 'mongodb://127.0.0.1/real-estate',
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  plugins: [
    payloadCloudPlugin(),
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET as string,
      config: {
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY as string,
          secretAccessKey: process.env.S3_SECRET_KEY as string,
        },
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT,
      },
    }),
    // storage-adapter-placeholder
  ],
})
