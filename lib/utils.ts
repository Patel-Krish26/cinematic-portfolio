import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}
export function formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString("en-IN", { day:"2-digit", month:"long", year:"numeric" });
}
export function clamp(n: number, min: number, max: number): number {
    return Math.min(Math.max(n, min), max);
}
export function random(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}
