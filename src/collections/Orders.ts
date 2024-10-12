import { Access, CollectionConfig } from 'payload'

const getOrders: Access = ({ req: { user } }) => {
  if (user?.role === 'admin') return true
  return { user: { equals: user?.id } }
}

export const Orders: CollectionConfig = {
  slug: 'orders',
  labels: {
    singular: 'Order',
    plural: 'Orders'
  },
  access: {
    read: getOrders,
    create: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin'
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      admin: { hidden: true },
      required: true
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Successful', value: 'successful' }
      ],
      required: true
    },
    {
      name: 'products',
      type: 'array',
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true
        },
        {
          name: 'size',
          type: 'number',
          required: true
        },
        {
          name: 'price',
          type: 'number',
          required: true
        }
      ],
      required: true
    },
    {
      name: 'total',
      type: 'number',
      admin: { readOnly: true },
      required: true
    },
    {
      name: 'delivery',
      type: 'number',
      admin: { readOnly: true },
      required: true
    },
    {
      name: 'fees',
      type: 'array',
      admin: { readOnly: true },
      fields: [
        {
          name: 'processing_fee',
          label: 'Processing Fee',
          type: 'number',
          admin: { readOnly: true },
          required: true
        },
        {
          name: 'tax',
          label: 'Taxes',
          type: 'number',
          admin: { readOnly: true },
          required: true
        }
      ],
      required: true
    }
  ]
}
