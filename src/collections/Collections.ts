import { Collection } from '@/types/payload'
import { CollectionBeforeChangeHook, CollectionConfig } from 'payload'
import slugify from 'slugify'

const generateSlug: CollectionBeforeChangeHook = async ({ data }) => {
  const collection = data as Collection
  collection.slug = slugify(collection.name, { lower: true })
  return data
}

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
      type: 'checkbox',
      admin: { description: 'Mark this collection as featured to display it on the homepage' }
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (siblingData?: Record<string, unknown>) => siblingData?.featured === true,
        description: 'Upload an image for the featured model.'
      },
      // @ts-expect-error TS can't infer the types of value and siblingData
      validate: (value, { siblingData }) => {
        if (siblingData?.featured && !value) {
          return 'An image is required for featured models.';
        }
        return true;
      }
    }
  ]
}
