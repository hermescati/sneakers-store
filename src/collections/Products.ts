import { DISCOUNT_TYPE_OPTIONS, SIZING_CATEGORY_OPTIONS } from '@/lib/options'
import { Product } from '@/types/payload'
import { CollectionBeforeChangeHook, CollectionConfig } from 'payload'
import slugify from 'slugify'

const updateComputedFields: CollectionBeforeChangeHook = async ({ data, req }) => {
  const product = data as Product

  if (product.stock && product.stock.length > 0) {
    const prices = product.stock.map(item => item.price)
    product.min_price = Math.min(...prices)
    product.total_stock = product.stock.reduce((total, item) => total + (item.quantity || 0), 0)
  }

  if (product.model) {
    const model = await req.payload.findByID({
      collection: 'models',
      id: typeof product.model === 'string' ? product.model : product.model.id
    })

    product.slug = slugify(`${model.name}-${product.nickname}`, { lower: true })
  }

  return data
}

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: 'Product',
    plural: 'Products'
  },
  admin: {
    useAsTitle: 'nickname'
  },
  hooks: {
    beforeChange: [updateComputedFields]
  },
  fields: [
    {
      name: 'sku',
      label: 'SKU',
      type: 'text',
      required: true,
      unique: true,
      admin: { placeholder: 'E.g., AB1234 567' }
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: { hidden: true }
    },
    {
      type: 'row',
      fields: [
        {
          name: 'brand',
          type: 'relationship',
          relationTo: 'brands',
          hasMany: false,
          required: true,
          admin: { width: '50%' }
        },
        {
          name: 'model',
          type: 'relationship',
          relationTo: 'models',
          hasMany: false,
          required: true,
          filterOptions: ({ siblingData }) => {
            const product = siblingData as Product
            if (product.brand) {
              return {
                brand: { equals: product.brand }
              }
            }
            return true
          },
          admin: { width: '50%' }
        }
      ]
    },
    {
      type: 'row',
      fields: [
        {
          name: 'collection',
          type: 'relationship',
          relationTo: 'collections',
          hasMany: false,
          admin: { width: '50%' }
        },
        {
          name: 'size_category',
          label: 'Size Category',
          type: 'select',
          options: SIZING_CATEGORY_OPTIONS,
          defaultValue: 'mens',
          required: true,
          admin: { width: '50%' }
        },
      ]
    },
    {
      type: 'row',
      fields: [
        {
          name: 'nickname',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
            placeholder: 'E.g., Contrast Stitch - White University Red'
          }
        },
        {
          name: 'colorway',
          type: 'text',
          admin: {
            width: '50%',
            placeholder: 'White/University Red/White'
          }
        },
      ]
    },
    {
      type: 'row',
      fields: [
        {
          name: 'retail_price',
          label: 'Retail Price (USD)',
          type: 'number',
          required: true,
          admin: {
            width: '50%',
            placeholder: 'E.g., 150'
          }
        },
        {
          name: 'release_date',
          label: 'Release Date',
          type: 'date',
          admin: {
            width: '50%',
            placeholder: 'Select a release date'
          }
        },
      ]
    },
    {
      name: 'description',
      type: 'textarea',
      admin: { placeholder: 'Provide a brief description of the product...' }
    },
    {
      name: 'discount',
      label: 'Discount Details',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'type',
              type: 'select',
              options: DISCOUNT_TYPE_OPTIONS,
              admin: { width: '50%' }
            },
            {
              name: 'value',
              type: 'number',
              validate: (value: number | null | undefined) => {
                if (value && value <= 0) {
                  return 'Discount value must be greater than 0'
                }
                return true
              },
              admin: {
                width: '50%',
                placeholder: 'E.g., 10 for 10$ or 10%'
              }
            }
          ]
        }
      ],
      admin: { position: "sidebar" }
    },
    {
      name: 'stock',
      label: 'Stock Details',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'size',
              label: 'US Size',
              type: 'number',
              required: true,
              admin: { placeholder: 'E.g., 10' }
            },
            {
              name: 'price',
              label: 'Price (USD)',
              type: 'number',
              required: true,
              admin: { placeholder: 'E.g., 200' }
            },
            {
              name: 'quantity',
              label: 'Quantity',
              type: 'number',
              defaultValue: 1,
              required: true
            }
          ]
        }
      ],
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'min_price',
      type: 'number',
      admin: { hidden: true }
    },
    {
      name: 'total_stock',
      type: 'number',
      admin: { hidden: true }
    },

    {
      name: 'images',
      label: 'Product Images',
      type: 'array',
      minRows: 1,
      maxRows: 5,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true
        }
      ],
      required: true,
      admin: { description: 'Upload product images (max 5)' }
    }
  ]
}
