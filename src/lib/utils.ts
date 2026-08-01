import { clsx } from 'clsx'
import type { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge conditional class names, letting later Tailwind utilities win. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Zero-pad a list index for editorial numbering: 1 -> "01". */
export function pad(index: number, length = 2) {
  return String(index).padStart(length, '0')
}
