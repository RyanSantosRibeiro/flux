"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/* ============================================================
   BottomNavigation — barra de navegação inferior do app
   ============================================================ */

const NAV_ITEMS = [
  {
    href: "/app/dashboard",
    label: "Início",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path
          d="M3 12L12 3l9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/app/produtos",
    label: "Produtos",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path
          d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/app/pedidos",
    label: "Pedidos",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/app/clientes",
    label: "Clientes",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path
          d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/app/mais",
    label: "Mais",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="1" stroke="currentColor" strokeWidth="2" />
        <circle cx="19" cy="12" r="1" stroke="currentColor" strokeWidth="2" />
        <circle cx="5" cy="12" r="1" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`bottom-nav-item ${isActive ? "active" : ""}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
