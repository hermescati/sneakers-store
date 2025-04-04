import { SelectOption } from '@/types'
import { cn } from '@/utils'

interface ToggleButtonProps {
    options: SelectOption[]
    selected: string
    onChange: (value: string) => void
}

const ToggleButton = ({
    options,
    selected,
    onChange,
}: ToggleButtonProps) => {
    const selectedIndex = options.findIndex(option => option.value === selected)

    return (
        <div className='relative flex border border-border rounded-2xl overflow-hidden shadow-inner'>
            <div
                className='absolute top-1 left-1 bottom-1 right-1 bg-primary-900 rounded-xl transition-all duration-300 shadow-md'
                style={{
                    width: `calc(${100 / options.length}% - 0.5rem)`,
                    transform: `translateX(calc(${selectedIndex * 100}% + ${selectedIndex * 0.5}rem))`
                }}
            />

            {options.map((option) => (
                <button
                    key={option.value}
                    onClick={() => onChange(option.value)}
                    className={cn(
                        'relative flex-1 px-4 py-3.5 font-medium z-10 transition-all duration-300 ease-linear',
                        { 'text-background': selected === option.value }
                    )}
                >
                    {option.label}
                </button>
            ))}
        </div>
    )
}

export default ToggleButton
