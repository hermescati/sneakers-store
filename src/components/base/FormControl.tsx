import { cn } from '@/utils'
import { InputProps } from './Input'

const FormControl = ({
  label,
  id,
  required,
  children,
  invalid,
  error,
  hint,
  disabled
}: InputProps) => {
  return (
    <div className="flex flex-col items-start gap-1 w-full">
      {label && (
        <div className="flex gap-1 items-center font-semibold">
          <label htmlFor={id}>{label}</label>
          {required && (
            <span className="text-secondary text-xl leading-none">*</span>
          )}
        </div>
      )}
      {children}
      {invalid && error ? (
        <span className="text-md font-medium text-danger">{error}</span>
      ) : hint ? (
        <span
          className={cn(
            "text-md font-medium text-gray-500",
            { "opacity-40 pointer-events-none select-none": disabled }
          )}
        >
          {hint}
        </span>
      ) : null}
    </div>
  )
}

export default FormControl
