import { InlineIcon } from "@iconify/react";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";

const buttonVariants = cva(
  "flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all ease-in-out duration-300",
  {
    variants: {
      intent: {
        button: "",
        link: ["text-link", "underline", "hover:text-link-hover"],
      },
      variant: {
        primary: ["font-medium"],
        secondary: ["font-semibold"],
      },
      size: {
        small: ["py-2", "px-4", "rounded-xl", "text-sm"],
        default: ["py-3", "px-6", "rounded-2xl", "text-base"],
      },
    },
    compoundVariants: [
      {
        intent: "button",
        variant: "primary",
        className: [
          "bg-primary-800",
          "text-background",
          "enabled:hover:bg-primary-900",
          "enabled:active:outline-none",
          "enabled:active:ring",
          "enabled:active:ring-offset-2",
          "enabled:active:bg-primary-900",
          "enabled:active:ring-primary-900",
          "shadow-[0_4px_16px_-2px_rgba(33,36,39,0.50)]",
        ],
      },
      {
        intent: "button",
        variant: "secondary",
        className: [
          "bg-secondary",
          "text-foreground",
          "enabled:hover:bg-primary-200",
          "enabled:active:outline-none",
          "enabled:active:ring",
          "enabled:active:ring-offset-2",
          "enabled:active:bg-secondary",
          "enabled:active:ring-secondary",
          "shadow-[0_4px_16px_-2px_rgba(253,132,74,0.25)]",
        ],
      },
      {
        intent: "link",
        variant: "primary",
        className: ["text-foreground", "font-semibold", "hover:text-secondary"],
      },
      {
        intent: "link",
        variant: "secondary",
        className: ["text-background", "font-medium", "hover:text-foreground"],
      },
    ],
    defaultVariants: {
      intent: "button",
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  label?: string;
  iconAppend?: string;
  iconPrepend?: string;
  href?: string;
}

const Button = ({
  className,
  href,
  intent = href ? "link" : "button",
  variant,
  size,
  label = "",
  iconAppend = "",
  iconPrepend = "",
  children,
  ...props
}: ButtonProps) => {
  const content = (
    <>
      {iconPrepend && <InlineIcon icon={iconPrepend} />}
      {label || children}
      {iconAppend && <InlineIcon icon={iconAppend} />}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={buttonVariants({ intent, variant, size, className })}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={buttonVariants({ intent, variant, size, className })}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
