import { cn } from "@/utils";
import { InlineIcon } from "@iconify/react";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

const baseButton = `
    flex items-center justify-center gap-3
    font-semibold
    disabled:opacity-40 disabled:pointer-events-none
    active:outline-none active:ring active:ring-offset-2
    transition ease-in-out duration-300
`;

export const buttonVariants = cva(baseButton, {
  variants: {
    variant: {
      solid: [""],
      outline: [""],
      ghost: [""],
    },
    intent: {
      primary: [""],
      secondary: [""],
    },
    size: {
      small: ["py-2", "px-4", , "rounded-xl", "text-sm"],
      default: ["py-3.5", "px-6", "max-h-[52px]", "rounded-2xl", "text-base"],
      icon: ["p-2", "rounded-full", "text-base"],
    },
  },
  compoundVariants: [
    {
      variant: "solid",
      intent: "primary",
      className: [
        "bg-primary-800",
        "text-background",
        "hover:bg-primary-900",
        "active:bg-primary-900",
        "active:ring-primary-900",
        "shadow-[0_4px_16px_-2px_rgba(33,36,39,0.50)]",
      ],
    },
    {
      variant: "solid",
      intent: "secondary",
      className: [
        "bg-secondary",
        "text-foreground",
        "hover:bg-primary-200",
        "active:bg-secondary",
        "active:ring-secondary",
        "shadow-[0_4px_16px_-2px_rgba(253,132,74,0.25)]",
      ],
    },
    {
      variant: "outline",
      intent: "primary",
      className: [
        "bg-transparent",
        "text-foreground",
        "border-2 border-primary-900",
        "hover:bg-primary-900/5",
        "active:bg-primary-900/5",
        "active:ring-primary-900",
      ],
    },
    {
      variant: "outline",
      intent: "secondary",
      className: [
        "bg-transparent",
        "text-secondary",
        "border-2 border-secondary",
        "hover:bg-secondary/10",
        "active:bg-secondary/10",
        "active:ring-secondary",
      ],
    },
    {
      variant: "ghost",
      intent: "primary",
      className: [
        "bg-transparent",
        "text-foreground",
        "hover:bg-primary-900/5",
        "active:bg-primary-900/5",
        "active:ring-0",
        "active:ring-transparent",
        "active:shadow-[inset_0_0px_6px_rgba(0,0,0,0.2)]",
      ],
    },
    {
      variant: "ghost",
      intent: "secondary",
      className: [
        "bg-transparent",
        "text-secondary",
        "hover:bg-secondary/10",
        "active:bg-secondary/10",
        "active:ring-secondary",
      ],
    },
  ],
  defaultVariants: {
    variant: "solid",
    intent: "primary",
    size: "default",
  },
});

export interface ButtonProps
  extends ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {
  label?: string;
  href?: string;
  iconAppend?: string;
  iconPrepend?: string;
}

const Button = ({
  className,
  href,
  variant,
  intent,
  size,
  label,
  iconAppend,
  iconPrepend,
  children,
  ...props
}: ButtonProps) => {
  const buttonClasses = cn(
    buttonVariants({ variant, intent, size }),
    className
  );
  const content = (
    <>
      {iconPrepend && (
        <InlineIcon
          icon={iconPrepend}
          height={size === "small" ? "1rem" : "1.25rem"}
        />
      )}
      {label || children}
      {iconAppend && (
        <InlineIcon
          icon={iconAppend}
          height={size === "small" ? "1rem" : "1.25rem"}
        />
      )}
    </>
  );

  return href && !props.disabled ? (
    <Link href={href} className={buttonClasses}>
      {content}
    </Link>
  ) : (
    <button className={buttonClasses} {...props}>
      {content}
    </button>
  );
};

export default Button;
