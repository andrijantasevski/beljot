import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const labelVariants = cva(
  "text-left leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 self-start",
  {
    variants: {
      fontWeight: {
        normal: "font-normal",
        medium: "font-medium",
        bold: "font-bold",
      },
      variant: {
        primary: ["text-black"],
        error: ["text-error-500"],
      },
      srOnly: {
        true: ["sr-only"],
      },
    },
    defaultVariants: {
      fontWeight: "normal",
      variant: "primary",
    },
  }
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, fontWeight, variant, srOnly, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={twMerge(
      labelVariants({ variant, fontWeight, srOnly }),
      className
    )}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
