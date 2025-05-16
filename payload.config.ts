import {
  Brands,
  Collaborations,
  Events,
  Media,
  Models,
  Orders,
  Products,
  Users,
  Wishlist
} from '@/collections'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { resendAdapter } from '@payloadcms/email-resend'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { en } from 'payload/i18n/en'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    importMap: { baseDir: path.resolve(dirname) }
  },
  async onInit(payload) {
    const existingUsers = await payload.find({
      collection: 'users',
      limit: 1
    })

    if (!existingUsers.docs.length) {
      await payload.create({
        collection: 'users',
        data: {
          email: process.env.PAYLOAD_ADMIN_USER_EMAIL || '',
          password: process.env.PAYLOAD_ADMIN_USER_PASSWORD || '',
          firstName: 'Admin',
          lastName: ' ',
          role: 'admin',
          _verified: true
        }
      })
    }
  },
  secret: process.env.PAYLOAD_SECRET || '',
  collections: [Users, Products, Orders, Events, Brands, Models, Collaborations, Wishlist, Media],
  db: postgresAdapter({
    idType: 'uuid',
    pool: {
      connectionString: process.env.DATABASE_URL || ''
    }
  }),
  plugins: process.env.BLOB_READ_WRITE_TOKEN
    ? [
        vercelBlobStorage({
          collections: {
            [Media.slug]: true
          },
          token: process.env.BLOB_READ_WRITE_TOKEN || ''
        })
      ]
    : [],
  email: resendAdapter({
    defaultFromAddress: `${process.env.EMAIL_FROM_ADDRESS}`,
    defaultFromName: 'Sneakers.',
    apiKey: process.env.RESEND_SECRET || ''
  }),
  editor: lexicalEditor(),
  typescript: {
    outputFile: path.resolve(dirname, 'src/types/payload.ts')
  },
  i18n: {
    supportedLanguages: { en }
  },
  sharp
})
