import { Brand } from '@/types/payload'
import { CollectionBeforeChangeHook, CollectionConfig } from 'payload'
import slugify from 'slugify'

const generateSlug: CollectionBeforeChangeHook = async ({ data }) => {
  const brand = data as Brand
  brand.slug = slugify(brand.name, { lower: true })
  return data
}

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
  hooks: {
    beforeChange: [generateSlug]
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: { hidden: true }
    },
    {
      name: 'name',
      type: 'text',
      required: true
    }
  ]
}
