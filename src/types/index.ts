import { Sort, Where } from 'payload'
import { Brand, Collaboration, Model, Product } from './payload'
import { ReactNode } from 'react'

// TODO: Organize types and interfaces to be placed under types folder
export type SelectedSize = Product['stock'][0] | null

export type MenuPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'

export type Sizes = 'xs' | 'sm' | 'md' | 'base' | 'lg' | 'xl' | '2xl'
export type Animations = 'none' | 'spin' | 'bump' | 'shrink' | 'grow'

export type WishlistStatus = 'added' | 'removed'

export interface ActiveIndicator {
  left: number
  width: number
}

export type OrderItem = {
  productId: Product['id']
  size: number
  price: number
}

export interface AccordionItem {
  title: string
  content?: string
  icon?: string
}

export interface BreadcrumbItem {
  label: string
  href?: string
}

// Navigation
export interface NavStructure {
  featured: NavCategory[]
  brands: NavCategory[]
  others: NavCategory[]
}

export interface NavCategory {
  name: string
  href?: string
  items?: NavItemLink[]
  featured?: NavItemLink[]
}

export interface NavItemLink {
  name: string
  href?: string
  imageSrc?: string
}

export interface NavMenuItem {
  value: string
  title: string
  subtitle?: string
  icon?: string
  route?: string
  action?: VoidFunction
  component?: ReactNode
  class?: string
}

export type FooterItem = {
  header: string
  links: {
    name?: string
    icon?: string
    href: string
  }[]
}

export interface SelectOption {
  value: string
  label: string
  icon?: string
  component?: ReactNode
}

export interface QueryParams {
  where?: Where
  limit?: number
  sort?: Sort
  depth?: number
}

export interface BaseResponse<T = unknown> {
  code: number
  message: string
  data?: T
}

export interface ResponseMetadata {
  total: number
  totalPages: number
  currentPage?: number
  nextPage?: number | null
  prevPage?: number | null
}

export interface PaginatedResponse<T> extends BaseResponse<T[]> {
  data: T[]
  metadata?: ResponseMetadata
}

export type SortOrder = 'asc' | 'desc'

export interface ProductFilters {
  brand?: Brand['slug'][]
  model?: Model['slug'][]
  collaboration?: Collaboration['slug'][]
  category?: Product['size_category']
  size?: number[]
  sort?: string
  order?: SortOrder
  price?: string
  query?: 'belowRetail' | 'onSale' | string
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
