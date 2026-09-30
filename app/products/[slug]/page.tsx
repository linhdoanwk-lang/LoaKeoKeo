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

  return (
    <main className="min-h-screen bg-white text-black">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <Link href="/collections" className="inline-flex items-center gap-2 text-sm text-black/55 hover:text-black">
          <ChevronLeft size={17} />
          Quay lại sản phẩm
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <ProductGallery images={images} name={product.name} />
          <div>
            <div className="flex flex-wrap gap-2">
              {(collectionNames.length ? collectionNames : ["Sản phẩm nổi bật"]).map((name) => (
                <span key={name} className="rounded-full bg-black/[.06] px-3 py-1.5 text-xs font-medium uppercase tracking-[.12em] text-black/65">
                  {name}
                </span>
              ))}
            </div>
            <h1 className="mt-4 text-5xl font-semibold tracking-[-.045em] sm:text-6xl">{product.name}</h1>
            {plainDescription && <p className="mt-6 line-clamp-3 text-lg leading-8 text-black/60">{plainDescription}</p>}
            <div className="mt-7 flex items-center gap-3">
              <span className="text-3xl font-semibold text-black">{money(product.price)}</span>
              {product.comparePrice && <del className="text-black/35">{money(product.comparePrice)}</del>}
            </div>
            <ProductActions id={product.id} name={product.name} />
            <div className="mt-10 grid gap-4 border-t border-black/10 pt-7 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {[[Waves, "Âm thanh tuyển chọn"], [Truck, "Giao hàng toàn quốc"], [ShieldCheck, "Bảo hành rõ ràng"]].map(([Icon, label]) => (
                <div key={String(label)} className="flex items-center gap-3 text-sm text-black/55">
                  <Icon size={19} className="text-black" />
                  {String(label)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {descriptionHtml && (
          <section className="mt-16 border-t border-black/10 pt-12 sm:mt-20 sm:pt-16" aria-labelledby="product-description-title">
            <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,760px)] lg:gap-16">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.18em] text-black/45">Thông tin sản phẩm</p>
                <h2 id="product-description-title" className="mt-3 text-3xl font-semibold tracking-tight">Mô tả chi tiết</h2>
              </div>
              <div
                className="text-base leading-8 text-black/65 [&_a]:font-medium [&_a]:text-black [&_a]:underline [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:tracking-tight [&_h2:first-child]:mt-0 [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-black [&_li]:my-1.5 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-4 [&_strong]:font-semibold [&_strong]:text-black [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6"
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
              />
            </div>
          </section>
        )}
      </section>
      <SiteFooter />
    </main>
  );
}
