import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva(
  [
    "font-medium",
    "transition-colors",
    "shadow-sm",
    "border",
    "inline-flex",
    "items-center",
    "justify-center",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary-600",
          "text-white",
          "hover:bg-primary-700",
          "focus:ring-primary-500",
          "border-transparent",
          "focus:outline-none",
          "focus:ring-2",
          "focus:ring-offset-2",
        ],
        secondary: [
          "bg-primary-100",
          "text-primary-700",
          "hover:bg-primary-200",
          "focus:ring-primary-500",
          "border-transparent",
          "focus:outline-none",
          "focus:ring-2",
          "focus:ring-offset-2",
        ],
        outline: [
          "bg-white",
          "text-gray-700",
          "hover:bg-gray-50",
          "focus:ring-primary-500",
          "border-gray-300",
          "focus:outline-none",
          "focus:ring-2",
          "focus:ring-offset-2",
        ],
        success: [
          "bg-success-600",
          "text-white",
          "hover:bg-success-700",
          "focus:ring-success-500",
          "border-transparent",
          "focus:outline-none",
          "focus:ring-2",
          "focus:ring-offset-2",
        ],
        warning: [
          "bg-warning-400",
          "text-warning-900",
          "hover:bg-warning-500",
          "focus:ring-warning-400",
          "border-transparent",
          "focus:outline-none",
          "focus:ring-2",
          "focus:ring-offset-2",
        ],
        error: [
          "bg-error-600",
          "text-error-50",
          "hover:bg-error-700",
          "focus:ring-error-500",
          "border-transparent",
          "focus:outline-none",
          "focus:ring-2",
          "focus:ring-offset-2",
        ],
        disabled: [
          "bg-gray-100",
          "text-gray-400",
          "cursor-auto",
          "border-transparent",
        ],
      },
      size: {
        xs: ["text-sm", "px-2.5", "py-1.5", "rounded"],
        sm: ["text-sm", "px-3", "py-2", "rounded-md"],
        base: ["text-sm", "px-4", "py-2", "rounded-md"],
        l: ["text-base", "px-4", "py-2", "rounded-md"],
        xl: ["text-base", "px-6", "py-3", "rounded-md"],
      },
      fullWidth: {
        true: ["w-full"],
      },
      withIcon: {
        leading: ["flex-row-reverse", "gap-1"],
        trailing: ["flex-row", "gap-1"],
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "base",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      withIcon,
      fullWidth,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={twMerge(
          buttonVariants({ variant, size, withIcon, fullWidth }),
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;
