import { SelectedSize } from "@/types"
import { Product } from "@/types/payload"

export const getProductInfo = (product: Product) => {
    const brand = typeof product.brand === 'string'
        ? product.brand
        : product.brand.name

    const model = typeof product.model === 'string'
        ? product.model
        : product.model.name

    const collection = typeof product.collection === 'string'
        ? product.collection
        : product.collection?.name

    const thumbnail = typeof product.images[0].image === 'string'
        ? product.images[0].image
        : product.images[0].image.url as string

    return { brand, model, collection, thumbnail }
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