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

export function isResponseOk(status: number): boolean {
  return 200 <= status && status < 300
}

export const createAudioSourceFromKey = (key: string) =>
  `https://cdn.brdsai.com/${key}`;

export function getTimeSinceUpdate(updatedAt: string) {
  const updatedUTC = new Date(updatedAt);
  const updated = new Date(
    updatedUTC.getTime() - updatedUTC.getTimezoneOffset() * 60000
  );
  const now = new Date();
  const timeDiff = now.getTime() - updated.getTime();

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (minutes > 0) {
    return `${minutes} ${
      minutes === 1 ? "minute" : "minutes"
    } ago`;
  } else {
    return `${seconds} ${
      seconds === 1 ? "second" : "seconds"
    } ago`;
  }
}
