"use client";

import { useEffect, useState } from "react";
import { Check, Heart, Minus, Plus } from "lucide-react";
import { addToCart, getWishlist, toggleWishlist } from "@/lib/shop-storage";

export function ProductActions({ id, name }: { id: number; name: string }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [wished, setWished] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setWished(getWishlist().includes(id)));
  }, [id]);

  function add() {
    addToCart(id, quantity);
    setAdded(true);
  }

  return (
    <div className="mt-7 flex flex-wrap gap-3">
      <div className="grid h-12 grid-cols-[40px_40px_40px] overflow-hidden rounded-lg border border-black/25" aria-label="Số lượng sản phẩm">
        <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Giảm số lượng" className="grid place-items-center hover:bg-black/[.05]"><Minus size={16} /></button>
        <output className="grid place-items-center text-sm font-semibold" aria-live="polite">{quantity}</output>
        <button type="button" onClick={() => setQuantity((value) => value + 1)} aria-label="Tăng số lượng" className="grid place-items-center hover:bg-black/[.05]"><Plus size={16} /></button>
      </div>
      <button type="button" onClick={add} className="min-h-12 flex-1 rounded-lg bg-black px-7 text-sm font-semibold uppercase tracking-wide text-white hover:bg-[#222] sm:min-w-52">
        {added ? <span className="inline-flex items-center gap-2"><Check size={17} />Đã thêm {quantity} sản phẩm</span> : "Thêm vào giỏ"}
      </button>
      <button type="button" onClick={() => setWished(toggleWishlist(id))} aria-label={wished ? `Bỏ ${name} khỏi wishlist` : `Thêm ${name} vào wishlist`} className="grid h-12 w-12 place-items-center rounded-lg border border-black/25 hover:bg-black/[.05]">
        <Heart size={19} className={wished ? "fill-black text-black" : ""} />
      </button>
    </div>
  );
}
