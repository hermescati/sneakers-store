import { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  labels: {
    singular: 'Review',
    plural: 'Reviews'
  },
  admin: {
    useAsTitle: 'id'
  },
  fields: [
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      hasMany: false,
      required: true
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      required: true
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      required: true
    },
    {
      name: 'comment',
      type: 'richText'
    },
    {
      name: 'recommend',
      label: 'Would Recommend',
      type: 'checkbox',
      defaultValue: false
    }
  ]
}
