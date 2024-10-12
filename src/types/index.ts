export type ShoeModel = {
  label: string
  href?: string
}

export type PopularShoe = {
  label: string
  value: string
  imageSrc: string
  href?: string
}

export type FeaturedShoes = {
  shoes: ShoeModel[]
  popular?: PopularShoe[]
}

export type ProductCategory = {
  label: string
  value: string
  href?: string
  featured?: FeaturedShoes
}

export type ActionStatus = 'pending' | 'failed' | 'success'

export type ProductSize = {
  size: number
  stock: number
  price: number
  discount?: number | null
  id?: string | null
}
