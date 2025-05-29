import { SelectOption } from '@/types'
import { cn } from '@/utils'

interface ToggleButtonProps {
  options: SelectOption[]
  selected: string
  onChange: (value: string) => void
}

const ToggleButton = ({ options, selected, onChange }: ToggleButtonProps) => {
  const selectedIndex = options.findIndex(option => option.value === selected)

  return (
    <div className="relative flex overflow-hidden rounded-2xl border border-border shadow-inner">
      <div
        className="absolute bottom-1 left-1 right-1 top-1 rounded-xl bg-primary-900 shadow-md transition-all duration-300"
        style={{
          width: `calc(${100 / options.length}% - 0.5rem)`,
          transform: `translateX(calc(${selectedIndex * 100}% + ${selectedIndex * 0.5}rem))`
        }}
      />

      {options.map(option => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            'relative z-10 flex-1 px-4 py-3.5 font-medium transition-all duration-300 ease-linear',
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
