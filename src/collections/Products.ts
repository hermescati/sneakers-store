import { Product } from '@/types/payload'
import { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: 'Product',
    plural: 'Products'
  },
  hooks: {
    beforeChange: [
      async ({ data }) => {
        const product = data as Product

        if (product.sizes) {
          product.sizes = product.sizes.map((size) => {
            if (size.discount) {
              size.discount = size.discount / 100
            }

            return size
          })
        }
      }
    ]
  },
  fields: [
    {
      name: 'sku',
      label: 'SKU',
      type: 'text',
      required: true,
      unique: true
    },
    {
      name: 'brand',
      type: 'relationship',
      relationTo: 'brands',
      hasMany: false,
      required: true
    },
    {
      name: 'model',
      type: 'relationship',
      relationTo: 'models',
      hasMany: false,
      required: true,
      filterOptions: ({ siblingData }) => {
        // @ts-expect-error TS will throw an error because it doesn't know what type is siblingData
        if (siblingData?.brand) {
          return {
            // @ts-expect-error TS will throw an error because it doesn't know what type is siblingData
            brand: { equals: siblingData.brand }
          }
        }
        return true
      }
    },
    {
      name: 'name',
      type: 'text',
      required: true
    },
    {
      name: 'nickname',
      type: 'text'
    },
    {
      name: 'colorway',
      type: 'text',
      required: true
    },
    {
      name: 'collection',
      type: 'relationship',
      relationTo: 'collections',
      hasMany: false
    },
    {
      name: 'description',
      type: 'textarea'
    },
    {
      name: 'release_date',
      label: 'Release Date',
      type: 'date'
    },
    {
      name: 'size_category',
      label: 'Size Category',
      type: 'select',
      options: [
        { label: "Men's", value: 'mens' },
        { label: "Women's", value: 'womens' },
        { label: 'Kids', value: 'kids' }
      ],
      required: true
    },
    {
      name: 'retail_price',
      label: 'Retail Price (USD)',
      type: 'number',
      required: true
    },
    {
      name: 'sizes',
      label: 'Available Sizes',
      type: 'array',
      fields: [
        {
          name: 'size',
          label: 'US Size',
          type: 'number',
          required: true
        },
        {
          name: 'price',
          label: 'Price (USD)',
          type: 'number',
          required: true
        },
        {
          name: 'discount',
          label: 'Discount %',
          type: 'number'
        },
        {
          name: 'stock',
          label: 'Sizes in Stock',
          type: 'number',
          defaultValue: 1,
          required: true
        }
      ],
      required: true
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
      required: true
    }
  ]
}
