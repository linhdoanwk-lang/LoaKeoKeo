import { NextResponse } from "next/server";
import { getProducts } from "@/lib/catalog";
export const revalidate = 60;
export async function GET(request: Request) {
  const url = new URL(request.url);
  const featuredOnly = url.searchParams.get("featured") === "true";
  const requestedLimit = Number(url.searchParams.get("limit") || 0);
  const limit = Number.isFinite(requestedLimit) ? Math.min(Math.max(requestedLimit, 0), 24) : 0;
  let products = await getProducts();
  if (featuredOnly) {
    const featured = products.filter((product) => Number(product.featured) === 1);
    if (featured.length) products = featured;
  }
  if (limit) products = products.slice(0, limit);
  return NextResponse.json({ products });
}
