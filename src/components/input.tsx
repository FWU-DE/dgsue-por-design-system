import * as React from 'react';

import { cn } from '../lib/cn.ts';

/** Basis-Klassen für Texteingaben; auch von DatePickerInput und MonthPickerInput genutzt. */
export const inputClassName =
  'flex h-(--por-control-height) w-full rounded-md border border-input bg-transparent px-3 py-2 text-base md:text-(length:--por-text-ui) md:leading-(--por-text-ui-leading) text-(--por-input-foreground) shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-2 aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:ring-destructive';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return <input type={type} className={cn(inputClassName, className)} ref={ref} {...props} />;
  },
);

Input.displayName = 'Input';

export { Input };
