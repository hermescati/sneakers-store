import { createDiscountCode, updateDiscountCode } from "@/services/coupons";
import { Event } from "@/types/payload";
import { CollectionBeforeChangeHook, CollectionConfig } from "payload";

const handleStripeCoupon: CollectionBeforeChangeHook = async ({ operation, data }) => {
    const event = data as Event
    if (event.type !== 'discount') return event

    try {
        let codeId: string | undefined

        if (operation === 'create') {
            codeId = await createDiscountCode(event)
        } else if (operation === 'update') {
            codeId = await updateDiscountCode(event)
        }

        if (!codeId) throw new Error('The promo code could not be generated. Please try again.')

        return {
            ...event,
            discount: {
                ...event.discount,
                stripeId: codeId
            }
        }
    } catch (error) {
        console.error(`Error handling Stripe coupon for operation "${operation}":`, error)
        throw new Error(`Error processing discount banner: ${error}`)
    }
}

export const Events: CollectionConfig = {
    slug: 'events',
    labels: {
        singular: 'Event',
        plural: 'Events'
    },
    hooks: {
        beforeChange: [handleStripeCoupon]
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            admin: { placeholder: 'E.g., Summer Sale 50% Off' }
        },
        {
            name: 'description',
            type: 'textarea',
            required: true,
            admin: { placeholder: 'E.g., Enjoy 50% off on all summer collections until July 31st!' }
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'type',
                    type: 'select',
                    access: { update: () => false },
                    options: [
                        { label: 'Promotional', value: 'discount' },
                        { label: 'New Drop', value: 'drop' },
                        { label: 'Spotlight', value: 'spotlight' },
                    ],
                    admin: { width: '50%' },
                    required: true,
                },
                {
                    name: 'ctaLabel',
                    label: 'CTA Label',
                    type: 'text',
                    defaultValue: 'SHOP NOW',
                    required: true,
                    admin: { width: '50%' }
                }
            ]
        },
        {
            name: 'appliedTo',
            label: 'Apply To',
            type: 'relationship',
            relationTo: ['brands', 'models', 'collections'],
            hasMany: true,
            required: true,
            admin: {
                condition: (data) =>
                    !!data.type
                    && data.type !== 'drop'
                    && !data.appliedToAll,
                allowCreate: false,
                allowEdit: false
            },
        },
        {
            name: 'product',
            label: 'Featured Product',
            type: 'relationship',
            relationTo: 'products',
            admin: {
                condition: (data) => data.type === 'drop',
                description: 'You can also create a new product directly from here',
                allowCreate: true,
                allowEdit: false,
            },
        },
        {
            name: 'appliedToAll',
            label: "Apply to all Products",
            type: 'checkbox',
            admin: {
                condition: (data) =>
                    !!data.type
                    && data.type === 'discount'
                    && (data.appliedTo === undefined || data.appliedTo.length === 0)
            }
        },
        {
            name: 'image',
            label: 'Cover Image',
            type: 'upload',
            relationTo: 'media',
            required: true,
            admin: { description: 'Upload a banner image, e.g., 1920x1080px for best quality.' }
        },
        {
            type: 'group',
            name: 'discount',
            label: 'Discount Details',
            access: { update: () => false },
            admin: {
                condition: (data) => !!data.type && data.type === 'discount',
                position: 'sidebar'
            },
            fields: [
                {
                    name: 'stripeId',
                    access: {
                        create: () => false,
                        read: () => false,
                        update: () => false,
                    },
                    type: 'text',
                    admin: { hidden: true },
                },
                {
                    name: 'code',
                    label: 'Discount Code',
                    access: { update: () => false },
                    type: 'text',
                    required: true,
                    admin: { placeholder: 'E.g., SUMMER50' }
                },
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'type',
                            label: 'Discount Type',
                            type: 'select',
                            access: { update: () => false },
                            options: [
                                { label: 'Percent', value: 'percent_off' },
                                { label: 'Amount', value: 'amount_off' }
                            ],
                            required: true,
                            admin: { width: '50%' }
                        },
                        {
                            name: 'value',
                            label: 'Discount Value',
                            type: 'number',
                            access: { update: () => false },
                            required: true,
                            admin: {
                                placeholder: 'E.g., 10 for 10% or 10 for $10',
                                width: '50%'
                            },
                            // @ts-expect-error It's known that value is a number, but Payload wants Number[] | null | undefined
                            validate: (value) => {
                                if (value <= 0) {
                                    return 'Discount value must be greater than 0.';
                                }
                                return true;
                            }
                        },
                    ]
                },
                {
                    type: 'row',
                    admin: { position: 'sidebar' },
                    fields: [
                        {
                            name: 'startDate',
                            label: 'Valid From',
                            type: 'date',
                            access: { update: () => false },
                            admin: {
                                placeholder: 'E.g., 01-Jan, 2025',
                                date: { displayFormat: 'dd-MMM, yyyy' },
                                width: '50%'
                            }
                        },
                        {
                            name: 'endDate',
                            label: 'Valid To',
                            type: 'date',
                            access: { update: () => false },
                            admin: {
                                placeholder: 'E.g., 31-Jan, 2025',
                                date: { displayFormat: 'dd-MMM, yyyy' },
                                width: '50%'
                            },
                            validate: (value, { siblingData }) => {
                                // @ts-expect-error TS will throw an error because it doesn't know what type is siblingData
                                if (value && siblingData.startDate && value < siblingData.startDate) {
                                    return 'Earlier than from date.'
                                }
                                return true;
                            }
                        },
                    ]
                },
                {
                    type: 'row',
                    admin: { position: 'sidebar' },
                    fields: [
                        {
                            name: 'maxRedemptions',
                            label: 'Max. Number of Redemptions',
                            type: 'number',
                            admin: {
                                placeholder: 'E.g., ',
                                width: '50%'
                            },
                            // @ts-expect-error It's known that value is a number, but Payload wants Number[] | null | undefined
                            validate: (value) => {
                                if (value <= 0) {
                                    return 'Max value must be greater than 0.';
                                }
                                return true;
                            }
                        },
                        {
                            name: 'minAmount',
                            label: 'Minumum Amount',
                            type: 'number',
                            admin: {
                                placeholder: 'E.g., ',
                                width: '50%'
                            },
                            // @ts-expect-error It's known that value is a number, but Payload wants Number[] | null | undefined
                            validate: (value) => {
                                if (value <= 0) {
                                    return 'Max value must be greater than 0.';
                                }
                                return true;
                            }
                        },
                    ]
                },
            ]
        }
    ]
}