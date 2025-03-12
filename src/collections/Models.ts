import { Model } from '@/types/payload'
import { CollectionBeforeChangeHook, CollectionConfig } from 'payload'
import slugify from 'slugify'

const generateSlug: CollectionBeforeChangeHook = async ({ data }) => {
  const model = data as Model
  model.slug = slugify(model.name, { lower: true })
  return data
}

export const Models: CollectionConfig = {
  slug: 'models',
  labels: {
    singular: 'Model',
    plural: 'Models'
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
      admin: { description: 'Mark this model as featured to display it in the navbar under popular models.' }
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
