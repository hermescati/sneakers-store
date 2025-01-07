import { cn } from '@/utils'

interface SearchOptionsProps {
    selectedOption: string
    onSelect: (option: string) => void
    onClear?: () => void
}

const SearchOptions = ({ selectedOption, onSelect }: SearchOptionsProps) => {
    const options = [
        { value: "mens", label: "Mens" },
        { value: "womens", label: "Womens" },
        { value: "kids", label: "Kids" }
    ]

    return (
        <div className="flex flex-col gap-1.5 m-4">
            <span className="font-semibold text-md text-primary-600">I&apos;m searching for</span>
            <ul className="flex items-center gap-1">
                {options.map((option) =>
                    <li
                        key={option.value}
                        className={cn(
                            "w-fit px-3 py-1 border border-primary-400 hover:bg-primary-200 rounded-full font-semibold text-md cursor-pointer transition-all duration-300 ease-in-out",
                            { "border-primary-900 bg-primary-900 hover:bg-primary-900 text-background cursor-default": selectedOption === option.value }
                        )}
                        onClick={() => {
                            if (selectedOption === option.value) onSelect("")
                            else onSelect(option.value)
                        }}>
                        {option.label}
                    </li>
                )}
            </ul>
        </div>
    )
}

export default SearchOptions