import { Collaboration } from '@/types/payload'
import { CollectionBeforeChangeHook, CollectionConfig } from 'payload'
import slugify from 'slugify'

const generateSlug: CollectionBeforeChangeHook = async ({ data, req }) => {
  const collab = data as Collaboration

  const brandNames = await Promise.all(
    collab.brand.map(async brandId => {
      const { name } = await req.payload.findByID({
        collection: 'brands',
        id: brandId as string
      })
      return name || ''
    })
  )

  const collabName = brandNames.filter(Boolean).join(' x ')
  data.name = collabName
  data.slug = slugify(collabName, { lower: true })
  return data
}

export const Collaborations: CollectionConfig = {
  slug: 'collaborations',
  labels: {
    singular: 'Collaboration',
    plural: 'Collaborations'
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
      hasMany: true,
      required: true,
      validate: value => {
        if (!Array.isArray(value) || value.length < 2) {
          return 'You must select at least two brands.'
        }
        return true
      }
    },
    {
      name: 'title',
      type: 'text',
      required: true
    },
    {
      name: 'name',
      type: 'text',
      admin: { hidden: true }
    },
    {
      name: 'description',
      type: 'textarea'
    },
    {
      name: 'featured',
      type: 'checkbox',
      admin: {
        description: 'Mark this collaboration as featured to display it on the homepage'
      }
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
          return 'An image is required for featured models.'
        }
        return true
      }
    }
  ]
}
