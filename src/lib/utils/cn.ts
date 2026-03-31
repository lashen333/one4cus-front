// src\lib\utils\cn.ts
// This utility function is used to combine class names in a way that is compatible with Tailwind CSS. It uses the `clsx` library to handle conditional class names and the `tailwind-merge` library to merge Tailwind CSS classes correctly, ensuring that conflicting classes are resolved properly.

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}