import { clsx, type ClassValue } from "clsx";
import { Oi } from "next/font/google";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const oi = Oi({ subsets: ["latin"], weight: ["400"] });
