"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Heart, ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/catalog";
import { money } from "@/lib/format";
import { addToCart, getWishlist, toggleWishlist } from "@/lib/shop-storage";
const fallbackImages = ["/banner-home-speaker.webp", "/banner-portable-speaker.webp", "/banner-soundbar.webp"];

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [added, setAdded] = useState(false);
  const [wished, setWished] = useState(false);
  useEffect(() => setWished(getWishlist().includes(Number(product.id))), [product.id]);
  const image = product.imageUrl || fallbackImages[index % fallbackImages.length];

  function add() {
    addToCart(product.id);
    setAdded(true);
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-black/10 bg-white">
      <div className="relative aspect-square overflow-hidden bg-[#f7f7f5]">
        <Link href={`/products/${product.slug}`} aria-label={`Xem ${product.name}`} className="absolute inset-0 p-5">
          <img src={image} alt={product.name} loading="lazy" decoding="async" className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.04]" />
        </Link>
        <button
          type="button"
          onClick={() => setWished(toggleWishlist(product.id))}
          aria-label={wished ? `Bỏ ${product.name} khỏi wishlist` : `Thêm ${product.name} vào wishlist`}
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white/90 text-black shadow-sm backdrop-blur hover:bg-black hover:text-white"
        >
          <Heart size={18} className={wished ? "fill-current" : ""} />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs text-black/40">{product.collectionName ?? "Sản phẩm mới"}</p>
        <Link href={`/products/${product.slug}`} className="mt-2 line-clamp-2 min-h-12 text-[17px] font-semibold leading-6 hover:underline">
          {product.name}
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-semibold">{money(product.price)}</span>
          {product.comparePrice && <del className="text-xs text-black/35">{money(product.comparePrice)}</del>}
        </div>
        <button
          type="button"
          onClick={add}
          className={`mt-5 flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold transition ${added ? "border-black bg-black text-white" : "border-black/10 text-black hover:border-black hover:bg-black hover:text-white"}`}
        >
          <span>{added ? "Đã thêm vào giỏ" : "Thêm vào giỏ"}</span>
          {added ? <Check size={18} /> : <ShoppingCart size={18} />}
        </button>
      </div>
    </article>
  );
}
