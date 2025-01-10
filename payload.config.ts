import {
  Brands,
  Collections,
  Events,
  Media,
  Models,
  Orders,
  Products,
  Users
} from '@/collections'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import nodemailer from 'nodemailer'
import path from 'path'
import { buildConfig } from 'payload'
import { en } from 'payload/i18n/en'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    importMap: { baseDir: path.resolve(dirname), },
  },
  secret: process.env.PAYLOAD_SECRET || '',
  collections: [Users, Products, Orders, Events, Brands, Models, Collections, Media],
  db: postgresAdapter({
    idType: 'uuid',
    pool: {
      connectionString: process.env.POSTGRES_URL || ''
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
  email: nodemailerAdapter({
    defaultFromAddress: `${process.env.EMAIL_FROM_ADDRESS}`,
    defaultFromName: 'Sneakers.',
    transport: nodemailer.createTransport({
      host: 'smtp.resend.com',
      secure: true,
      port: 465,
      auth: {
        user: 'resend',
        pass: process.env.RESEND_SECRET
      }
    }),
    skipVerify: true
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
