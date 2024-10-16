import { Product } from './payload'

export type ProductSize = {
  size: number
  stock: number
  price: number
  discount?: number | null
  id?: string | null
}

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
  featured?: NavFeaturedLink[]
}

export interface NavLink {
  name: string
  href?: string
}

export interface NavFeaturedLink {
  name: string
  imageSrc?: string
  href?: string
}
