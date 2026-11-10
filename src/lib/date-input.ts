/**
 * Parsing and formatting for DatePickerInput and MonthPickerInput.
 * Values are ISO strings: `YYYY-MM-DD` for dates, `YYYY-MM` for months.
 */

export const MONTHS = [
  'Jan',
  'Feb',
  'Mär',
  'Apr',
  'Mai',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Okt',
  'Nov',
  'Dez',
] as const;

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

/** Local midnight of `date`, so day comparisons ignore the time of day. */
export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** `Date` -> `YYYY-MM-DD` in local time. */
export function toIsoDate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** `YYYY-MM-DD` -> `DD.MM.YYYY`; anything else -> `''`. */
export function formatDate(value: string): string {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return match ? `${match[3]}.${match[2]}.${match[1]}` : '';
}

/**
 * Parses what the user typed (`D.M.YYYY` or `DD.MM.YYYY`).
 * Returns `''` for an empty field (cleared), the ISO date for a valid input and
 * `null` for anything invalid or before `minDate` (compared by day).
 */
export function parseDate(input: string, minDate?: Date): string | null {
  const text = input.trim();
  if (text === '') return '';

  const match = text.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  if (!match) return null;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }
  if (minDate && date < startOfDay(minDate)) return null;

  return toIsoDate(date);
}

/** `YYYY-MM` -> `Mär 2026`; anything else -> `''`. */
export function formatMonth(value: string): string {
  const match = value.match(/^(\d{4})-(\d{2})$/);
  const label = match ? MONTHS[Number(match[2]) - 1] : undefined;
  return label ? `${label} ${match![1]}` : '';
}

/** True when the month (0-based `monthIndex`) lies before the month of `minDate`. */
export function isMonthBefore(year: number, monthIndex: number, minDate?: Date): boolean {
  if (!minDate) return false;
  return (
    year < minDate.getFullYear() ||
    (year === minDate.getFullYear() && monthIndex < minDate.getMonth())
  );
}

/**
 * Parses `MM.YYYY` or `Mär 2026`.
 * Returns `''` for an empty field, the ISO month for a valid input and `null`
 * for anything invalid or before the month of `minDate`.
 */
export function parseMonth(input: string, minDate?: Date): string | null {
  const text = input.trim();
  if (text === '') return '';

  let year: number;
  let monthIndex: number;

  const numeric = text.match(/^(\d{1,2})\.(\d{4})$/);
  const named = text.match(/^(\S+)\s+(\d{4})$/);
  if (numeric) {
    monthIndex = Number(numeric[1]) - 1;
    year = Number(numeric[2]);
    if (monthIndex < 0 || monthIndex > 11) return null;
  } else if (named) {
    monthIndex = MONTHS.findIndex((m) => m.toLowerCase() === named[1]!.toLowerCase());
    year = Number(named[2]);
    if (monthIndex < 0) return null;
  } else {
    return null;
  }

  if (isMonthBefore(year, monthIndex, minDate)) return null;
  return `${year}-${pad(monthIndex + 1)}`;
}
