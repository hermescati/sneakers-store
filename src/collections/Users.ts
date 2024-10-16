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
    verify: {
      generateEmailHTML: ({ token }) => {
        return `<a href='${process.env.NEXT_PUBLIC_API_URL}/verify?token=${token}'>Verify your account</a>`
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
