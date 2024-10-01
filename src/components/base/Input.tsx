import { cn } from "@/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef } from "react";

const baseInput = `
    w-full bg-transparent border-2
    leading-none font-medium text-primary-600 placeholder:text-primary-600
    focus:text-gray-800 focus:border-secondary focus:outline-none focus:ring-secondary/40
    disabled:opacity-40 disabled:cursor-not-allowed
    transition ease-in-out duration-300
`;

const inputVariants = cva(baseInput, {
  variants: {
    inputSize: {
      small: ["px-4", "py-2", "rounded-xl", "text-sm", "focus:ring"],
      default: ["px-4", "py-3", "rounded-2xl", "text-base", "focus:ring-4"],
    },
    invalid: {
      true: ["border-danger"],
      false: ["border-primary-400"],
    },
  },
  defaultVariants: {
    inputSize: "default",
    invalid: false,
  },
});

export interface InputProps
  extends ComponentPropsWithoutRef<"input">,
    VariantProps<typeof inputVariants> {
  label?: string;
  hint?: string;
  invalidMessage?: string;
}

const Input = ({
  className,
  label,
  inputSize,
  hint,
  invalid = false,
  invalidMessage,
  id,
  required,
  ...props
}: InputProps) => {
  const inputClasses = inputVariants({ inputSize, invalid, className });

  return (
    <div className="w-full flex flex-col gap-1 items-start">
      {label && (
        <div className="flex gap-1 items-center font-semibold">
          <label htmlFor={id} className="text-foreground">
            {label}
          </label>
          {required && (
            <span className="text-danger text-xl leading-none">*</span>
          )}
        </div>
      )}
      <input id={id} className={inputClasses} {...props} />
      {invalid && invalidMessage ? (
        <span className="text-sm font-medium text-danger">
          {invalidMessage}
        </span>
      ) : hint ? (
        <span
          className={cn(
            "text-sm font-medium text-gray-500",
            props.disabled && "opacity-40"
          )}
        >
          {hint}
        </span>
      ) : null}
    </div>
  );
};

export default Input;
