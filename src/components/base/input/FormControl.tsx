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
    <div className="flex w-full flex-col items-start gap-1">
      {label && (
        <div className="flex items-center gap-1 font-semibold">
          <label htmlFor={id}>{label}</label>
          {required && <span className="text-xl leading-none text-secondary">*</span>}
        </div>
      )}
      {children}
      {invalid && error ? (
        <span className="text-md font-medium text-danger">{error}</span>
      ) : hint ? (
        <span
          className={cn('text-md font-medium text-primary-600', {
            'pointer-events-none select-none opacity-40': disabled
          })}
        >
          {hint}
        </span>
      ) : null}
    </div>
  )
}

export default FormControl
