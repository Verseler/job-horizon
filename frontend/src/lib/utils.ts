import { differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays } from 'date-fns';
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPreciseTimeFromNow(date: Date): string {
  const now = new Date();

  const seconds = Math.abs(differenceInSeconds(now, date));
  const minutes = Math.abs(differenceInMinutes(now, date));
  const hours = Math.abs(differenceInHours(now, date));
  const days = Math.abs(differenceInDays(now, date));

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else {
    return `${days} days ago`;
  }
}

export function capitalize<T>(string: T): T {
  if(typeof string !== "string") return string;

  return string.charAt(0).toUpperCase() + string.slice(1) as T;
}

export function getInitial(name: string): string {
  const givenName = name || "?";
  return givenName[0].toUpperCase();
}

export function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  }) as T;
}
