'use client'

import FilterControl from "@/components/filters/FilterControl"
import { SelectOption } from "@/types"
import { useState } from "react"
import SelectMenu from "./SelectMenu"

interface SelectProps {
    id: string,
    options: SelectOption[]
    placeholder?: string
    showClear?: boolean
    onChange: (selected: string[]) => void
    onClear: VoidFunction
}

const Select = ({
    id,
    options,
    placeholder = 'Select a value',
    showClear,
    onChange,
    onClear
}: SelectProps) => {
    const [selectedOption, setSelectedOption] = useState<string[]>([])

    const handleOnSelect = (selectedOption: string[]) => {
        setSelectedOption(selectedOption)
        onChange(selectedOption)
    }

    const handleOnClear = () => {
        setSelectedOption([])
        onClear()
    }

    return (
        <FilterControl
            id={id}
            placeholder={placeholder}
            value={options.find((o) => o.value === selectedOption[0])?.label || ''}>
            <SelectMenu
                options={options}
                selectId={id}
                selected={selectedOption}
                showClear={showClear}
                onSelect={handleOnSelect}
                onClear={handleOnClear} />
        </FilterControl>
    )
}

export default Select