import { SelectOption } from "@/types"

export const SIZING_CATEGORY_OPTIONS: SelectOption[] = [
    { label: 'Mens', value: 'mens' },
    { label: 'Womens', value: 'womens' },
    { label: 'Kids', value: 'kids' }
]

export const DISCOUNT_TYPE_OPTIONS: SelectOption[] = [
    { label: 'Percent', value: 'percent_off' },
    { label: 'Amount', value: 'amount_off' }
]

export const SORT_OPTIONS: SelectOption[] = [
    { label: 'New Releases', value: 'release_date|desc', icon: 'mage:arrow-down' },
    { label: 'Older Releases', value: 'release_date|asc', icon: 'mage:arrow-up' },
    { label: 'Lowest Price', value: 'min_price|asc', icon: 'mage:arrow-up' },
    { label: 'Highest Price', value: 'min_price|desc', icon: 'mage:arrow-down' }
]