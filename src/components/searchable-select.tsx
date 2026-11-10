'use client';

import { useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from './input.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select.tsx';
import { cn } from '../lib/cn.ts';
import { matchesQuery } from '../lib/matches-query.ts';

export { matchesQuery };

export type SearchableOption = {
  value: string;
  label: string;
  /** Indentation level in the list, for options that form a tree. */
  depth?: number;
  /** Muted text after the label, shown in the list only and not searched. */
  detail?: string;
};

type SearchableSelectProps = {
  id?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: SearchableOption[];
  placeholder: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  /** Classes for the trigger, e.g. a fixed width in a filter bar. */
  className?: string;
  'aria-label'?: string;
};

// Select with an embedded filter input, same interaction as the school picker.
export function SearchableSelect({
  id,
  value,
  onValueChange,
  options,
  placeholder,
  searchPlaceholder = 'Suchen...',
  emptyText = 'Keine Treffer',
  disabled = false,
  className,
  'aria-label': ariaLabel,
}: SearchableSelectProps) {
  const [query, setQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const visible = new Set(
    options.filter((option) => matchesQuery(option.label, query)).map((option) => option.value),
  );
  // Given children, `SelectValue` shows them instead of the item's content, which keeps
  // indentation and details out of the closed trigger.
  const selected = options.find((option) => option.value === value);

  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      // Radix moves focus to the list on open, so the input has to take it back
      // one frame later; `autoFocus` alone loses that race.
      onOpenChange={(open) => {
        if (open) requestAnimationFrame(() => searchInputRef.current?.focus());
        else setQuery('');
      }}
    >
      <SelectTrigger
        id={id}
        aria-label={ariaLabel}
        className={cn('w-full flex gap-2 min-h-[44px]', className)}
      >
        <Search className="w-4 h-4 text-primary shrink-0" />
        <SelectValue placeholder={placeholder} className="flex-1 text-left">
          {selected?.label}
        </SelectValue>
      </SelectTrigger>
      {/* Cap at 300px, but never past the viewport edge, so the list scrolls
          instead of rendering unreachable options. */}
      <SelectContent className="max-h-[min(300px,var(--radix-select-content-available-height))] overflow-y-auto text-primary">
        <div className="px-2 py-1">
          <Input
            ref={searchInputRef}
            placeholder={searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full mb-2"
            // Pfeiltasten an die Liste durchlassen, alles andere bleibt im Suchfeld
            onKeyDown={(e) => {
              if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') e.stopPropagation();
            }}
            onClick={(e) => e.stopPropagation()}
            autoFocus
          />
        </div>

        {/* Non-matches stay mounted but hidden: Radix can only show the selected
            item's label in the trigger while that item is mounted. */}
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className={visible.has(option.value) ? undefined : 'hidden'}
          >
            <span style={option.depth ? { paddingLeft: option.depth * 12 } : undefined}>
              {option.label}
              {option.detail && <span className="text-muted-foreground"> · {option.detail}</span>}
            </span>
          </SelectItem>
        ))}
        {visible.size === 0 && (
          <div className="px-2 py-1 text-sm text-muted-foreground">{emptyText}</div>
        )}
      </SelectContent>
    </Select>
  );
}
