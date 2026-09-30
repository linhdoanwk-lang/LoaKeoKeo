import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ShieldCheck, Truck, Waves } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductActions } from "@/components/product-actions";
import { ProductGallery } from "@/components/product-gallery";
import { getProductBySlug } from "@/lib/catalog";
import { money } from "@/lib/format";
export const revalidate = 60;
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const product=await getProductBySlug(slug);return product?{title:product.seoTitle||`${product.name} — Âm Thanh Việt`,description:product.seoDescription||product.description}:{title:"Không tìm thấy sản phẩm"}}
export default async function ProductPage({params}:{params:Promise<{slug:string}>}) { const {slug}=await params; const product=await getProductBySlug(slug); if(!product) notFound(); const images=product.imageUrls?.length?product.imageUrls:product.imageUrl?[product.imageUrl]:[]; return <main className="min-h-screen bg-[#050505] text-white"><SiteHeader/><section className="mx-auto max-w-7xl px-5 py-8 lg:px-8"><Link href="/collections" className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-white"><ChevronLeft size={17}/>Quay lại sản phẩm</Link><div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center"><ProductGallery images={images} name={product.name}/><div><p className="text-sm uppercase tracking-[.18em] text-[#ffffff]">{product.collectionName??"Sản phẩm nổi bật"}</p><h1 className="mt-3 text-5xl font-semibold tracking-[-.045em] sm:text-6xl">{product.name}</h1><p className="mt-6 text-lg leading-8 text-white/60">{product.description}</p><div className="mt-7 flex items-center gap-3"><span className="text-3xl font-semibold text-[#ffffff]">{money(product.price)}</span>{product.comparePrice&&<del className="text-white/35">{money(product.comparePrice)}</del>}</div><ProductActions id={product.id} name={product.name}/><div className="mt-10 grid gap-4 border-t border-white/10 pt-7 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">{[[Waves,"Âm thanh tuyển chọn"],[Truck,"Giao hàng toàn quốc"],[ShieldCheck,"Bảo hành rõ ràng"]].map(([Icon,label])=><div key={String(label)} className="flex items-center gap-3 text-sm text-white/55"><Icon size={19} className="text-[#ffffff]"/>{String(label)}</div>)}</div></div></div></section><SiteFooter/></main>; }
