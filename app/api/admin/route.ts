import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { query } from "@/lib/db";
export const dynamic = "force-dynamic";
export async function GET() {
  if(!await getAdminSession()) return NextResponse.json({error:"unauthorized"},{status:401});
  try {
    const [products,collections,posts]=await Promise.all([
      query(`SELECT p.id,p.name,p.slug,p.price,p.compare_price AS "comparePrice",p.description,p.image_url AS "imageUrl",p.image_urls AS "imageUrls",p.collection_id AS "collectionId",COALESCE((SELECT json_agg(pc.collection_id ORDER BY pc.collection_id) FROM product_collections pc WHERE pc.product_id=p.id),'[]'::json) AS "collectionIds",p.published,p.featured,p.sku,p.inventory,p.tags,p.seo_title AS "seoTitle",p.seo_description AS "seoDescription" FROM products p ORDER BY p.created_at DESC`),
      query(`SELECT id,name,slug,description,image_url AS "imageUrl",published,seo_title AS "seoTitle",seo_description AS "seoDescription" FROM collections ORDER BY created_at DESC`),
      query(`SELECT id,title,slug,excerpt,content,image_url AS "imageUrl",published,seo_title AS "seoTitle",seo_description AS "seoDescription" FROM posts ORDER BY created_at DESC`)
    ]);
    let orderCount=0; let revenue=0; let bestSellers:Record<string,unknown>[]=[];
    try {
      const totals=await query<{orderCount:number;revenue:number}>(`SELECT COUNT(*)::int AS "orderCount", COALESCE(SUM(total),0)::bigint AS revenue FROM orders WHERE status <> 'cancelled'`);
      orderCount=Number(totals[0]?.orderCount??0); revenue=Number(totals[0]?.revenue??0);
      bestSellers=await query(`SELECT p.id, p.name, p.slug, p.image_url AS "imageUrl", COALESCE(SUM(oi.quantity),0)::int AS sold, COALESCE(SUM(oi.quantity * oi.unit_price),0)::bigint AS revenue FROM products p JOIN order_items oi ON oi.product_id = p.id JOIN orders o ON o.id = oi.order_id AND o.status <> 'cancelled' GROUP BY p.id,p.name,p.slug,p.image_url ORDER BY sold DESC,revenue DESC LIMIT 5`);
    } catch {}
    return NextResponse.json({products,collections,posts,stats:{productCount:products.length,collectionCount:collections.length,postCount:posts.length,orderCount,revenue},bestSellers});
  } catch { return NextResponse.json({products:[],collections:[],posts:[],stats:{productCount:0,collectionCount:0,postCount:0,orderCount:0,revenue:0},bestSellers:[]}); }
}
