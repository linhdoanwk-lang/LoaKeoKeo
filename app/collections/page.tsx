import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { getCollections, getProducts } from "@/lib/catalog";

export const revalidate = 60;

export default async function CollectionsPage() {
  const [collections, products] = await Promise.all([getCollections(), getProducts()]);

  return (
    <main className="min-h-screen bg-white text-black">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <p className="text-sm uppercase tracking-[.2em] text-black">Collections</p>
        <h1 className="mt-3 max-w-3xl text-5xl font-semibold tracking-[-.045em]">Chọn loa theo cách bạn tận hưởng âm nhạc.</h1>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {collections.map((collection, index) => (
            <a href={`#${collection.slug}`} key={collection.id} className="rounded-3xl border border-black/10 bg-black/[.04] p-6 hover:bg-black/[.07]">
              <span className="text-xs text-black/35">{String(index + 1).padStart(2, "0")}</span>
              <h2 className="mt-12 text-2xl font-semibold">{collection.name}</h2>
              <p className="mt-2 text-sm leading-6 text-black/50">{collection.description}</p>
            </a>
          ))}
        </div>

        <div className="mt-20 space-y-20">
          {collections.map((collection) => {
            const collectionProducts = products.filter((product) =>
              product.collections?.length
                ? product.collections.some((item) => Number(item.id) === Number(collection.id))
                : product.collectionName === collection.name,
            );
            return (
              <section key={collection.id} id={collection.slug} className="scroll-mt-24 border-t border-black/10 pt-10">
                <div className="flex items-end justify-between gap-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[.18em] text-black/40">Collection</p>
                    <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{collection.name}</h2>
                  </div>
                  <span className="text-sm text-black/45">{collectionProducts.length} sản phẩm</span>
                </div>
                {collectionProducts.length ? (
                  <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {collectionProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
                  </div>
                ) : (
                  <p className="mt-8 rounded-2xl bg-black/[.035] px-5 py-8 text-sm text-black/45">Collection này chưa có sản phẩm.</p>
                )}
              </section>
            );
          })}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
