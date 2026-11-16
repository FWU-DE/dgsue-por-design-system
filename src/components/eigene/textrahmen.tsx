import * as React from 'react';
import { cn } from '../../lib/cn.ts';

interface TextrahmenProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'nrw-l-corners-sm',
  md: 'nrw-l-corners-md',
  lg: 'nrw-l-corners-lg',
} as const;

const Textrahmen = React.forwardRef<HTMLDivElement, TextrahmenProps>(
  ({ className, size = 'md', children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'nrw-l-corners bg-primary text-primary-foreground p-6',
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);

Textrahmen.displayName = 'Textrahmen';

export { Textrahmen };
