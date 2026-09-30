export type CartLine = { id: number; quantity: number };

export function getCart(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const value = JSON.parse(localStorage.getItem("atv-cart") || "[]") as Array<number | CartLine>;
    const lines = new Map<number, number>();
    value.forEach((item) => {
      const id = typeof item === "number" ? item : Number(item.id);
      const quantity = typeof item === "number" ? 1 : Math.max(1, Number(item.quantity) || 1);
      if (Number.isFinite(id)) lines.set(id, (lines.get(id) || 0) + quantity);
    });
    return [...lines].map(([id, quantity]) => ({ id, quantity }));
  } catch { return []; }
}

export function saveCart(lines: CartLine[]) {
  localStorage.setItem("atv-cart", JSON.stringify(lines.filter((line) => line.quantity > 0)));
  window.dispatchEvent(new Event("shop-change"));
}

export function addToCart(id: number) {
  id = Number(id);
  const lines = getCart();
  const existing = lines.find((line) => line.id === id);
  if (existing) existing.quantity += 1; else lines.push({ id, quantity: 1 });
  saveCart(lines);
}

export function getWishlist(): number[] {
  if (typeof window === "undefined") return [];
  try { return (JSON.parse(localStorage.getItem("atv-wishlist") || "[]") as number[]).map(Number).filter(Number.isFinite); }
  catch { return []; }
}

export function toggleWishlist(id: number) {
  id = Number(id);
  const items = getWishlist();
  const next = items.includes(id) ? items.filter((item) => item !== id) : [...items, id];
  localStorage.setItem("atv-wishlist", JSON.stringify(next));
  window.dispatchEvent(new Event("shop-change"));
  return next.includes(id);
}
