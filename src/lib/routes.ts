import { Product } from "@/types/payload"

const routes = {
    home: '/',
    admin: '/admin',
    auth: {
        login: '/login',
        register: '/register',
        reset: '/reset',
        verify: '/verify'
    },
    cart: '/cart',
    profile: '/profile',
    products: {
        home: '/sneakers',
        product: (slug: Product['slug']) => `/sneakers/${slug}`,
        newReleases: '/sneakers?sort=release_date&order=desc',
        belowRetail: '/sneakers/belowRetail',
        sale: '/sneakers/sale',
        mens: '/sneakers/category=mens',
        womens: '/sneakers/category=womens'
    },
    orders: {
        home: '/orders',
        thankYou: '/thank-you'
    }
}

export default routes