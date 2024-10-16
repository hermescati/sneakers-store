import { Access, CollectionConfig } from 'payload'

const hasAccess =
  (): Access =>
  async ({ req }) => {
    const user = req.user

    if (!user) return false
    if (user.role === 'admin') return true

    return {
      user: { equals: req.user?.id }
    }
  }

export const Media: CollectionConfig = {
  slug: 'media',
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        return { ...data, user: req.user?.id }
      }
    ]
  },
  access: {
    read: async ({ req }) => {
      const referer = req.headers.get('referer')
      if (!req.user || !referer?.includes('admin')) return true

      return await hasAccess()({ req })
    },
    update: hasAccess(),
    delete: hasAccess()
  },
  upload: {
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'smartphone', width: 768, height: undefined, position: 'centre' },
      { name: 'tablet', width: 1024, height: undefined, position: 'centre' }
    ]
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      admin: { condition: () => false },
      required: true
    }
  ]
}
