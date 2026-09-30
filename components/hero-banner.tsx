"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { A11y, Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    eyebrow: "Âm thanh cho không gian sống",
    title: "Chạm vào từng nhịp âm.",
    description: "Loa không dây tinh gọn, chất âm giàu chi tiết cho mọi khoảnh khắc trong nhà.",
    image: "/banner-home-speaker.png",
    imageAlt: "Loa không dây cao cấp màu đen trên nền sáng",
    href: "/collections",
  },
  {
    eyebrow: "Nhỏ gọn. Mạnh mẽ.",
    title: "Mang âm nhạc đi muôn nơi.",
    description: "Thiết kế bền bỉ, kết nối nhanh và năng lượng đủ dài cho cả một ngày chuyển động.",
    image: "/banner-portable-speaker.png",
    imageAlt: "Loa Bluetooth di động màu đen trên nền studio sáng",
    href: "/collections",
  },
  {
    eyebrow: "Điện ảnh tại gia",
    title: "Đắm chìm trong từng khung hình.",
    description: "Soundbar và subwoofer đồng bộ, mở rộng không gian âm thanh mà vẫn giữ căn phòng tối giản.",
    image: "/banner-soundbar.png",
    imageAlt: "Bộ soundbar và loa siêu trầm màu đen",
    href: "/collections",
  },
];

export function HeroBanner() {
  return (
    <section className="hero-banner mx-auto max-w-[1500px] px-3 pt-3 sm:px-5" aria-label="Sản phẩm nổi bật">
      <Swiper
        modules={[Autoplay, Pagination, A11y]}
        slidesPerView={1}
        loop
        speed={750}
        autoplay={{ delay: 5200, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true }}
        a11y={{ enabled: true }}
        className="overflow-hidden rounded-[2rem] border border-black/10 bg-[#f5f6f7]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div className="relative min-h-[560px] sm:min-h-[620px]">
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                loading="eager"
                sizes="(max-width: 640px) 100vw, 1500px"
                className="object-cover object-[64%_center] sm:object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/10 sm:via-white/70 lg:via-white/30" />
              <div className="relative z-10 flex min-h-[560px] max-w-[650px] flex-col justify-center px-7 pb-24 pt-16 sm:min-h-[620px] sm:px-14 lg:px-20">
                <p className="text-xs font-semibold uppercase tracking-[.2em] text-black/55 sm:text-sm">{slide.eyebrow}</p>
                <h1 className="mt-5 max-w-[620px] text-balance text-5xl font-semibold leading-[.98] tracking-[-.055em] sm:text-6xl lg:text-7xl">
                  {slide.title}
                </h1>
                <p className="mt-6 max-w-md text-base leading-7 text-black/60 sm:text-lg">{slide.description}</p>
                <div className="mt-9">
                  <Link href={slide.href} className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3.5 font-semibold text-white hover:bg-[#222]">
                    Khám phá sản phẩm <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
