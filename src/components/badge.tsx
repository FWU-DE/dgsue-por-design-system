import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/cn.ts';

const badgeVariants = cva(
  'inline-flex items-center rounded-(--por-badge-radius) border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 max-w-fit',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground shadow',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        destructive: 'border-transparent bg-destructive text-destructive-foreground shadow',
        outline: 'text-foreground',
        success: 'border-transparent bg-(--por-badge-success) text-(--por-badge-success-foreground)',
        info: 'border-transparent bg-(--por-badge-info) text-(--por-badge-info-foreground)',
        warning: 'border-transparent bg-(--por-badge-warning) text-(--por-badge-warning-foreground)',
        error: 'border-transparent bg-(--por-badge-error) text-(--por-badge-error-foreground)',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
