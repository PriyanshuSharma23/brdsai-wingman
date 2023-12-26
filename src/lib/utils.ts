import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseTimestamp(timestamp: number, segments: 2 | 3): string {
  if (timestamp < 0 || segments <= 0) {
    throw new Error(
      "Invalid input. Timestamp must be non-negative and segments must be positive.",
    );
  }

  const hours = Math.floor(timestamp / 3600);
  const minutes = Math.floor((timestamp % 3600) / 60);
  const seconds = Math.floor(timestamp % 60);

  // Add hours segment if greater than 0 and segments > 1
  if (segments === 2) {
    return (
      `${hours * 60 + minutes}`.padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0")
    );
  } else {
    return (
      hours.toString().padStart(2, "0") +
      ":" +
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0")
    );
  }
}
