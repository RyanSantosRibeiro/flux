/* ============================================================
   Utilitários gerais do projeto
   ============================================================ */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge de classes Tailwind com resolução de conflitos.
 * Usa clsx para composição condicional e twMerge para deduplicação.
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-primary", className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formata uma data ISO para exibição em pt-BR.
 */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * Formata uma data relativa (ex: "há 2 dias").
 */
export function formatRelativeDate(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "hoje";
  if (diffDays === 1) return "ontem";
  if (diffDays < 7) return `há ${diffDays} dias`;
  if (diffDays < 30) return `há ${Math.floor(diffDays / 7)} sem.`;
  return formatDate(dateStr);
}

/**
 * Verifica se uma cantada é premium (ainda não liberada para free).
 */
export function isCantadaPremium(freeReleaseDate: string): boolean {
  return new Date(freeReleaseDate) > new Date();
}

/**
 * Gera um slug a partir de um texto.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Trunca um texto no limite de caracteres, quebrando na última palavra.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const trimmed = text.slice(0, maxLength);
  return trimmed.slice(0, trimmed.lastIndexOf(" ")) + "…";
}
