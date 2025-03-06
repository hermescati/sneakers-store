import { CollectionConfig } from 'payload'

export const Brands: CollectionConfig = {
  slug: 'brands',
  labels: {
    singular: 'Brand',
    plural: 'Brands'
  },
  admin: {
    useAsTitle: 'name',
    hidden: true
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true
    }
  ]
}
