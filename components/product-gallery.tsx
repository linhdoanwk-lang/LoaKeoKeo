"use client";

import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const fallbackImages = ["/banner-home-speaker.webp"];

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const galleryImages = images.length ? images : fallbackImages;
  const [activeIndex, setActiveIndex] = useState(0);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);

  function showImage(index: number) {
    setActiveIndex(index);
    mainSwiper?.slideTo(index);
  }

  return (
    <div className="grid min-w-0 gap-4 sm:grid-cols-[76px_minmax(0,1fr)] lg:gap-6">
      <div className="order-2 flex gap-3 overflow-x-auto pb-1 sm:order-1 sm:flex-col sm:overflow-visible">
        {galleryImages.map((image, index) => (
          <button
            type="button"
            key={`${image}-${index}`}
            onClick={() => showImage(index)}
            aria-label={`Xem ảnh ${index + 1} của ${name}`}
            aria-current={activeIndex === index ? "true" : undefined}
            className={`h-18 w-18 shrink-0 overflow-hidden rounded-lg bg-[#f7f7f7] p-1.5 transition ${activeIndex === index ? "ring-1 ring-black" : "ring-1 ring-black/10 hover:ring-black/35"}`}
          >
            <img src={image} alt="" className="h-full w-full object-contain" loading={index ? "lazy" : "eager"} />
          </button>
        ))}
      </div>

      <div className="order-1 min-w-0 overflow-hidden bg-white sm:order-2">
        <Swiper
          modules={[Keyboard]}
          keyboard={{ enabled: true }}
          onSwiper={setMainSwiper}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="aspect-square w-full"
        >
          {galleryImages.map((image, index) => (
            <SwiperSlide key={`${image}-large-${index}`}>
              <img src={image} alt={`${name} - ảnh ${index + 1}`} className="h-full w-full object-contain" loading={index ? "lazy" : "eager"} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
