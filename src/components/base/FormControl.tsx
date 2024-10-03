import { cn } from "@/utils";
import { InputProps } from "./Input";

const FormControl = ({
  label,
  id,
  required,
  children,
  invalid,
  invalidMessage,
  hint,
  disabled,
}: InputProps) => {
  return (
    <div className="flex flex-col items-start gap-1 w-full ">
      {label && (
        <div className="flex gap-1 items-center font-semibold">
          <label htmlFor={id} className="text-foreground">
            {label}
          </label>
          {required && (
            <span className="text-secondary text-xl leading-none">*</span>
          )}
        </div>
      )}
      {children}
      {invalid && invalidMessage ? (
        <span className="text-sm font-medium text-danger">
          {invalidMessage}
        </span>
      ) : hint ? (
        <span
          className={cn(
            "text-sm font-medium text-gray-500",
            disabled && "opacity-40"
          )}
        >
          {hint}
        </span>
      ) : null}
    </div>
  );
};

export default FormControl;
