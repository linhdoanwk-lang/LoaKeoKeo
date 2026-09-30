import { NextResponse } from "next/server";
import { getProducts } from "@/lib/catalog";
export const revalidate = 60;
export async function GET() { return NextResponse.json({ products: await getProducts() }); }
