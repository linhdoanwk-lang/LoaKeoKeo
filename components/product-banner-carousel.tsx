"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PackageSearch } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { A11y, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/catalog";

export type BannerPosition = "left" | "right";

type ProductBannerCarouselProps = {
  bannerPosition?: BannerPosition;
  title?: string;
  bannerTitle?: string;
  bannerEyebrow?: string;
  bannerImage?: string;
  bannerHref?: string;
  productsEndpoint?: string;
};

export function ProductBannerCarousel({
  bannerPosition = "left",
  title = "Gợi ý dành cho bạn",
  bannerTitle = "Bật chất riêng\ntrong từng nhịp",
  bannerEyebrow = "Bộ sưu tập mới",
  bannerImage = "/recommendation-banner-speaker.webp",
  bannerHref = "/collections",
  productsEndpoint = "/api/products?limit=12",
}: ProductBannerCarouselProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const sectionId = useId().replace(/:/g, "");

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);

    fetch(productsEndpoint, {
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
  }, [productsEndpoint]);

  const bannerFirst = bannerPosition === "left";

  return (
    <section className="pt-16" aria-labelledby={`${sectionId}-title`} data-banner-position={bannerPosition}>
      <div className={`grid items-stretch gap-6 ${bannerFirst ? "lg:grid-cols-[280px_minmax(0,1fr)]" : "lg:grid-cols-[minmax(0,1fr)_280px]"}`}>
        <Link
          href={bannerHref}
          className={`group relative min-h-[420px] overflow-hidden rounded-3xl border border-black/[.06] bg-[#f2f5f4] ${bannerFirst ? "order-first" : "order-last"}`}
        >
          <Image
            src={bannerImage}
            alt=""
            fill
            sizes="(max-width: 1023px) 100vw, 280px"
            className="object-cover object-center transition duration-700 group-hover:scale-[1.025]"
          />
          <span className="relative z-10 flex h-full min-h-[420px] flex-col p-7">
            <span className="text-xs font-semibold uppercase tracking-[.18em] text-black/45">{bannerEyebrow}</span>
            <span className="mt-3 whitespace-pre-line text-2xl font-semibold leading-tight tracking-tight">{bannerTitle}</span>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
              Mua sắm ngay
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
          </span>
        </Link>

        <div className={bannerFirst ? "order-last min-w-0" : "order-first min-w-0"}>
          <div className="mb-8 flex items-center justify-between gap-4">
            <h2 id={`${sectionId}-title`} className="text-xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
            <Link href="/collections" className="group inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold hover:opacity-55 sm:gap-2 sm:text-sm">
              Xem tất cả
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 gap-4 xl:grid-cols-3" aria-label="Đang tải sản phẩm">
              {[0, 1, 2].map((item) => <div key={item} className="h-[430px] animate-pulse rounded-3xl bg-black/[.05]" />)}
            </div>
          ) : error ? (
            <div className="grid min-h-[420px] place-items-center rounded-3xl border border-black/10 bg-black/[.025] px-6 text-center">
              <div>
                <PackageSearch className="mx-auto text-black/35" size={32} />
                <p className="mt-4 font-semibold">Chưa thể tải sản phẩm</p>
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="grid min-h-[420px] place-items-center rounded-3xl border border-black/10 bg-black/[.025] px-6 text-center text-black/50">
              Chưa có sản phẩm để gợi ý.
            </div>
          ) : (
            <Swiper
              modules={[Pagination, A11y]}
              pagination={{ clickable: true, dynamicBullets: true }}
              preventClicks={false}
              preventClicksPropagation={false}
              spaceBetween={16}
              slidesPerView={1.15}
              breakpoints={{ 560: { slidesPerView: 2.1 }, 840: { slidesPerView: 2.6 }, 1180: { slidesPerView: 3 } }}
              a11y={{ enabled: true }}
              className="recommendation-swiper pb-12"
            >
              {products.map((product, index) => (
                <SwiperSlide key={product.id} className="h-auto">
                  <ProductCard product={product} index={index} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
}
