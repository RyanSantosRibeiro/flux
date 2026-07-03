"use client";

import { useState } from "react";
import { mockClientes } from "@/lib/mock-data";
import { PageHeader } from "@/components/navigation/PageHeader";
import { diasDesdeCompra, formatDate } from "@/components/ui/StatusBadge";

/* ============================================================
   Clientes Page — lista de clientes com alerta de inatividade
   ============================================================ */

export default function ClientesPage() {
  const [query, setQuery] = useState("");

  const filtered = mockClientes.filter((c) =>
    c.razao_social_nome.toLowerCase().includes(query.toLowerCase()) ||
    c.cnpj_cpf.includes(query)
  );

  return (
    <div style={{ background: "var(--flux-bg)", minHeight: "100%" }}>
      <PageHeader
        title="Clientes"
        rightSlot={
          <button
            style={{
              width: 36, height: 36, borderRadius: 10, background: "var(--flux-blue)",
              border: "none", color: "white", display: "flex", alignItems: "center",
              justifyContent: "center", cursor: "pointer", fontWeight: 800, fontSize: 20,
            }}
            id="btn-novo-cliente"
          >
            +
          </button>
        }
      />

      <div style={{ padding: "12px 16px" }}>
        {/* Search */}
        <div className="input-wrapper" style={{ marginBottom: 16 }}>
          <span className="input-icon">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
              <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <input
            className="search-bar"
            type="text"
            placeholder="Buscar cliente, CNPJ..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            id="search-clientes"
          />
        </div>

        {/* Client Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map((cliente) => {
            const dias = diasDesdeCompra(cliente.ultima_compra);
            const inativo = dias >= 30;

            return (
              <div
                key={cliente.id}
                className="flux-card"
                style={{
                  padding: "14px 16px",
                  borderColor: inativo ? "rgba(245,144,0,0.3)" : undefined,
                }}
              >
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  {/* Avatar */}
                  <div
                    style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: inativo ? "rgba(245,144,0,0.1)" : "rgba(30,136,229,0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 800, fontSize: 16, flexShrink: 0,
                      color: inativo ? "var(--flux-warning)" : "var(--flux-blue)",
                    }}
                  >
                    {cliente.razao_social_nome.charAt(0).toUpperCase()}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 700, fontSize: 14, color: "var(--flux-gray-900)" }}>
                      {cliente.razao_social_nome}
                    </p>
                    <p style={{ fontSize: 12, color: "var(--flux-gray-500)", marginTop: 2 }}>
                      {cliente.cnpj_cpf}
                    </p>
                    <p style={{ fontSize: 12, color: "var(--flux-gray-400)", marginTop: 1 }}>
                      {cliente.endereco_rua}, {cliente.endereco_numero} · {cliente.endereco_bairro}
                    </p>
                  </div>

                  {/* Last order */}
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    {inativo ? (
                      <span className="badge badge-warning">⚠️ {dias}d</span>
                    ) : (
                      <span className="badge badge-success">{dias}d atrás</span>
                    )}
                  </div>
                </div>

                {inativo && (
                  <div
                    style={{
                      marginTop: 10, padding: "8px 12px", background: "rgba(245,144,0,0.08)",
                      borderRadius: 8, fontSize: 12, color: "#92400e", fontWeight: 600,
                    }}
                  >
                    ⚠️ Sem compras há {dias} dias — considere entrar em contato!
                  </div>
                )}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <span style={{ fontSize: 48 }}>👥</span>
              <p style={{ color: "var(--flux-gray-500)", marginTop: 12, fontWeight: 600 }}>
                Nenhum cliente encontrado
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
