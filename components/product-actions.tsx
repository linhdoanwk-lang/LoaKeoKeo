"use client";
import { useEffect, useState } from "react";
import { Check, Heart, ShoppingBag } from "lucide-react";
import { addToCart, getWishlist, toggleWishlist } from "@/lib/shop-storage";

export function ProductActions({ id, name }: { id: number; name: string }) {
  const [added,setAdded]=useState(false);
  const [wished,setWished]=useState(false);
  useEffect(()=>setWished(getWishlist().includes(id)),[id]);
  return <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto]"><button onClick={()=>{addToCart(id);setAdded(true)}} className="flex min-h-13 items-center justify-center gap-2 rounded-full bg-black px-7 font-semibold text-white hover:bg-[#222]">{added?<Check size={19}/>:<ShoppingBag size={19}/>} {added?"Đã thêm vào giỏ":`Thêm ${name} vào giỏ`}</button><button onClick={()=>setWished(toggleWishlist(id))} aria-label={wished?"Bỏ khỏi wishlist":"Thêm vào wishlist"} className="flex min-h-13 items-center justify-center gap-2 rounded-full border border-black/15 px-6 font-semibold hover:bg-black/10"><Heart size={19} className={wished?"fill-black text-black":""}/><span className="sm:hidden">{wished?"Đã lưu":"Lưu sản phẩm"}</span></button></div>;
}
