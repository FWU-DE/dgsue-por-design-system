'use client';

import * as React from 'react';
import { Calendar } from '../shadcn/calendar.tsx';
import { inputClassName } from '../shadcn/input.tsx';
import { Popover, PopoverAnchor, PopoverContent } from '../shadcn/popover.tsx';
import { cn } from '../../lib/cn.ts';
import { assignRef } from '../../lib/assign-ref.ts';
import { formatDate, parseDate, startOfDay, toIsoDate } from '../../lib/date-input.ts';

type DatePickerInputProps = Omit<React.ComponentProps<'input'>, 'type' | 'onChange'> & {
  /** `YYYY-MM-DD`, or `''` when empty. */
  value: string;
  /** Called with `YYYY-MM-DD`, or `''` when the user clears the field. */
  onChange: (value: string) => void;
  /** Earliest selectable day; the time of day is ignored. */
  minDate?: Date;
};

export const DatePickerInput = React.forwardRef<HTMLInputElement, DatePickerInputProps>(
  function DatePickerInput(
    { value, onChange, onBlur, disabled, minDate: minDateProp, className, ...props },
    forwardedRef,
  ) {
    const [open, setOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const minTime = minDateProp ? startOfDay(minDateProp).getTime() : undefined;
    const minDate = React.useMemo(
      () => (minTime === undefined ? undefined : new Date(minTime)),
      [minTime],
    );

    const [displayValue, setDisplayValue] = React.useState(formatDate(value));
    const [isEditing, setIsEditing] = React.useState(false);

    React.useEffect(() => {
      if (!isEditing) setDisplayValue(formatDate(value));
    }, [value, isEditing]);

    // While typing, the calendar follows a valid date; otherwise it shows the current value.
    const effectiveIso = parseDate(displayValue, minDate) || value;
    const selectedDate = effectiveIso ? new Date(`${effectiveIso}T00:00:00`) : undefined;

    const [calendarMonth, setCalendarMonth] = React.useState<Date>(
      () => selectedDate ?? minDate ?? new Date(),
    );

    React.useEffect(() => {
      setCalendarMonth(effectiveIso ? new Date(`${effectiveIso}T00:00:00`) : (minDate ?? new Date()));
    }, [effectiveIso, minDate]);

    function commitEdit() {
      setIsEditing(false);
      const parsed = parseDate(displayValue, minDate);

      if (parsed === null) {
        setDisplayValue(formatDate(value));
      } else if (parsed !== value) {
        onChange(parsed);
      }
    }

    function handleSelect(date: Date | undefined) {
      if (date) {
        const iso = toIsoDate(date);
        setIsEditing(false);
        setDisplayValue(formatDate(iso));
        onChange(iso);
      }

      setOpen(false);
    }

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverAnchor asChild>
          <div ref={containerRef} className="relative rounded-md">
            <input
              ref={(node) => assignRef(forwardedRef, node)}
              type="text"
              placeholder="TT.MM.JJJJ"
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
          className="w-auto p-0"
          onOpenAutoFocus={(e) => e.preventDefault()}
          // keep focus in the input while clicking inside the calendar; a blur
          // mid-click re-renders the form and can swallow the day selection
          onMouseDown={(e) => e.preventDefault()}
          onInteractOutside={(e) => {
            if (e.target instanceof Node && containerRef.current?.contains(e.target)) {
              e.preventDefault();
            }
          }}
        >
          <Calendar
            mode="single"
            month={calendarMonth}
            onMonthChange={setCalendarMonth}
            startMonth={minDate}
            selected={selectedDate}
            onSelect={handleSelect}
            disabled={minDate ? { before: minDate } : undefined}
          />
        </PopoverContent>
      </Popover>
    );
  },
);

DatePickerInput.displayName = 'DatePickerInput';
