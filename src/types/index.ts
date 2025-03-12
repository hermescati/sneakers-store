import { Sort, Where } from 'payload'
import { Brand, Collection, Model, Product } from './payload'
import { ReactNode } from 'react'

// TODO: Organize types and interfaces to be placed under types folder
export type SelectedSize = Product['stock'][0] | null

export type MenuPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'

export type OrderItem = {
  productId: Product['id']
  size: number
  price: number
}

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface NavItem {
  name: string
  href?: string
  items?: NavLink[]
  featured?: NavLink[]
}

export interface NavLink {
  name: string
  href?: string
  imageSrc?: string
}

export interface SelectOption {
  value: string
  label: string
  icon?: string
  component?: ReactNode
}

export interface QueryParams {
  where?: Where,
  limit?: number,
  sort?: Sort,
  depth?: number
}

export interface BaseResponse<T = unknown> {
  code: number
  message: string
  data?: T
}

export interface PaginatedResponse<T> extends BaseResponse<T[]> {
  data: T[]
  metadata?: {
    total: number
    totalPages: number
    currentPage?: number
    nextPage?: number | null
    prevPage?: number | null
  }
}

export type SortDirection = 'asc' | 'desc'
export type PriceFilters = 'belowRetail' | 'onSale'

export interface ProductFilters {
  brand?: Brand['slug'][]
  model?: Model['slug'][]
  collection?: Collection['slug'][]
  size?: Product['size_category']
  sort?: keyof Product
  dir?: SortDirection
  filter?: PriceFilters
}

export class PayloadError extends Error {
  public code: number
  public details?: unknown

  constructor(code: number, message: string, details?: unknown) {
    super(message)
    this.code = code
    this.details = details
    Object.setPrototypeOf(this, PayloadError.prototype)
  }
}