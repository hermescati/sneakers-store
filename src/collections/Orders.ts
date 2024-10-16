import { Access, CollectionConfig } from 'payload'

const getOrders: Access = ({ req: { user } }) => {
  if (user?.role === 'admin') return true
  return { user: { equals: user?.id } }
}

const ORDER_STATUS = [
  { label: 'Pending', value: 'pending' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Completed', value: 'completed' }
]

export const Orders: CollectionConfig = {
  slug: 'orders',
  labels: {
    singular: 'Order',
    plural: 'Orders'
  },
  hooks: {
    beforeChange: [
      async ({ operation, originalDoc, data }) => {
        if (operation === 'update') {
          if (data.status && data.status !== originalDoc.status) {
            originalDoc.status = data.status
            originalDoc.history.push({
              status: data.status,
              timestamp: new Date()
            })
          }

          return originalDoc
        }
      }
    ]
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
      required: true
    },
    {
      name: 'status',
      type: 'select',
      options: ORDER_STATUS,
      required: true
    },
    {
      name: 'products',
      type: 'array',
      admin: { position: 'sidebar' },
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
      name: 'details',
      label: 'Order Details',
      type: 'group',
      fields: [
        {
          name: 'subtotal',
          type: 'number'
        },
        {
          name: 'delivery',
          type: 'number'
        },
        {
          name: 'discount',
          type: 'number'
        },
        {
          name: 'tax',
          type: 'number'
        },
        {
          name: 'total',
          type: 'number'
        }
      ]
    },
    {
      name: 'address',
      label: 'Shipping Address',
      type: 'group',
      fields: [
        {
          name: 'country',
          type: 'text'
        },
        {
          name: 'state',
          type: 'text'
        },
        {
          name: 'city',
          type: 'text'
        },
        {
          name: 'line_1',
          label: 'Address Line 1',
          type: 'text'
        },
        {
          name: 'line_2',
          label: 'Address Line 2',
          type: 'text'
        },
        {
          name: 'postal_code',
          label: 'Postal Code',
          type: 'number'
        },
        {
          name: 'number',
          label: 'Phone Number',
          type: 'text'
        }
      ]
    },
    {
      name: 'method',
      label: 'Payment Method',
      type: 'select',
      options: [
        { label: 'Card', value: 'card' },
        { label: 'Google Pay', value: 'g_pay' },
        { label: 'Apple Pay', value: 'apple_pay' },
        { label: 'Klarna', value: 'klarna' }
      ]
    },
    {
      name: 'history',
      label: 'Order History',
      type: 'array',
      fields: [
        {
          name: 'status',
          type: 'select',
          options: ORDER_STATUS,
          required: true,
          admin: {
            readOnly: true
          }
        },
        {
          name: 'timestamp',
          type: 'date',
          required: true,
          admin: {
            readOnly: true
          }
        }
      ]
    }
  ]
}
