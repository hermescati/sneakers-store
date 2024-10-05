import { FilteredSelect } from "../components/base/payload/FilteredSelect";
import { CollectionConfig } from "payload/types";

export const Brands: CollectionConfig = {
  slug: "brands",
  labels: {
    singular: "Brand",
    plural: "Brands",
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
  ],
};

export const Models: CollectionConfig = {
  slug: "models",
  labels: {
    singular: "Model",
    plural: "Models",
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "brand",
      type: "relationship",
      relationTo: "brands",
      required: true,
    },
    {
      name: "name",
      type: "text",
      required: true,
    },
  ],
};

export const Products: CollectionConfig = {
  slug: "products",
  labels: {
    singular: "Product",
    plural: "Products",
  },
  access: {},
  fields: [
    {
      name: "createdBy",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: "sku",
      label: "SKU",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "brand",
      type: "relationship",
      relationTo: "brands",
      hasMany: false,
      required: true,
      admin: {
        allowCreate: false,
      },
    },
    {
      name: "model",
      type: "relationship",
      relationTo: "models",
      hasMany: false,
      required: true,
      admin: {
        components: {
          Field: FilteredSelect,
        },
      },
    },
    {
      name: "nickname",
      type: "text",
      required: true,
    },
    {
      name: "colorway",
      type: "text",
      required: true,
    },
    {
      name: "category",
      type: "select",
      options: [
        { label: "Men's", value: "mens" },
        { label: "Women's", value: "womens" },
        { label: "Kids", value: "kids" },
      ],
      required: true,
    },
    {
      name: "retail_price",
      label: "Retail Price (USD)",
      type: "number",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "release_date",
      label: "Release Date",
      type: "date",
    },
    {
      name: "images",
      label: "Product Images",
      type: "array",
      minRows: 1,
      maxRows: 4,
      labels: {
        singular: "Image",
        plural: "Images",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
      required: true,
    },
    {
      name: "available_sizes",
      label: "Available Sizes",
      type: "array",
      fields: [
        {
          name: "size",
          label: "US Size",
          type: "number",
          required: true,
        },
        {
          name: "stock",
          label: "Size Stock",
          type: "number",
          defaultValue: 1,
          required: true,
        },
        {
          name: "price",
          label: "Price (USD)",
          type: "number",
          required: true,
        },
        {
          name: "discount",
          label: "Discount %",
          type: "number",
        },
      ],
      required: true,
    },
    {
      name: "priceId",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: { hidden: true },
    },
    {
      name: "stripeId",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: { hidden: true },
    },
  ],
};
