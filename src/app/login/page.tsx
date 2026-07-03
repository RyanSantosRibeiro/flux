"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/* ============================================================
   Login Page — tela de autenticação do vendedor (mobile-first)
   ============================================================ */

export default function LoginPage() { 
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Protótipo: simula autenticação
    await new Promise((r) => setTimeout(r, 800));

    if (email && password) {
      router.push("/app/dashboard");
    } else {
      setError("Informe seu e-mail e senha.");
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Logo area */}
      <div
        className="animate-fade-up"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          padding: "40px 28px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div style={{
          position: "absolute", top: -60, right: -60, width: 200, height: 200,
          borderRadius: "50%", background: "rgba(255,255,255,0.04)",
        }} />
        <div style={{
          position: "absolute", bottom: 0, left: -40, width: 150, height: 150,
          borderRadius: "50%", background: "rgba(255,255,255,0.04)",
        }} />

        {/* Logo Icon */}
        <div
          style={{
            width: 84,
            height: 84,
            background: "rgba(255,255,255,0.12)",
            borderRadius: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <svg width="46" height="46" viewBox="0 0 44 44" fill="none">
            <path
              d="M8 8h28l-8 14h8L12 38l4-16H8L16 8z"
              fill="white"
              opacity="0.9"
            />
          </svg>
        </div>

        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              fontSize: 38,
              fontWeight: 800,
              color: "white",
              letterSpacing: -1,
              lineHeight: 1,
            }}
          >
            Flux
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginTop: 6 }}>
            Vendas B2B Inteligentes
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div
        className="animate-fade-up delay-2"
        style={{
          background: "var(--flux-surface)",
          borderRadius: "24px 24px 0 0",
          padding: "28px 24px 40px",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.2)",
        }}
      >
        <h2
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: "var(--flux-gray-900)",
            marginBottom: 4,
          }}
        >
          Bem-vindo de volta 👋
        </h2>
        <p style={{ color: "var(--flux-gray-500)", fontSize: 13, marginBottom: 24 }}>
          Faça login para acessar sua conta
        </p>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Email */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--flux-gray-700)" }}>
              E-mail
            </label>
            <div className="input-wrapper">
              <span className="input-icon">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zM4 8l8 5 8-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
              <input
                className="flux-input"
                type="email"
                placeholder="seu@email.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                id="login-email"
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--flux-gray-700)" }}>
              Senha
            </label>
            <div className="input-wrapper">
              <span className="input-icon">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
              <input
                className="flux-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                id="login-password"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <p style={{ color: "var(--flux-danger)", fontSize: 13, fontWeight: 600 }}>
              ⚠️ {error}
            </p>
          )}

          {/* Forgot */}
          <div style={{ textAlign: "right", marginTop: -4 }}>
            <span style={{ fontSize: 13, color: "var(--flux-blue)", fontWeight: 600, cursor: "pointer" }}>
              Esqueci minha senha
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            id="btn-login"
            className="btn btn-primary btn-full"
            disabled={loading}
            style={{ marginTop: 4 }}
          >
            {loading ? (
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{
                  width: 16, height: 16,
                  border: "2px solid rgba(255,255,255,0.4)",
                  borderTopColor: "white", borderRadius: "50%",
                  animation: "spin 0.7s linear infinite",
                  display: "inline-block",
                }} />
                Entrando...
              </span>
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "var(--flux-gray-500)" }}>
          Novo usuário?{" "}
          <span style={{ color: "var(--flux-blue)", fontWeight: 700, cursor: "pointer" }}>
            Solicite acesso
          </span>
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
