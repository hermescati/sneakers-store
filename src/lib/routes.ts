import { Product } from '@/types/payload'

const routes = {
  home: '/',
  admin: '/admin',
  auth: {
    login: '/login',
    register: '/register',
    reset: '/reset',
    verify: '/verify'
  },
  products: {
    home: '/sneakers',
    product: (slug: Product['slug']) => `/sneakers/${slug}`,
    newReleases: '/sneakers?sort=release_date&order=desc',
    belowRetail: '/sneakers/belowRetail',
    onSale: '/sneakers/sale',
    mens: '/sneakers?category=mens',
    womens: '/sneakers?category=womens',
    kids: '/sneakers?category=kids'
  },
  orders: {
    home: '/orders',
    thankYou: '/thank-you'
  },
  cart: '/cart',
  wishlist: '/wishlist',
  profile: '/profile'
}

export default routes
