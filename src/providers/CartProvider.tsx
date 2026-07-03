"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { CartItem, Produto } from "@/lib/mock-data";

/* ============================================================
   CartContext — gerenciamento do carrinho de compras
   ============================================================ */

interface CartContextValue {
  items: CartItem[];
  addItem: (produto: Produto) => void;
  removeItem: (produtoId: string) => void;
  updateQty: (produtoId: string, qty: number) => void;
  clearCart: () => void;
  total: number;
  subtotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (produto: Produto) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.produto.id === produto.id);
      if (existing) {
        return prev.map((i) =>
          i.produto.id === produto.id
            ? { ...i, quantidade: i.quantidade + 1 }
            : i
        );
      }
      return [...prev, { produto, quantidade: 1 }];
    });
  };

  const removeItem = (produtoId: string) => {
    setItems((prev) => prev.filter((i) => i.produto.id !== produtoId));
  };

  const updateQty = (produtoId: string, qty: number) => {
    if (qty <= 0) {
      removeItem(produtoId);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.produto.id === produtoId ? { ...i, quantidade: qty } : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const subtotal = items.reduce(
    (acc, item) => acc + item.produto.preco * item.quantidade,
    0
  );
  const total = subtotal; // desconto zerado no protótipo
  const itemCount = items.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQty, clearCart, total, subtotal, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
