"use client";

import { useState } from "react";
import { mockPedidos } from "@/lib/mock-data";
import { PageHeader } from "@/components/navigation/PageHeader";
import { StatusBadge, formatBRL, formatDate } from "@/components/ui/StatusBadge";

/* ============================================================
   Pedidos Page — histórico de pedidos com filtros de status
   ============================================================ */

const FILTROS = ["Todos", "Em andamento", "Finalizados"];

const EM_ANDAMENTO = ["Pedido Recebido", "Em Produção", "Em Separação", "Faturado", "Em Transporte"];
const FINALIZADOS = ["Entregue", "Cancelado"];

export default function PedidosPage() {
  const [filtro, setFiltro] = useState("Todos");

  const filtered = mockPedidos.filter((p) => {
    if (filtro === "Em andamento") return EM_ANDAMENTO.includes(p.status);
    if (filtro === "Finalizados") return FINALIZADOS.includes(p.status);
    return true;
  });

  return (
    <div style={{ background: "var(--flux-bg)", minHeight: "100%" }}>
      <PageHeader title="Histórico de Pedidos" />

      <div style={{ padding: "12px 16px" }}>
        {/* Filter Tabs */}
        <div className="filter-pills" style={{ marginBottom: 16 }}>
          {FILTROS.map((f) => (
            <button
              key={f}
              className={`filter-pill ${filtro === f ? "active" : ""}`}
              onClick={() => setFiltro(f)}
              style={{ border: "none", fontFamily: "Manrope, sans-serif" }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Orders */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map((pedido) => (
            <div key={pedido.id} className="flux-card" style={{ padding: "14px 16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ fontWeight: 800, fontSize: 15, color: "var(--flux-gray-900)" }}>
                    Pedido #{pedido.numero_pedido}
                  </p>
                  <p style={{ fontSize: 12, color: "var(--flux-gray-500)", marginTop: 2 }}>
                    {formatDate(pedido.created_at)}
                  </p>
                </div>
                <StatusBadge status={pedido.status} />
              </div>

              <div className="flux-divider" style={{ margin: "12px 0" }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "var(--flux-gray-600)", fontWeight: 500 }}>
                  {pedido.cliente}
                </span>
                <span style={{ fontWeight: 800, fontSize: 16, color: "var(--flux-navy)" }}>
                  {formatBRL(pedido.total)}
                </span>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <span style={{ fontSize: 48 }}>📋</span>
              <p style={{ color: "var(--flux-gray-500)", marginTop: 12, fontWeight: 600 }}>
                Nenhum pedido nesta categoria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
