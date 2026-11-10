import type { ForwardedRef } from 'react';

/** Setzt einen weitergereichten Ref (Callback- oder Objekt-Ref) auf `node`. */
export function assignRef<T>(ref: ForwardedRef<T>, node: T | null) {
  if (ref instanceof Function) {
    ref(node);
  } else if (ref) {
    ref.current = node;
  }
}
