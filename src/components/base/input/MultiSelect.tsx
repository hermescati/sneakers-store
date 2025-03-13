'use client'

import FilterControl from "@/components/filters/FilterControl"
import { SelectOption } from "@/types"
import { useState } from "react"
import SelectMenu from "./SelectMenu"

interface MultiSelectProps {
    id: string,
    options: SelectOption[]
    placeholder?: string
    className?: string
    onChange: (selected: string[]) => void
}

const MultiSelect = ({
    id,
    options,
    placeholder = 'Select a value',
    className,
    onChange
}: MultiSelectProps) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([])

    const handleSelectionChange = (selectedOptions: string[]) => {
        setSelectedOptions(selectedOptions)
        onChange(selectedOptions)
    }

    return (
        <FilterControl
            id={id}
            menu={
                <SelectMenu
                    options={options}
                    selectId={id}
                    multiple
                    selected={selectedOptions}
                    onSelect={handleSelectionChange}
                    onClear={() => setSelectedOptions([])} />
            }>
            <div className={className}>
                {selectedOptions.length > 0
                    ? (
                        <p className="font-medium text-md">
                            {selectedOptions
                                .map((value) => {
                                    const option = options.find((opt) => opt.value === value)
                                    return option ? option.label : ''
                                })
                                .join(', ')}
                        </p>
                    )
                    : <p className="text-md font-medium text-primary-600">{placeholder}</p>
                }
            </div>
        </FilterControl >
    )
}

export default MultiSelect
