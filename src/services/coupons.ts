'use server'

import { stripeClient } from "@/lib/stripe";
import { Event } from "@/types/payload";
import { constructCouponMetadata } from "@/utils";
import Stripe from "stripe";

// TODO: Add discount code validation logic
async function createStripeCoupon(couponData: Stripe.CouponCreateParams) {
    try {
        const createdCoupon = await stripeClient.coupons.create(couponData)
        return {
            code: 201,
            message: 'Created',
            data: createdCoupon.id
        }
    } catch (error) {
        console.error(error)
        return { code: 500, message: error }
    }
}

async function updateStripeCoupon(id: string, couponData: Stripe.CouponUpdateParams) {
    try {
        const updatedCoupon = await stripeClient.coupons.update(id, couponData)
        return {
            code: 200,
            message: 'OK',
            data: updatedCoupon.id
        }
    } catch (error) {
        console.error(error)
        return { code: 500, message: error }
    }
}

async function createStripePromoCode(codeData: Stripe.PromotionCodeCreateParams) {
    try {
        const createdCode = await stripeClient.promotionCodes.create(codeData)
        return {
            code: 201,
            message: 'Created',
            data: createdCode.id
        }
    } catch (error) {
        console.error(error)
        return { code: 500, message: error }
    }
}

async function retrievePromoCode(codeId: string) {
    try {
        const promoCode = await stripeClient.promotionCodes.retrieve(codeId)
        return {
            code: 200,
            message: 'OK',
            data: promoCode
        }
    } catch (error) {
        console.error(error)
        return { code: 500, message: error }
    }
}

export async function createDiscountCode(data: Event) {
    if (!data.discount) return

    const {
        code,
        type,
        value,
        endDate,
        maxRedemptions,
        minAmount } = data.discount

    const valueOff = type === 'amount_off' ? value * 100 : value
    const couponMetadata = constructCouponMetadata(data)

    const newCoupon: Stripe.CouponCreateParams = {
        name: data.title,
        [type === 'percent_off' ? 'percent_off' : 'amount_off']: valueOff,
        currency: type === 'amount_off' ? 'usd' : undefined,
        duration: 'once',
        metadata: couponMetadata
    }

    const { code: couponStatus, data: couponId } = await createStripeCoupon(newCoupon)
    if (couponStatus === 500 || !couponId) return

    const newPromoCode: Stripe.PromotionCodeCreateParams = {
        coupon: couponId,
        code: code,
        expires_at: endDate ? Math.floor(new Date(endDate).getTime() / 1000) : undefined,
        max_redemptions: maxRedemptions ?? undefined,
        restrictions: {
            minimum_amount: minAmount ?? undefined,
            minimum_amount_currency: minAmount ? 'usd' : undefined
        }
    }

    const { code: codeStatus, data: codeId } = await createStripePromoCode(newPromoCode)
    if (codeStatus === 500 || !codeId) return

    return codeId
}

export async function updateDiscountCode(data: Event) {
    if (!data.discount) return

    const { stripeId } = data.discount
    if (!stripeId) return

    const { code: lol, data: promoCode } = await retrievePromoCode(stripeId)
    if (lol === 500 || !promoCode) return

    const updatedCouponData: Stripe.CouponUpdateParams = {
        name: data.title,
        metadata: constructCouponMetadata(data)
    }

    const { code: couponStatus, data: couponId } = await updateStripeCoupon(promoCode.coupon.id, updatedCouponData)
    if (couponStatus !== 200 || !couponId) return

    return promoCode.id;
}

export async function validateDiscountCode(code: string) {
    const { data: promoCodes } = await stripeClient.promotionCodes.list()
    const discountCode = promoCodes.find((pc) => pc.code === code)

    if (!discountCode) return { code: 404, message: 'NOT_FOUND' }
    if (!discountCode.active) return { code: 400, message: 'COUPON_NOT_VALID' }

    return { code: 200, message: 'OK', discountCode }
}