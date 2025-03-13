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
    { label: 'New Releases', value: 'release_date|desc', icon: 'hugeicons:sort-by-down-01' },
    { label: 'Older Releases', value: 'release_date|asc', icon: 'hugeicons:sort-by-up-01' },
    { label: 'Highest Price', value: 'min_price|desc', icon: 'hugeicons:sorting-19' },
    { label: 'Lowest Price', value: 'min_price|asc', icon: 'hugeicons:sorting-91' },
]

export const SIZE_CATEGORIES: Record<string, number[]> = {
    "US Mens": [
        3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5,
        11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18
    ],
    "US Womens": [
        5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5,
        13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5
    ],
    "US Kids": [
        0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7
    ],
    "UK": [
        3, 3.5, 4, 4.5, 5, 5.5, 6, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10,
        10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17
    ],
    "Europe": [
        35.5, 36, 36.5, 37.5, 38, 38.5, 39, 40, 40.5, 41, 42, 42.5, 43, 44,
        44.5, 45, 45.5, 46, 47, 47.5, 48, 48.5, 49, 49.5, 50, 50.5, 51, 51.5,
        52, 52.5
    ],
    "Foot Length (cm)": [
        22.5, 23, 23.5, 23.5, 24, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28,
        28.5, 29, 29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5, 34, 34.5, 35,
        35.5, 36
    ],
    "Foot Length (in)": [
        8.9, 9.1, 9.3, 9.3, 9.4, 9.4, 9.6, 9.8, 10, 10.2, 10.4, 10.6, 10.8,
        11, 11.2, 11.4, 11.6, 11.8, 12, 12.2, 12.4, 12.6, 12.8, 13, 13.2, 13.4,
        13.6, 13.8, 14, 14.2
    ]
}