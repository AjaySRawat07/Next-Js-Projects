import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-neutral-900 text-white shadow hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100",
        destructive:
          "bg-red-600 text-white shadow-xs hover:bg-red-700",
        outline:
          "border border-neutral-200 bg-white text-neutral-900 shadow-xs hover:bg-neutral-100 dark:border-neutral-800 dark:bg-transparent dark:text-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-white",
        secondary:
          "bg-neutral-100 text-neutral-900 shadow-xs hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700",
        ghost:
          "hover:bg-neutral-100 hover:text-neutral-900 text-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-neutral-100 dark:text-neutral-400",
        link:
          "text-neutral-900 underline-offset-4 hover:underline dark:text-white",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-lg px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

