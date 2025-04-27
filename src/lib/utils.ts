import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SimpleError } from "./download";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isError<T>(err: SimpleError | T): err is SimpleError {
  return (err as SimpleError).message !== undefined;
}
