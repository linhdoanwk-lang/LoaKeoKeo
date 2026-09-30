"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Product } from "@/lib/catalog";
import { money } from "@/lib/format";
import { CartLine, getCart, saveCart } from "@/lib/shop-storage";

type CompletedOrder = { orderId: number; total: number };

export default function CartPage() {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(null);

  useEffect(() => {
    setLines(getCart());
    fetch("/api/products")
      .then(async (response) => (await response.json()) as { products: Product[] })
      .then((data) => setProducts(data.products))
      .catch(() => setError("Không thể tải sản phẩm. Vui lòng thử lại."));
  }, []);

  const entries = lines
    .map((line) => ({ line, product: products.find((item) => Number(item.id) === Number(line.id)) }))
    .filter((item): item is { line: CartLine; product: Product } => Boolean(item.product));

  const total = useMemo(
    () => entries.reduce((sum, item) => sum + item.product.price * item.line.quantity, 0),
    [entries],
  );

  function update(id: number, quantity: number) {
    const next = lines
      .map((line) => (line.id === id ? { ...line, quantity } : line))
      .filter((line) => line.quantity > 0);
    setLines(next);
    saveCart(next);
  }

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerEmail,
          items: entries.map(({ line, product }) => ({ id: product.id, quantity: line.quantity })),
        }),
      });
      if (!response.ok) throw new Error("order_failed");
      const order = (await response.json()) as CompletedOrder;
      setCompletedOrder(order);
      setLines([]);
      saveCart([]);
    } catch {
      setError("Chưa thể tạo đơn hàng. Hãy kiểm tra DATABASE_URL và chạy npm run db:init.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <p className="text-sm uppercase tracking-[.2em] text-black">Giỏ hàng</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Sản phẩm bạn đã chọn</h1>

        {completedOrder ? (
          <div className="mt-10 rounded-[1.75rem] border border-black/20 bg-black/[.06] p-10 text-center">
            <CheckCircle2 className="mx-auto text-black" size={42} />
            <h2 className="mt-5 text-2xl font-semibold">Đặt hàng thành công</h2>
            <p className="mt-2 text-black/60">
              Mã đơn #{completedOrder.orderId} · Tổng cộng {money(Number(completedOrder.total))}
            </p>
            <p className="mt-2 text-sm text-black/45">Cửa hàng sẽ liên hệ với bạn để xác nhận thanh toán và giao hàng.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/collections" className="rounded-full bg-black px-6 py-3 font-semibold text-white hover:bg-[#222]">
                Tiếp tục mua sắm
              </Link>
              <Link href="/admin" className="rounded-full border border-black/15 px-6 py-3 font-semibold text-black hover:bg-black/5">
                Xem thống kê quản trị
              </Link>
            </div>
          </div>
        ) : entries.length === 0 ? (
          <div className="mt-10 rounded-[1.75rem] border border-black/10 bg-black/[.03] p-10 text-center">
            <ShoppingBag className="mx-auto text-black/35" size={36} />
            <h2 className="mt-5 text-xl font-semibold">Giỏ hàng đang trống</h2>
            <p className="mt-2 text-black/50">Hãy chọn chiếc loa phù hợp với không gian của bạn.</p>
            <Link href="/collections" className="mt-6 inline-block rounded-full bg-black px-6 py-3 font-semibold text-white hover:bg-[#222]">
              Khám phá sản phẩm
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="space-y-4">
              {entries.map(({ line, product }) => (
                <article key={product.id} className="grid grid-cols-[96px_1fr] gap-4 rounded-2xl border border-black/10 bg-[#f6f6f6] p-4 sm:grid-cols-[120px_1fr_auto]">
                  <Link href={`/products/${product.slug}`} className="aspect-square overflow-hidden rounded-xl bg-black/[.05]">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
                    ) : (
                      <span className="grid h-full place-items-center text-2xl text-black/30">♪</span>
                    )}
                  </Link>
                  <div className="self-center">
                    <Link href={`/products/${product.slug}`} className="text-lg font-semibold hover:text-black">
                      {product.name}
                    </Link>
                    <p className="mt-1 text-sm text-black/45">{product.collectionName}</p>
                    <p className="mt-3 font-semibold text-black">{money(product.price)}</p>
                  </div>
                  <div className="col-span-2 flex items-center justify-between sm:col-span-1 sm:flex-col sm:items-end">
                    <div className="flex items-center rounded-full border border-black/15">
                      <button type="button" onClick={() => update(product.id, line.quantity - 1)} aria-label="Giảm số lượng" className="p-2">
                        <Minus size={15} />
                      </button>
                      <span className="min-w-8 text-center text-sm">{line.quantity}</span>
                      <button type="button" onClick={() => update(product.id, line.quantity + 1)} aria-label="Tăng số lượng" className="p-2">
                        <Plus size={15} />
                      </button>
                    </div>
                    <button type="button" onClick={() => update(product.id, 0)} className="flex items-center gap-2 text-sm text-black/40 hover:text-red-600">
                      <Trash2 size={15} /> Xóa
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit rounded-[1.75rem] border border-black/10 bg-black/[.04] p-6">
              <h2 className="text-xl font-semibold">Đặt hàng</h2>
              <div className="mt-5 flex justify-between text-black/55">
                <span>Số lượng</span>
                <span>{lines.reduce((sum, line) => sum + line.quantity, 0)}</span>
              </div>
              <div className="mt-5 flex justify-between border-t border-black/10 pt-5 text-xl font-semibold">
                <span>Tổng cộng</span>
                <span className="text-black">{money(total)}</span>
              </div>
              <form onSubmit={submitOrder} className="mt-6 space-y-4">
                <label className="block text-sm text-black/65">
                  Họ và tên
                  <input
                    required
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none focus:border-black"
                    placeholder="Nguyễn Văn A"
                  />
                </label>
                <label className="block text-sm text-black/65">
                  Email (không bắt buộc)
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(event) => setCustomerEmail(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none focus:border-black"
                    placeholder="ban@example.com"
                  />
                </label>
                {error && <p role="alert" className="text-sm leading-5 text-red-600">{error}</p>}
                <button disabled={submitting} className="w-full rounded-full bg-black px-5 py-3.5 font-semibold text-white hover:bg-[#222] disabled:cursor-wait disabled:opacity-60">
                  {submitting ? "Đang tạo đơn..." : "Đặt hàng"}
                </button>
              </form>
              <p className="mt-4 text-xs leading-5 text-black/40">Đơn hàng sẽ được ghi nhận với trạng thái chờ xác nhận.</p>
              <Link href="/collections" className="mt-4 block text-center text-sm text-black/50 hover:text-black">
                Tiếp tục mua sắm
              </Link>
            </aside>
          </div>
        )}
      </section>
      <SiteFooter />
    </main>
  );
}
