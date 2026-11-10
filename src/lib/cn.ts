import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Führt Tailwind-Klassen zusammen; spätere Klassen überschreiben frühere (z. B. `className`-Props). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
