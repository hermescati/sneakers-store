import { CartItem } from "@/stores/useCart"
import Stripe from "stripe"

const calculateSubtotal = (items: CartItem[]): number =>
    items.reduce((total, { size: { stock, discount, price } }) => {
        if (!stock) return total;
        const effectivePrice = discount ? price * (1 - discount) : price;
        return total + effectivePrice;
    }, 0)

const calculateDiscountValue = (
    subtotal: number,
    discount?: Stripe.PromotionCode
): number => {
    if (!discount) return 0
    const { coupon } = discount
    if (coupon.amount_off) return coupon.amount_off
    if (coupon.percent_off) return subtotal * (coupon.percent_off / 100)
    return 0
}

export const calculateCartSummary = (
    items: CartItem[],
    discount?: Stripe.PromotionCode,
    shipping?: Stripe.ShippingRate
) => {
    const subtotal = calculateSubtotal(items)
    const discountValue = calculateDiscountValue(subtotal, discount)
    const shippingCost = shipping?.fixed_amount?.amount || 0
    const total = Math.max(0, subtotal - discountValue + shippingCost)

    return {
        subtotal,
        discountValue,
        shippingCost,
        total
    }
}
