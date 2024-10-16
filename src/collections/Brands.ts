import { CollectionConfig } from 'payload'

export const Brands: CollectionConfig = {
  slug: 'brands',
  labels: {
    singular: 'Brand',
    plural: 'Brands'
  },
  admin: {
    useAsTitle: 'name'
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true
    }
  ]
}
