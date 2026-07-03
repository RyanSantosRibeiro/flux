import type { Pedido } from "@/lib/mock-data";

/* ============================================================
   StatusBadge — badge de status de pedido
   ============================================================ */

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  "Pedido Recebido": { label: "Pedido Recebido", className: "badge badge-info" },
  "Em Produção":     { label: "Em Produção",     className: "badge badge-warning" },
  "Em Separação":    { label: "Em Separação",    className: "badge badge-warning" },
  "Faturado":        { label: "Faturado",        className: "badge badge-teal" },
  "Em Transporte":   { label: "Em Transporte",   className: "badge badge-info" },
  "Entregue":        { label: "Entregue",        className: "badge badge-success" },
  "Cancelado":       { label: "Cancelado",       className: "badge badge-danger" },
};

export function StatusBadge({ status }: { status: string }) {
  const config = STATUS_CONFIG[status] ?? { label: status, className: "badge badge-gray" };
  return <span className={config.className}>{config.label}</span>;
}

/* ============================================================
   Utilitário: formata valor monetário
   ============================================================ */
export function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/* ============================================================
   Utilitário: formata data
   ============================================================ */
export function formatDate(date: Date) {
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/* ============================================================
   Utilitário: dias desde última compra
   ============================================================ */
export function diasDesdeCompra(date: Date): number {
  const diff = Date.now() - date.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}
