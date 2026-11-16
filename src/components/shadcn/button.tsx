import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/cn.ts';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-(length:--por-text-ui) leading-(--por-text-ui-leading) font-medium transition-colors focus-visible:outline-none focus-visible:ring-(length:--por-focus-ring-width) focus-visible:ring-ring focus-visible:ring-offset-(length:--por-focus-ring-offset) focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-(--por-button-shadow) hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-(--por-button-shadow) hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-(--por-button-shadow) hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-(--por-button-shadow) hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-(--por-control-height) px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-(length:--por-text-ui-sm) leading-(--por-text-ui-sm-leading)',
        md: 'h-9 rounded-md px-4',
        lg: 'h-(--por-control-height-lg) rounded-md px-8',
        icon: 'h-(--por-control-height) w-(--por-control-height)',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
