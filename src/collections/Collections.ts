import { CollectionConfig } from 'payload'

export const Collections: CollectionConfig = {
  slug: 'collections',
  labels: {
    singular: 'Collection',
    plural: 'Collections'
  },
  admin: {
    useAsTitle: 'name',
    hidden: true
  },
  fields: [
    {
      name: 'brand',
      type: 'relationship',
      relationTo: 'brands',
      hasMany: false,
      required: true
    },
    {
      name: 'name',
      type: 'text',
      required: true
    },
    {
      name: 'featured',
      type: 'checkbox'
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media'
    }
  ]
}
