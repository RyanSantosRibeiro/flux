"use client";

import Link from "next/link";
import { mockPedidos, mockClientes, mockUser } from "@/lib/mock-data";
import { StatusBadge, formatBRL, formatDate, diasDesdeCompra } from "@/components/ui/StatusBadge";

/* ============================================================
   Dashboard — tela principal do app do vendedor
   ============================================================ */

export default function DashboardPage() {
  const recentOrders = mockPedidos.slice(0, 3);
  const inactiveClients = mockClientes.filter(
    (c) => diasDesdeCompra(c.ultima_compra) >= 30
  );

  return (
    <div style={{ background: "var(--flux-bg)", minHeight: "100%" }}>
      {/* Header Azul */}
      <div
        style={{
          background: "linear-gradient(135deg, var(--flux-navy) 0%, var(--flux-navy-light) 100%)",
          padding: "20px 20px 32px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Círculos decorativos */}
        <div
          style={{
            position: "absolute", top: -40, right: -40, width: 140, height: 140,
            borderRadius: "50%", background: "rgba(255,255,255,0.05)",
          }}
        />
        <div
          style={{
            position: "absolute", top: 20, right: 20, width: 80, height: 80,
            borderRadius: "50%", background: "rgba(255,255,255,0.05)",
          }}
        />

        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, marginBottom: 2 }}>
              Olá, Vendedor! 👋
            </p>
            <h2 style={{ color: "white", fontSize: 20, fontWeight: 800 }}>
              {mockUser.nome.split(" ")[0]}
            </h2>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {/* Notification Bell */}
            <button
              style={{
                width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.12)",
                border: "none", display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", position: "relative",
              }}
              id="btn-notifications"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {inactiveClients.length > 0 && (
                <span
                  style={{
                    position: "absolute", top: 6, right: 7, width: 8, height: 8,
                    background: "var(--flux-warning)", borderRadius: "50%",
                    border: "2px solid var(--flux-navy)",
                  }}
                />
              )}
            </button>
            {/* Avatar */}
            <div
              style={{
                width: 40, height: 40, borderRadius: 12, background: "var(--flux-teal)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 800, fontSize: 15, color: "white",
              }}
            >
              JV
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {[
            { label: "Novos Pedidos", value: "12", delta: "+3" },
            { label: "Clientes", value: "32", delta: "+8%" },
            { label: "Faturamento", value: "R$48k", delta: "+5%" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "rgba(255,255,255,0.1)", borderRadius: 12,
                padding: "12px 10px", textAlign: "center",
                backdropFilter: "blur(4px)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <p style={{ fontSize: 18, fontWeight: 800, color: "white" }}>{stat.value}</p>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>{stat.label}</p>
              <p style={{ fontSize: 11, color: "var(--flux-teal)", fontWeight: 700, marginTop: 2 }}>
                {stat.delta}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "0 16px", marginTop: -8 }}>

        {/* Alerta de inatividade */}
        {inactiveClients.length > 0 && (
          <div className="alert-card warning animate-fade-up" style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 22 }}>⚠️</span>
            <div>
              <p style={{ fontWeight: 700, fontSize: 13, color: "#92400e" }}>
                {inactiveClients.length} cliente{inactiveClients.length > 1 ? "s" : ""} sem compras há mais de 30 dias
              </p>
              <p style={{ fontSize: 12, color: "#b45309", marginTop: 2 }}>
                {inactiveClients.map((c) => c.razao_social_nome).join(", ")}
              </p>
              <Link href="/app/clientes" style={{ fontSize: 12, color: "#92400e", fontWeight: 700, textDecoration: "underline", marginTop: 4, display: "inline-block" }}>
                Ver clientes →
              </Link>
            </div>
          </div>
        )}

        {/* Acesso Rápido */}
        <div className="animate-fade-up delay-1" style={{ marginBottom: 20 }}>
          <div className="section-header">
            <span className="section-title">Acesso Rápido</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            {[
              { label: "Novo Pedido", href: "/app/produtos", emoji: "📋", color: "#dbeafe", textColor: "var(--flux-blue)" },
              { label: "Catálogo",   href: "/app/produtos", emoji: "🗂️", color: "#dcfce7", textColor: "#16a34a" },
              { label: "Clientes",  href: "/app/clientes", emoji: "👥", color: "#fef3c7", textColor: "#d97706" },
              { label: "Histórico", href: "/app/pedidos",  emoji: "📊", color: "#f3e8ff", textColor: "#9333ea" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  background: item.color, borderRadius: 14, padding: "14px 6px",
                  display: "flex", flexDirection: "column", alignItems: "center",
                  gap: 6, textDecoration: "none", transition: "transform 0.15s ease",
                }}
              >
                <span style={{ fontSize: 24 }}>{item.emoji}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: item.textColor, textAlign: "center", lineHeight: 1.2 }}>
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Pedidos Recentes */}
        <div className="animate-fade-up delay-2" style={{ marginBottom: 20 }}>
          <div className="section-header">
            <span className="section-title">Pedidos Recentes</span>
            <Link href="/app/pedidos" className="section-link">Ver todos</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {recentOrders.map((order) => (
              <div key={order.id} className="order-card">
                <div>
                  <p style={{ fontWeight: 700, fontSize: 14, color: "var(--flux-gray-900)" }}>
                    Pedido #{order.numero_pedido}
                  </p>
                  <p style={{ fontSize: 12, color: "var(--flux-gray-500)", marginTop: 2 }}>
                    {order.cliente}
                  </p>
                </div>
                <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <StatusBadge status={order.status} />
                  <p style={{ fontWeight: 800, fontSize: 14, color: "var(--flux-navy)" }}>
                    {formatBRL(order.total)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Banner Assistente IA */}
        <div
          className="animate-fade-up delay-3"
          style={{
            background: "linear-gradient(135deg, #0d47a1, #1565c0)",
            borderRadius: 20, padding: "20px 20px",
            marginBottom: 24, position: "relative", overflow: "hidden",
          }}
        >
          <div style={{
            position: "absolute", right: -10, top: -10, width: 100, height: 100,
            background: "rgba(255,255,255,0.05)", borderRadius: "50%",
          }} />
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <span style={{ fontSize: 36 }}>🤖</span>
            <div>
              <p style={{ fontWeight: 800, fontSize: 15, color: "white" }}>
                Assistente de Pedidos IA
              </p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 4, lineHeight: 1.5 }}>
                Dite ou escreva o pedido em texto livre e a IA monta o carrinho automaticamente.
              </p>
              <Link
                href="/app/produtos"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 4, marginTop: 12,
                  background: "white", color: "var(--flux-navy)", fontSize: 13,
                  fontWeight: 700, padding: "8px 16px", borderRadius: 10, textDecoration: "none",
                }}
              >
                ✨ Experimentar
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
