import * as React from 'react';

import { cn } from '../../lib/cn.ts';

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table ref={ref} className={cn('w-full caption-bottom text-(length:--por-text-ui) leading-(--por-text-ui-leading)', className)} {...props} />
    </div>
  ),
);

Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      '[&_tr]:border-b [&_tr]:hover:bg-(--por-table-head-row-hover)! bg-(--por-table-head) text-(--por-table-header-foreground)',
      className,
    )}
    {...props}
  />
));

TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
));

TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
    {...props}
  />
));

TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
        className,
      )}
      {...props}
    />
  ),
);

TableRow.displayName = 'TableRow';

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  icon?: React.ReactNode;
  onIconClick?: () => void;
  /** Zugänglicher Name des Icon-Buttons, z. B. „Nach Name sortieren“. Nötig mit `onIconClick`. */
  iconLabel?: string;
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, icon, onIconClick, iconLabel, children, ...props }, ref) => (
    <th
      ref={ref}
      className={cn('h-10 px-2 text-left font-(weight:--por-table-head-weight) text-(--por-table-head-foreground)', className)}
      {...props}
    >
      <div className="flex gap-2">
        <span className="w-full">{children}</span>

        {icon && onIconClick ? (
          <button
            type="button"
            onClick={onIconClick}
            aria-label={iconLabel}
            className="cursor-pointer rounded-sm p-0 hover:text-(--por-table-head-icon-hover) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--por-table-head-foreground)"
          >
            {icon}
          </button>
        ) : (
          (icon ?? null)
        )}
      </div>
    </th>
  ),
);

TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn('p-2 align-middle [&:has([role=checkbox])]:pr-0', className)}
    {...props}
  />
));

TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn('mt-4 text-sm text-muted-foreground', className)} {...props} />
));

TableCaption.displayName = 'TableCaption';

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
