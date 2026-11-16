import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/cn.ts';

const cardVariants = cva('rounded-(--por-card-radius) border shadow px-4 py-3', {
  variants: {
    variant: {
      default: 'bg-card text-card-foreground border-border',
      success:
        'bg-(--por-card-success) text-(--por-card-success-foreground) border-(--por-card-success-border)',
      warning:
        'bg-(--por-card-warning) text-(--por-card-warning-foreground) border-(--por-card-warning-border)',
      error: 'bg-(--por-card-error) text-(--por-card-error-foreground) border-(--por-card-error-border)',
      info: 'bg-(--por-card-info) text-(--por-card-info-foreground) border-(--por-card-info-border)',
      accented: 'bg-card text-card-foreground border-border nrw-l-corners nrw-l-corners-md',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={cn(cardVariants({ variant }), className)} {...props} />
  ),
);

Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  ),
);

CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-row items-center gap-(--por-card-title-gap) text-(length:--por-card-title-size) font-semibold leading-none tracking-tight',
        className,
      )}
      {...props}
    />
  ),
);

CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-(length:--por-text-ui) leading-(--por-text-ui-leading) text-muted-foreground', className)} {...props} />
  ),
);

CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('px-(--por-card-content-padding) pb-(--por-card-content-padding) space-y-2', className)} {...props} />
  ),
);

CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  ),
);

CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
