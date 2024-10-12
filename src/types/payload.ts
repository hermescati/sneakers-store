/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations
  }
  collections: {
    users: User
    media: Media
    brands: Brand
    models: Model
    collections: Collection
    products: Product
    orders: Order
    'payload-locked-documents': PayloadLockedDocument
    'payload-preferences': PayloadPreference
    'payload-migrations': PayloadMigration
  }
  db: {
    defaultIDType: string
  }
  globals: {}
  locale: null
  user: User & {
    collection: 'users'
  }
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string
    password: string
  }
  login: {
    email: string
    password: string
  }
  registerFirstUser: {
    email: string
    password: string
  }
  unlock: {
    email: string
    password: string
  }
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string
  firstName: string
  lastName: string
  role: 'admin' | 'user'
  updatedAt: string
  createdAt: string
  email: string
  resetPasswordToken?: string | null
  resetPasswordExpiration?: string | null
  salt?: string | null
  hash?: string | null
  _verified?: boolean | null
  _verificationToken?: string | null
  loginAttempts?: number | null
  lockUntil?: string | null
  password?: string | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string
  user?: (string | null) | User
  updatedAt: string
  createdAt: string
  url?: string | null
  thumbnailURL?: string | null
  filename?: string | null
  mimeType?: string | null
  filesize?: number | null
  width?: number | null
  height?: number | null
  focalX?: number | null
  focalY?: number | null
  sizes?: {
    thumbnail?: {
      url?: string | null
      width?: number | null
      height?: number | null
      mimeType?: string | null
      filesize?: number | null
      filename?: string | null
    }
    smartphone?: {
      url?: string | null
      width?: number | null
      height?: number | null
      mimeType?: string | null
      filesize?: number | null
      filename?: string | null
    }
    tablet?: {
      url?: string | null
      width?: number | null
      height?: number | null
      mimeType?: string | null
      filesize?: number | null
      filename?: string | null
    }
  }
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "brands".
 */
export interface Brand {
  id: string
  name: string
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "models".
 */
export interface Model {
  id: string
  brand: string | Brand
  name: string
  image?: (string | null) | Media
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "collections".
 */
export interface Collection {
  id: string
  name: string
  image?: (string | null) | Media
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "products".
 */
export interface Product {
  id: string
  stripeId?: string | null
  sku: string
  brand: string | Brand
  model: string | Model
  nickname: string
  colorway: string
  collection?: (string | null) | Collection
  description?: string | null
  release_date?: string | null
  size_category: 'mens' | 'womens' | 'kids'
  retail_price: number
  sizes: {
    size: number
    price: number
    discount?: number | null
    stock: number
    id?: string | null
  }[]
  images: {
    image: string | Media
    id?: string | null
  }[]
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "orders".
 */
export interface Order {
  id: string
  user: string | User
  status: 'pending' | 'successful'
  products?:
    | {
        product: string | Product
        size: number
        price: number
        id?: string | null
      }[]
    | null
  total: number
  delivery: number
  fees: {
    processing_fee: number
    tax: number
    id?: string | null
  }[]
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: string
  document?:
    | ({
        relationTo: 'users'
        value: string | User
      } | null)
    | ({
        relationTo: 'media'
        value: string | Media
      } | null)
    | ({
        relationTo: 'brands'
        value: string | Brand
      } | null)
    | ({
        relationTo: 'models'
        value: string | Model
      } | null)
    | ({
        relationTo: 'collections'
        value: string | Collection
      } | null)
    | ({
        relationTo: 'products'
        value: string | Product
      } | null)
    | ({
        relationTo: 'orders'
        value: string | Order
      } | null)
  globalSlug?: string | null
  user: {
    relationTo: 'users'
    value: string | User
  }
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string
  user: {
    relationTo: 'users'
    value: string | User
  }
  key?: string | null
  value?:
    | {
        [k: string]: unknown
      }
    | unknown[]
    | string
    | number
    | boolean
    | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string
  name?: string | null
  batch?: number | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown
}

declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}
