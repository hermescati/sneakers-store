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
  featured?: NavLink[]
}

export interface NavLink {
  name: string
  href?: string
  imageSrc?: string
}

export interface ServerResponse {
  code: number
  message: string
  data?: unknown
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