import routes from '@/lib/routes'
import { User } from '@/types/payload'
import { CollectionConfig } from 'payload'

const isAdmin = (user: User) => user.role === 'admin'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'User',
    plural: 'Users'
  },
  auth: {
    maxLoginAttempts: 0,
    verify: {
      // Replace this with a React Email template
      // Add a subject by using generateEmailSubject
      generateEmailHTML: ({ token }) => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/${routes.auth.verify}?token=${token}`
        return `<a href='${url}'>Verify your account</a>`
      }
    },
    forgotPassword: {
      // Replace this with a React Email template
      // Add a subject by using generateEmailSubject
      // Add an expiration to configure how long password reset tokens remain valid, specified in miliseconds.
      expiration: 3600000, // 1 hour
      generateEmailHTML: args => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/${routes.auth.reset}?token=${args?.token}`
        return `<a href='${url}'>Reset your password</a>`
      }
    }
  },
  access: {
    create: ({ req: { user } }) => isAdmin(user!),
    update: ({ req: { user } }) => isAdmin(user!),
    delete: ({ req: { user } }) => isAdmin(user!)
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true
    },
    {
      name: 'lastName',
      type: 'text',
      required: true
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' }
      ],
      required: true
    }
  ]
}
