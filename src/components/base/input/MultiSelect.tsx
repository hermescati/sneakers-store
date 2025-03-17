'use client'

import FilterControl from "@/components/filters/FilterControl"
import { SelectOption } from "@/types"
import { useEffect, useState } from "react"
import SelectMenu from "./SelectMenu"

interface MultiSelectProps {
    id: string,
    options: SelectOption[]
    selected: string[]
    placeholder?: string
    onChange: (selected: string[]) => void
    onClear: VoidFunction
}

const MultiSelect = ({
    id,
    options,
    selected,
    placeholder = 'Select a value',
    onChange,
    onClear
}: MultiSelectProps) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>(selected)

    useEffect(() => {
        setSelectedOptions(selected)
    }, [selected])

    const displaySelectedValues = () => {
        const selected = selectedOptions
            .map((value) => options.find((o) => o.value === value)?.label)
            .filter(Boolean)

        return selected.length >= 3 ? `${selected.length} selected` : selected.join(', ')
    }

    const handleOnSelect = (selectedOptions: string[]) => {
        setSelectedOptions(selectedOptions)
        onChange(selectedOptions)
    }

    const handleOnClear = () => {
        setSelectedOptions([])
        onClear()
    }

    return (
        <FilterControl
            id={id}
            placeholder={placeholder}
            value={displaySelectedValues()}>
            <SelectMenu
                options={options}
                selectId={id}
                multiple
                selected={selectedOptions}
                onSelect={handleOnSelect}
                onClear={handleOnClear} />
        </ FilterControl >
    )
}

export default MultiSelect
