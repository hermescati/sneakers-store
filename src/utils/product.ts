import { SelectedSize } from "@/types"
import { Media, Product } from "@/types/payload"

export const getProductInfo = (product: Product) => {
    const brand = typeof product.brand === 'string'
        ? product.brand
        : product.brand.name

    const model = typeof product.model === 'string'
        ? product.model
        : product.model.name

    const collaboration = typeof product.collaboration === 'string'
        ? product.collaboration
        : product.collaboration?.name

    const thumbnail = product.images[0].image as Media

    const images = product.images
        .map(i => (typeof i.image === 'string' ? null : i.image))
        .filter((img): img is Media => !!img)

    return { brand, model, collaboration, thumbnail, images }
}

export const getProductSlugs = (product: Product) => {
    const brandSlug = typeof product.brand === 'string' ? '' : product.brand.slug
    const modelSlug = typeof product.model === 'string' ? '' : product.model.slug
    const collabSlug = typeof product.collaboration === 'string' ? '' : product.collaboration?.slug

    return { brandSlug, modelSlug, collabSlug }
}

export const getProductPrice = (product: Product, size?: SelectedSize) => {
    const basePrice = size ? size.price : (product.min_price as number)

    if (!product.discount?.type || !product.discount.value) {
        return { basePrice, finalPrice: basePrice }
    }

    const { type, value } = product.discount
    const finalPrice = type === 'amount_off' ? basePrice - value : basePrice * (1 - value / 100)

    return { basePrice, finalPrice }
}