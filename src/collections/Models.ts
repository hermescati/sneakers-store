import { CollectionConfig } from 'payload'

export const Models: CollectionConfig = {
  slug: 'models',
  labels: {
    singular: 'Model',
    plural: 'Models'
  },
  admin: {
    useAsTitle: 'name'
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
