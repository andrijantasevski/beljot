import { cva, VariantProps } from "class-variance-authority";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const inputRoundedVariants = cva(
  [
    "bg-white",
    "rounded-lg",
    "w-full",
    "focus:outline-none",
    "focus:ring-1",
    "border",
    "transition-colors",
  ],
  {
    variants: {
      variant: {
        primary: [
          "border-base-300",
          "focus:ring-primary-600",
          "focus:border-primary-600",
          "placeholder:text-base-400",
          "p-3",
        ],
        "primary-file": [
          "border-transparent",
          "focus:ring-primary-focus",
          "focus:border-primary-focus",
          "placeholder:text-base-400",
          "file:border-0",
          "file:bg-primary",
          "file:text-black",
          "file:font-medium",
          "file:p-3",
          "file:mr-3",
          "file:hover:bg-primary-600",
          "file:transition-colors",
        ],
        error: [
          "text-error-500",
          "border-error-500",
          "focus:ring-error-500",
          "focus:border-error-500",
          "placeholder:text-error-500",
          "p-3",
        ],
        "error-file": [
          "border-error",
          "focus:ring-error",
          "focus:border-error",
          "placeholder:text-error",
          "text-error",
          "file:border-0",
          "file:bg-error",
          "file:text-error-content",
          "file:font-medium",
          "file:p-3",
          "file:mr-3",
          "file:hover:bg-error-focus",
        ],
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

interface Props
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputRoundedVariants> {
  id: string;
  errorMessage?: string;
  placeholder?: string;
  /**
   * Icon to show before the placeholder/input text.
   */
  leadingIcon?: React.ReactNode;
  /**
   * Offset for the placeholder so that the text/placeholder starts after the icon.
   *
   * The placeholder offset must be a Tailwind pl-[value]
   */
  placeholderOffset?:
    | "pl-4"
    | "pl-5"
    | "pl-6"
    | "pl-7"
    | "pl-8"
    | "pl-9"
    | "pl-10"
    | "pl-11"
    | "pl-12"
    | "pl-14"
    | "pl-16"
    | "pl-20"
    | "pl-24"
    | "pl-28"
    | "pl-32"
    | "pl-36"
    | "pl-40";
}

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      children,
      variant,
      errorMessage,
      placeholder,
      leadingIcon,
      placeholderOffset,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-2">
        <div className="relative">
          {leadingIcon && (
            <div className="text-primary absolute left-3 top-1/2 -translate-y-1/2">
              {leadingIcon}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            className={twMerge(
              `${inputRoundedVariants({ variant })} ${
                placeholderOffset ? placeholderOffset : ""
              }`,
              className
            )}
            placeholder={placeholder}
            {...props}
          />

          {variant === "error" && (
            <ExclamationCircleIcon className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 text-error-500" />
          )}
        </div>

        {variant === "error" && errorMessage && (
          <div className="text-error-500 font-medium">{errorMessage}</div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
