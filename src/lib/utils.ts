import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SimpleError } from "./download";
import { Contract, Grant, Lease } from "./typing";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isError = (
  err: SimpleError | Grant[] | Contract[] | Lease[]
): err is SimpleError => {
  return (err as SimpleError).message !== undefined;
};
