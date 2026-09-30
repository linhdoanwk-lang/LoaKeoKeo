"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  AudioLines,
  Bluetooth,
  Cable,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  CloudSun,
  MicVocal,
  PackageSearch,
  RadioTower,
  Speaker,
  Volume2,
  Wifi,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import type { Product } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { ProductBannerCarousel } from "@/components/product-banner-carousel";

const promotions = [
  { eyebrow: "Âm thanh linh hoạt", title: "Loa di động\ncho mọi hành trình", image: "/banner-portable-speaker.webp", tone: "bg-[#f1f4f7]" },
  { eyebrow: "Tối giản không gian", title: "Âm thanh trọn vẹn\ncho ngôi nhà", image: "/banner-home-speaker.webp", tone: "bg-[#f7f5f1]" },
  { eyebrow: "Điện ảnh tại gia", title: "Soundbar\nđầy nội lực", image: "/banner-soundbar.webp", tone: "bg-[#f2f5ef]" },
];

const featuredCategories = [
  { name: "Loa Bluetooth", icon: Bluetooth },
  { name: "Loa di động", icon: Volume2 },
  { name: "Loa để bàn", icon: Speaker },
  { name: "Loa karaoke", icon: MicVocal },
  { name: "Soundbar", icon: AudioLines },
  { name: "Subwoofer", icon: CircleDot },
  { name: "Loa ngoài trời", icon: CloudSun },
  { name: "Loa thông minh", icon: Wifi },
  { name: "Dàn âm thanh", icon: RadioTower },
  { name: "Phụ kiện", icon: Cable },
];

export function HomeShowcase() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <PromotionTiles />
      <FeaturedProducts />
      <ProductBannerCarousel bannerPosition="left" />
      <FeaturedCategories />
    </div>
  );
}

export function PromotionTiles() {
  return (
    <section aria-label="Khám phá danh mục" className="grid gap-5 md:grid-cols-[.85fr_1.7fr_.85fr]">
      {promotions.map((item, index) => (
        <Link
          key={item.title}
          href="/collections"
          className={`group relative min-h-56 overflow-hidden rounded-3xl border border-black/[.06] ${item.tone}`}
        >
          <Image
            src={item.image}
            alt=""
            fill
            loading="eager"
            sizes={index === 1 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"}
            className="object-cover object-[68%_center] transition duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent" />
          <span className="relative z-10 flex min-h-56 max-w-[68%] flex-col justify-center p-7">
            <span className="text-xs font-semibold uppercase tracking-[.16em] text-black/45">{item.eyebrow}</span>
            <span className="mt-3 whitespace-pre-line text-2xl font-semibold leading-tight tracking-tight">{item.title}</span>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">Khám phá <ArrowRight size={16} /></span>
          </span>
        </Link>
      ))}
    </section>
  );
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCollection, setActiveCollection] = useState("Tất cả");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/products?featured=true&limit=12", {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("products_failed");
        return (await response.json()) as { products: Product[] };
      })
      .then((data) => setProducts(data.products))
      .catch((reason: unknown) => {
        if (!(reason instanceof DOMException && reason.name === "AbortError")) setError(true);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const collections = useMemo(
    () => ["Tất cả", ...Array.from(new Set(products.map((item) => item.collectionName).filter(Boolean) as string[]))],
    [products],
  );
  const visibleProducts = activeCollection === "Tất cả" ? products : products.filter((item) => item.collectionName === activeCollection);

  return (
    <section id="san-pham" className="featured-products pt-16" aria-labelledby="featured-products-title">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-black/45">Được yêu thích</p>
          <h2 id="featured-products-title" className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Sản phẩm nổi bật</h2>
        </div>
        <div className="scrollbar-none flex max-w-full gap-2 overflow-x-auto pb-1" aria-label="Lọc theo collection">
          {collections.map((collection) => (
            <button
              key={collection}
              type="button"
              onClick={() => setActiveCollection(collection)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ${activeCollection === collection ? "bg-black text-white" : "text-black/50 hover:bg-black/[.05] hover:text-black"}`}
            >
              {collection}
            </button>
          ))}
          <Link href="/collections" className="shrink-0 rounded-full px-4 py-2 text-sm font-medium text-black/50 hover:text-black">Xem tất cả</Link>
        </div>
      </div>

      {loading ? <ProductSkeletons /> : error ? (
        <div className="rounded-3xl border border-black/10 bg-black/[.025] px-6 py-14 text-center">
          <PackageSearch className="mx-auto text-black/35" size={32} />
          <p className="mt-4 font-semibold">Chưa thể tải sản phẩm</p>
          <button type="button" onClick={() => location.reload()} className="mt-3 text-sm text-black/55 underline underline-offset-4">Tải lại trang</button>
        </div>
      ) : visibleProducts.length === 0 ? (
        <div className="rounded-3xl border border-black/10 bg-black/[.025] px-6 py-14 text-center text-black/50">Collection này chưa có sản phẩm.</div>
      ) : (
        <div className="relative">
          <button className="featured-prev absolute -left-4 top-[38%] z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-black/10 bg-white shadow-lg hover:bg-black hover:text-white md:grid" aria-label="Sản phẩm trước"><ChevronLeft size={20} /></button>
          <button className="featured-next absolute -right-4 top-[38%] z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-black/10 bg-white shadow-lg hover:bg-black hover:text-white md:grid" aria-label="Sản phẩm tiếp theo"><ChevronRight size={20} /></button>
          <Swiper
            key={activeCollection}
            modules={[Navigation, A11y]}
            navigation={{ prevEl: ".featured-prev", nextEl: ".featured-next" }}
            preventClicks={false}
            preventClicksPropagation={false}
            spaceBetween={16}
            slidesPerView={1.2}
            breakpoints={{ 540: { slidesPerView: 2.15 }, 900: { slidesPerView: 3.15 }, 1180: { slidesPerView: 4 } }}
            a11y={{ enabled: true }}
          >
            {visibleProducts.map((product, index) => <SwiperSlide key={product.id} className="h-auto"><ProductCard product={product} index={index} /></SwiperSlide>)}
          </Swiper>
        </div>
      )}
    </section>
  );
}

export function FeaturedCategories() {
  return (
    <section className="pt-16" aria-labelledby="featured-categories-title">
      <div className="mb-8 flex items-center justify-between gap-3 sm:gap-6">
        <h2 id="featured-categories-title" className="text-xl font-semibold tracking-tight sm:text-3xl">
          Danh mục nổi bật
        </h2>
        <Link
          href="/collections"
          className="group inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-55 sm:gap-2 sm:text-sm"
        >
          Xem tất cả danh mục
          <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-black/10 lg:grid-cols-5">
        {featuredCategories.map(({ name, icon: Icon }) => (
          <Link
            key={name}
            href="/collections"
            className="group -mb-px -mr-px flex min-h-40 flex-col items-center justify-center border-b border-r border-black/10 px-4 py-7 text-center transition-colors hover:bg-black/[.035] sm:min-h-44"
          >
            <Icon
              aria-hidden="true"
              strokeWidth={1.35}
              className="h-14 w-14 text-black/35 transition duration-300 group-hover:-translate-y-1 group-hover:text-black sm:h-16 sm:w-16"
            />
            <span className="mt-4 text-sm font-semibold sm:text-base">{name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ProductSkeletons() {
  return <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">{[0, 1, 2, 3].map((item) => <div key={item} className="h-[430px] animate-pulse rounded-3xl bg-black/[.05]" />)}</div>;
}
