'use client'

import FilterControl from "@/components/filters/FilterControl"
import { SelectOption } from "@/types"
import { useState } from "react"
import SelectMenu from "./SelectMenu"

interface SelectProps {
    id: string,
    options: SelectOption[]
    placeholder?: string
    onChange: (selected: string[]) => void
}

const Select = ({
    id,
    options,
    placeholder,
    onChange
}: SelectProps) => {
    const [selectedOption, setSelectedOption] = useState<string[]>([])

    const handleSelectionChange = (selectedOption: string[]) => {
        setSelectedOption(selectedOption)
        onChange(selectedOption)
    }

    return (
        <FilterControl
            id={id}
            menu={
                <SelectMenu
                    options={options}
                    selectId={id}
                    selected={selectedOption}
                    onSelect={handleSelectionChange} />
            }>
            {selectedOption.length > 0
                ? (
                    <p className="font-medium text-md">
                        {selectedOption.map((value) => {
                            const option = options.find((opt) => opt.value === value)
                            return option ? option.label : ''
                        })
                        }
                    </p>
                )
                : <p className="text-md font-medium text-primary-600">{placeholder}</p>
            }
        </FilterControl>
    )
}

export default Select