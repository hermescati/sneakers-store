import { CollectionConfig } from 'payload'

export const Wishlist: CollectionConfig = {
  slug: 'wishlist',
  labels: {
    singular: 'Wishlist',
    plural: 'Wishlist'
  },
  admin: {
    useAsTitle: 'id',
    hidden: true
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      required: true,
      unique: true
    },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true
    }
  ]
}
