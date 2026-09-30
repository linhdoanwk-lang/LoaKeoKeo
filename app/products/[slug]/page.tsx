import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Grid2X2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductActions } from "@/components/product-actions";
import { ProductDescriptionTabs } from "@/components/product-description-tabs";
import { ProductGallery } from "@/components/product-gallery";
import { ProductShareLinks } from "@/components/product-share-links";
import { getProductBySlug } from "@/lib/catalog";
import { money } from "@/lib/format";
import { richTextToPlainText, sanitizeRichText } from "@/lib/rich-text";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return product
    ? {
        title: product.seoTitle || `${product.name} — Âm Thanh Việt`,
        description: product.seoDescription || richTextToPlainText(product.description).slice(0, 160),
      }
    : { title: "Không tìm thấy sản phẩm" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const images = product.imageUrls?.length ? product.imageUrls : product.imageUrl ? [product.imageUrl] : [];
  const collectionNames = product.collections?.length
    ? product.collections.map((collection) => collection.name)
    : product.collectionName
      ? [product.collectionName]
      : [];
  const plainDescription = richTextToPlainText(product.description);
  const descriptionHtml = sanitizeRichText(product.description);
  const availability = product.inventory === undefined ? "Liên hệ" : product.inventory > 0 ? "Còn hàng" : "Tạm hết hàng";

  return (
    <main className="min-h-screen bg-white text-black">
      <SiteHeader />

      <div className="bg-[#f5f5f7] px-5 py-3 text-xs text-black/45 lg:px-8">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-5">
          <nav className="flex min-w-0 items-center gap-2" aria-label="Breadcrumb">
            <Link href="/" className="shrink-0 text-black hover:underline">Trang chủ</Link>
            <ChevronRight size={14} className="shrink-0" />
            <Link href="/collections" className="shrink-0 text-black/60 hover:text-black">Sản phẩm</Link>
            <ChevronRight size={14} className="shrink-0" />
            <span className="truncate">{product.name}</span>
          </nav>
          <Link href="/collections" aria-label="Xem tất cả sản phẩm" className="grid h-8 w-8 shrink-0 place-items-center rounded-md hover:bg-black/[.06]"><Grid2X2 size={16} /></Link>
        </div>
      </div>

      <section className="mx-auto max-w-[1400px] px-5 py-10 lg:px-8 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(380px,.92fr)] lg:items-start lg:gap-16">
          <ProductGallery images={images} name={product.name} />

          <div className="lg:pt-4">
            <h1 className="text-2xl font-semibold leading-tight tracking-[-.025em] sm:text-3xl">{product.name}</h1>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-2xl font-medium text-black/65">{money(product.price)}</span>
              {product.comparePrice && <del className="text-sm text-black/30">{money(product.comparePrice)}</del>}
            </div>
            {plainDescription && <p className="mt-5 line-clamp-3 max-w-2xl text-[15px] leading-7 text-black/50">{plainDescription}</p>}

            <ProductActions id={product.id} name={product.name} />

            <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 border-b border-black/10 pb-6 text-sm font-semibold">
              <Link href="/blog" className="hover:underline">Hướng dẫn chọn loa</Link>
              <Link href="/blog" className="hover:underline">Giao hàng & đổi trả</Link>
              <a href={`mailto:lienhe@amthanhviet.vn?subject=${encodeURIComponent(`Hỏi về ${product.name}`)}`} className="hover:underline">Hỏi về sản phẩm</a>
            </div>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex gap-2"><dt className="text-black/45">Tình trạng:</dt><dd className="font-medium">{availability}</dd></div>
              <div className="flex gap-2"><dt className="text-black/45">Danh mục:</dt><dd>{collectionNames.length ? collectionNames.join(", ") : "Sản phẩm nổi bật"}</dd></div>
              {product.sku && <div className="flex gap-2"><dt className="text-black/45">SKU:</dt><dd>{product.sku}</dd></div>}
            </dl>

            <ProductShareLinks name={product.name} slug={product.slug} />
          </div>
        </div>
      </section>

      {descriptionHtml && <ProductDescriptionTabs descriptionHtml={descriptionHtml} collectionNames={collectionNames} sku={product.sku} />}
      <SiteFooter />
    </main>
  );
}
