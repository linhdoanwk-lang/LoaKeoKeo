import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getPostBySlug } from "@/lib/catalog";
export const revalidate=60;
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const post=await getPostBySlug((await params).slug);return post?{title:post.seoTitle||`${post.title} — Âm Thanh Việt`,description:post.seoDescription||post.excerpt}:{title:"Không tìm thấy bài viết"}}
export default async function PostPage({params}:{params:Promise<{slug:string}>}){const post=await getPostBySlug((await params).slug);if(!post)notFound();return <main className="min-h-screen bg-[#080b10] text-white"><SiteHeader/><article className="mx-auto max-w-3xl px-5 py-12"><Link href="/blog" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white"><ChevronLeft size={17}/>Góc âm thanh</Link><p className="mt-10 text-sm text-[#ff9f43]">{new Date(post.createdAt).toLocaleDateString("vi-VN")}</p><h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">{post.title}</h1><p className="mt-6 text-xl leading-8 text-white/60">{post.excerpt}</p>{post.imageUrl&&<img src={post.imageUrl} alt={post.title} className="mt-10 aspect-[16/9] w-full rounded-3xl object-cover"/>}<div className="mt-10 whitespace-pre-wrap text-lg leading-9 text-white/75">{post.content}</div></article><SiteFooter/></main>}
