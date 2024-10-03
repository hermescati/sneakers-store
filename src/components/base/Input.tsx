import { cn } from "@/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef, forwardRef, useMemo, useState } from "react";
import { InlineIcon } from "@iconify/react";
import FormControl from "./FormControl";

const baseInput = `
    w-full bg-transparent border-2
    leading-none font-medium placeholder:text-primary-600
    has-[:focus-visible]:outline-none
    has-[:disabled]:opacity-40 has-[:disabled]:cursor-not-allowed
    transition ease-in-out duration-300
`;

const inputVariants = cva(baseInput, {
  variants: {
    inputSize: {
      small: [
        "px-4",
        "py-2",
        "rounded-xl",
        "text-md",
        "has-[:focus-visible]:ring",
      ],
      default: [
        "px-4",
        "py-3",
        "rounded-2xl",
        "text-base",
        "has-[:focus-visible]:ring-4",
      ],
    },
    invalid: {
      true: [
        "text-danger",
        "border-danger",
        "has-[:focus-visible]:ring-danger/20",
      ],
      false: [
        "text-primary-900",
        "border-primary-400",
        "has-[:focus-visible]:border-primary-900",
        "has-[:focus-visible]:ring-primary-900/20",
      ],
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
  iconAppend?: string;
  iconPrepend?: string;
}

const IconWrapper = ({
  position,
  inputSize,
  icon,
}: {
  position: "prepend" | "append";
  inputSize: VariantProps<typeof inputVariants>["inputSize"];
  icon: string;
}) => (
  <div
    className={cn(
      "flex px-4 items-center bg-primary-200 border-primary-400",
      position === "prepend" ? "-ml-4 border-r" : "-mr-4 border-l",
      inputSize === "small" ? "-my-2" : "-my-3"
    )}
  >
    <InlineIcon
      icon={icon}
      className="text-primary-600"
      height={inputSize === "small" ? "1rem" : "1.25rem"}
    />
  </div>
);

const PasswordToggleWrapper = ({
  inputSize,
  showPassword,
  toggleHandler,
}: {
  inputSize: VariantProps<typeof inputVariants>["inputSize"];
  showPassword: boolean;
  toggleHandler: () => void;
}) => (
  <button
    type="button"
    onClick={toggleHandler}
    className={cn(
      "flex px-4 -mx-4 items-center bg-primary-200 border-primary-400 border-l",
      inputSize === "small" ? "-my-2" : "-my-3"
    )}
    aria-label={showPassword ? "Hide password" : "Show password"}
  >
    <InlineIcon
      icon={showPassword ? "solar:eye-closed-linear" : "solar:eye-linear"}
      className="text-primary-600"
      height={inputSize === "small" ? "1rem" : "1.25rem"}
    />
  </button>
);

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      type = "text",
      inputSize,
      invalid = false,
      className,
      iconAppend,
      iconPrepend,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = type === "password" && showPassword ? "text" : type;
    const inputClasses = inputVariants({ inputSize, invalid, className });

    const PrependIcon = useMemo(
      () =>
        iconPrepend &&
        type !== "password" &&
        !showPassword && (
          <IconWrapper
            position="prepend"
            inputSize={inputSize}
            icon={iconPrepend as string}
          />
        ),
      [iconPrepend, inputSize, showPassword, type]
    );

    const AppendIcon = useMemo(
      () =>
        iconAppend &&
        type !== "password" &&
        !showPassword && (
          <IconWrapper
            position="append"
            inputSize={inputSize}
            icon={iconAppend as string}
          />
        ),
      [iconAppend, inputSize, showPassword, type]
    );

    const PasswordToggle = useMemo(
      () =>
        type === "password" && (
          <PasswordToggleWrapper
            inputSize={inputSize}
            showPassword={showPassword}
            toggleHandler={() => setShowPassword(!showPassword)}
          />
        ),
      [showPassword, inputSize, type]
    );

    return (
      <FormControl id={id} {...props}>
        <div className={cn(inputClasses, "flex w-full gap-3 overflow-clip")}>
          {PrependIcon}
          <input
            id={id}
            ref={ref}
            type={inputType}
            className="w-full outline-none disabled:cursor-not-allowed"
            {...props}
          />
          {AppendIcon}
          {PasswordToggle}
        </div>
      </FormControl>
    );
  }
);

Input.displayName = "Input";
export default Input;
