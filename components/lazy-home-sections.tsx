"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const HomeShowcase = dynamic(
  () => import("@/components/home-showcase").then((module) => module.HomeShowcase),
  { ssr: false, loading: () => <ShowcaseSkeleton /> },
);

export function LazyHomeSections() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (window.scrollY >= 24) {
      setHasScrolled(true);
      return;
    }
    const detectScroll = () => {
      if (window.scrollY < 24) return;
      setHasScrolled(true);
      window.removeEventListener("scroll", detectScroll);
    };
    window.addEventListener("scroll", detectScroll, { passive: true });
    return () => window.removeEventListener("scroll", detectScroll);
  }, []);

  useEffect(() => {
    const target = triggerRef.current;
    if (!target || shouldLoad || !hasScrolled) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "600px 0px", threshold: 0.01 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [hasScrolled, shouldLoad]);

  return <div ref={triggerRef} className="min-h-[760px]">{shouldLoad ? <HomeShowcase /> : <ShowcaseSkeleton />}</div>;
}

function ShowcaseSkeleton() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-5 py-10 lg:px-8" aria-label="Đang chuẩn bị nội dung">
      <div className="grid gap-5 md:grid-cols-[.85fr_1.7fr_.85fr]">
        <div className="h-56 rounded-3xl bg-black/[.05]" />
        <div className="h-56 rounded-3xl bg-black/[.05]" />
        <div className="h-56 rounded-3xl bg-black/[.05]" />
      </div>
      <div className="mt-16 h-9 w-64 rounded-lg bg-black/[.06]" />
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[0, 1, 2, 3].map((item) => <div key={item} className="h-[430px] rounded-3xl bg-black/[.05]" />)}
      </div>
    </div>
  );
}
