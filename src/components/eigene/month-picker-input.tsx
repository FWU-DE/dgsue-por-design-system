'use client';

import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Popover, PopoverAnchor, PopoverContent } from '../shadcn/popover.tsx';
import { Button } from '../shadcn/button.tsx';
import { inputClassName } from '../shadcn/input.tsx';
import { cn } from '../../lib/cn.ts';
import { assignRef } from '../../lib/assign-ref.ts';
import { MONTHS, formatMonth, isMonthBefore, parseMonth } from '../../lib/date-input.ts';

type MonthPickerInputProps = Omit<React.ComponentProps<'input'>, 'type' | 'onChange' | 'value'> & {
  /** `YYYY-MM`, or `''` when empty. */
  value: string;
  /** Called with `YYYY-MM`, or `''` when the user clears the field. */
  onChange: (value: string) => void;
  /** Earliest selectable month (the month of this date). */
  minDate?: Date;
};

export const MonthPickerInput = React.forwardRef<HTMLInputElement, MonthPickerInputProps>(
  function MonthPickerInput(
    { value, onChange, onBlur, disabled, minDate, className, ...props },
    forwardedRef,
  ) {
    const [open, setOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const selectedYear = value ? parseInt(value.slice(0, 4), 10) : new Date().getFullYear();
    const selectedMonth = value ? parseInt(value.slice(5, 7), 10) : undefined;

    const [viewYear, setViewYear] = React.useState(selectedYear);

    const [displayValue, setDisplayValue] = React.useState(formatMonth(value));
    const [isEditing, setIsEditing] = React.useState(false);

    React.useEffect(() => {
      if (!isEditing) setDisplayValue(formatMonth(value));
    }, [value, isEditing]);

    React.useEffect(() => {
      if (open && value) setViewYear(parseInt(value.slice(0, 4), 10));
    }, [open, value]);

    function commitEdit() {
      setIsEditing(false);
      const parsed = parseMonth(displayValue, minDate);

      if (parsed === null) {
        setDisplayValue(formatMonth(value));
      } else if (parsed !== value) {
        onChange(parsed);
      }
    }

    function handleSelectMonth(monthIndex: number) {
      const iso = `${viewYear}-${String(monthIndex + 1).padStart(2, '0')}`;
      setIsEditing(false);
      setDisplayValue(formatMonth(iso));
      onChange(iso);
      setOpen(false);
    }

    const now = new Date();

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverAnchor asChild>
          <div ref={containerRef} className="relative rounded-md">
            <input
              ref={(node) => assignRef(forwardedRef, node)}
              type="text"
              placeholder="MM.JJJJ"
              value={displayValue}
              onChange={(e) => {
                setDisplayValue(e.target.value);
                setIsEditing(true);
              }}
              onBlur={(e) => {
                commitEdit();
                onBlur?.(e);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  commitEdit();
                  setOpen(false);
                }
              }}
              onClick={() => {
                if (!disabled) setOpen(true);
              }}
              disabled={disabled}
              className={cn(inputClassName, 'h-(--por-picker-height) md:text-(length:--por-picker-text) md:leading-(--por-picker-text-leading)', className)}
              {...props}
            />
          </div>
        </PopoverAnchor>
        <PopoverContent
          align="start"
          className="w-auto p-3"
          onOpenAutoFocus={(e) => e.preventDefault()}
          // keep focus in the input while clicking a month; a blur mid-click
          // re-renders the form and can swallow the selection
          onMouseDown={(e) => e.preventDefault()}
          onInteractOutside={(e) => {
            if (e.target instanceof Node && containerRef.current?.contains(e.target)) {
              e.preventDefault();
            }
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8"
              aria-label="Vorheriges Jahr"
              onClick={() => setViewYear((y) => y - 1)}
              disabled={minDate ? viewYear <= minDate.getFullYear() : false}
            >
              <ChevronLeftIcon className="size-4" />
            </Button>
            <span className="text-sm font-medium select-none" aria-live="polite">
              {viewYear}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8"
              aria-label="Nächstes Jahr"
              onClick={() => setViewYear((y) => y + 1)}
            >
              <ChevronRightIcon className="size-4" />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {MONTHS.map((label, i) => {
              const isSelected = selectedMonth === i + 1 && selectedYear === viewYear;
              const isCurrentMonth = now.getMonth() === i && now.getFullYear() === viewYear;

              return (
                <Button
                  key={label}
                  type="button"
                  variant={isSelected ? 'default' : 'ghost'}
                  size="sm"
                  disabled={isMonthBefore(viewYear, i, minDate)}
                  aria-pressed={isSelected}
                  className={cn(
                    'h-8 text-xs',
                    isCurrentMonth && !isSelected && 'bg-accent text-accent-foreground',
                  )}
                  onClick={() => handleSelectMonth(i)}
                >
                  {label}
                </Button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    );
  },
);

MonthPickerInput.displayName = 'MonthPickerInput';
