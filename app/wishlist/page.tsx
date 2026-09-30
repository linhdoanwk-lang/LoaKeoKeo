"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/catalog";
import { getWishlist } from "@/lib/shop-storage";
export default function WishlistPage(){const [products,setProducts]=useState<Product[]>([]);useEffect(()=>{const ids=getWishlist();fetch("/api/products").then(async r=>(await r.json()) as {products:Product[]}).then(data=>setProducts(data.products.filter(item=>ids.includes(Number(item.id)))))},[]);return <main className="min-h-screen bg-[#080b10] text-white"><SiteHeader/><section className="mx-auto max-w-7xl px-5 py-14 lg:px-8"><p className="text-sm uppercase tracking-[.2em] text-[#ff9f43]">Wishlist</p><h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Sản phẩm bạn yêu thích</h1>{products.length===0?<div className="mt-10 rounded-[1.75rem] border border-white/10 bg-white/[.03] p-10 text-center"><Heart className="mx-auto text-white/35" size={36}/><h2 className="mt-5 text-xl font-semibold">Chưa có sản phẩm được lưu</h2><p className="mt-2 text-white/50">Nhấn biểu tượng trái tim để lưu sản phẩm bạn quan tâm.</p><Link href="/collections" className="mt-6 inline-block rounded-full bg-[#ff9f43] px-6 py-3 font-semibold text-black">Xem collections</Link></div>:<div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{products.map((product,index)=><ProductCard key={product.id} product={product} index={index}/>)}</div>}</section><SiteFooter/></main>}
