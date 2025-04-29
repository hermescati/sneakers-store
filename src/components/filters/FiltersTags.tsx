'use client'

import Button from "@/components/base/button/Button"
import IconButton from "@/components/base/button/IconButton"
import { ProductFilters, SelectOption } from "@/types"
import { formatPrice } from "@/utils"

interface TagProps {
    label: string
    onRemove: () => void
}

const Tag = ({ label, onRemove }: TagProps) => (
    <span className="flex items-center gap-2 pl-3 pr-2 py-1 rounded-lg bg-primary-100 font-semibold text-sm">
        {label}
        <IconButton
            icon="tabler:x"
            className="p-0"
            iconClass="text-base text-primary-600"
            onClick={onRemove}
        />
    </span>
);

interface FiltersTagsProps {
    appliedFilters: ProductFilters
    brandOptions: SelectOption[]
    modelOptions: SelectOption[]
    collabOptions: SelectOption[]
    categoryOptions: SelectOption[]
    updateFilters: (newFilters: Partial<ProductFilters>) => void
}

const FilterTags = ({
    appliedFilters,
    brandOptions,
    modelOptions,
    collabOptions,
    categoryOptions,
    updateFilters,
}: FiltersTagsProps) => {
    const cleanedFilters = Object.entries(appliedFilters).filter(([key]) => key !== 'sort' && key !== 'order')

    const getLabelFromValue = (value: string, options: SelectOption[]) => {
        const option = options.find((opt) => opt.value === value)
        return option ? option.label : value
    }

    const handleTagRemove = (key: string, value: string | string[], item?: string) => {
        if (Array.isArray(value)) {
            updateFilters({ [key]: value.filter((v) => v !== item) })
        } else {
            updateFilters({ [key]: undefined })
        }
    }

    if (!cleanedFilters.some(([, value]) => value && value.length)) return null

    return (
        <div className="flex items-stretch gap-2 flex-wrap">
            {cleanedFilters.map(([key, value]) => {
                if (!value) return null

                if (key === 'brand' && Array.isArray(value)) {
                    return value.map((v) => (
                        <Tag key={v} label={getLabelFromValue(v, brandOptions)} onRemove={() => handleTagRemove(key, value, v)} />
                    ))
                }

                if (key === 'model' && Array.isArray(value)) {
                    return value.map((v) => (
                        <Tag key={v} label={getLabelFromValue(v, modelOptions)} onRemove={() => handleTagRemove(key, value, v)} />
                    ))
                }

                if (key === 'collaboration' && Array.isArray(value)) {
                    return value.map((v) => (
                        <Tag key={v} label={getLabelFromValue(v, collabOptions)} onRemove={() => handleTagRemove(key, value, v)} />
                    ))
                }

                if (key === 'price' && typeof value === 'string') {
                    const [min, max] = value.split('-')
                    return (
                        <Tag
                            key={key}
                            label={`${formatPrice(Number(min), { fractionDigits: 0 })} - ${formatPrice(Number(max), { fractionDigits: 0 })}`}
                            onRemove={() => handleTagRemove(key, value)}
                        />
                    )
                }

                if (key === 'category' && typeof value === 'string') {
                    return <Tag key={key} label={getLabelFromValue(value, categoryOptions) || value} onRemove={() => handleTagRemove(key, value)} />
                }

                if (key === 'size' && Array.isArray(value)) {
                    return value.map((v) => (
                        <Tag key={v} label={`US - ${v}`} onRemove={() => handleTagRemove(key, value, v)} />
                    ))
                }
            })}

            <Button
                variant="outline"
                size="small"
                label="Clear All"
                iconAppend="tabler:x"
                iconClass="text-base"
                className="pl-3 pr-2 py-1.5 rounded-lg border border-border text-sm hover:underline hover:underline-offset-4"
                onClick={() => updateFilters({
                    brand: undefined,
                    model: undefined,
                    collaboration: undefined,
                    category: undefined,
                    size: undefined,
                    price: undefined,
                    query: undefined
                })}
            />
        </div>
    )
}

export default FilterTags
