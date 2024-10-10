import { Access, CollectionConfig } from "payload/types";

const getOrders: Access = ({ req: { user } }) => {
  if (user.role === "admin") return true;
  return { user: { equals: user?.id } };
};

export const Orders: CollectionConfig = {
  slug: "orders",
  labels: {
    singular: "Order",
    plural: "Orders",
  },
  admin: {
    useAsTitle: "Your Orders",
    description: "A summary of your orders on Sneakers.",
  },
  access: {
    read: getOrders,
    update: ({ req }) => req.user.role === "admin",
    delete: ({ req }) => req.user.role === "admin",
    create: ({ req }) => req.user.role === "admin",
  },
  fields: [
    {
      name: "_isPaid",
      type: "checkbox",
      access: {
        read: ({ req }) => req.user.role === "admin",
        create: () => false,
        update: () => false,
      },
      admin: { hidden: true },
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      admin: { hidden: true },
      required: true,
    },
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
      required: true,
    },
  ],
};
