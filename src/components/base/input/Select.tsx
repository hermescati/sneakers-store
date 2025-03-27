'use client'

import FilterControl from "@/components/filters/base/FilterControl"
import { MenuPosition, SelectOption } from "@/types"
import { useEffect, useMemo, useState } from "react"
import SelectMenu from "./SelectMenu"

interface SelectProps {
    id: string,
    options: SelectOption[]
    selected?: string[]
    multiple?: boolean
    placeholder?: string
    position?: MenuPosition
    showClear?: boolean
    onChange: (selected: string[]) => void
    onClear: VoidFunction
}

const Select = ({
    id,
    options,
    selected = [],
    multiple = false,
    placeholder = 'Select a value',
    position = 'bottom-left',
    showClear = false,
    onChange,
    onClear
}: SelectProps) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>(selected)

    useEffect(() => {
        setSelectedOptions(selected)
    }, [selected])

    const displayedValue = useMemo(() => {
        const selectedLabels = selectedOptions
            .map((value) => options.find((o) => o.value === value)?.label)
            .filter(Boolean)

        return multiple
            ? selectedLabels.length >= 2
                ? `${selectedLabels.length} selected`
                : selectedLabels.join(', ')
            : selectedLabels[0] || ''
    }, [selectedOptions])

    const handleOnSelect = (selectedOption: string[]) => {
        setSelectedOptions(selectedOption)
        onChange(selectedOption)
    }

    const handleOnClear = () => {
        setSelectedOptions([])
        onClear()
    }

    return (
        <FilterControl
            id={id}
            placeholder={placeholder}
            value={displayedValue}>
            <SelectMenu
                options={options}
                selectId={id}
                selected={selectedOptions}
                multiple={multiple}
                position={position}
                showClear={showClear}
                onSelect={handleOnSelect}
                onClear={handleOnClear} />
        </FilterControl>
    )
}

export default Select