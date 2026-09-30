import { query } from "@/lib/db";

export type ProductCollection = { id: number; name: string; slug: string };
export type Product = { id: number; name: string; slug: string; price: number; comparePrice: number | null; description: string; imageUrl: string | null; imageUrls?: string[]; collectionName: string | null; collections?: ProductCollection[]; featured: number; seoTitle?: string; seoDescription?: string };
export type Collection = { id: number; name: string; slug: string; description: string; seoTitle?: string; seoDescription?: string };
export type Post = { id: number; title: string; slug: string; excerpt: string; content: string; imageUrl: string | null; createdAt: string; seoTitle?: string; seoDescription?: string };

export const sampleProducts: Product[] = [
  { id: -1, name: "Aura One", slug: "aura-one", price: 3490000, comparePrice: 3990000, description: "Âm thanh 360°, pin 18 giờ và chuẩn chống nước IP67.", imageUrl: null, collectionName: "Loa di động", featured: 1 },
  { id: -2, name: "Studio Arc", slug: "studio-arc", price: 7290000, comparePrice: null, description: "Âm trường rộng, cân bằng cho phòng khách và góc làm việc.", imageUrl: null, collectionName: "Loa để bàn", featured: 1 },
  { id: -3, name: "Pulse Mini", slug: "pulse-mini", price: 1890000, comparePrice: 2190000, description: "Nhỏ gọn, bass chắc và kết nối nhanh cho mọi chuyến đi.", imageUrl: null, collectionName: "Loa di động", featured: 1 },
];
export const sampleCollections: Collection[] = [
  { id: -1, name: "Loa di động", slug: "loa-di-dong", description: "Gọn nhẹ, bền bỉ, sẵn sàng đi cùng bạn." },
  { id: -2, name: "Loa để bàn", slug: "loa-de-ban", description: "Âm thanh tinh tế cho không gian sống và làm việc." },
  { id: -3, name: "Rạp phim tại gia", slug: "rap-phim-tai-gia", description: "Tạo không gian giải trí sống động ngay tại nhà." },
];
export const samplePosts: Post[] = [
  { id: -1, title: "Chọn công suất loa phù hợp với diện tích phòng", slug: "chon-cong-suat-loa", excerpt: "Một cách nhanh để tránh mua loa quá yếu hoặc quá dư công suất.", content: "Diện tích, cách bố trí và vật liệu trong phòng đều ảnh hưởng đến trải nghiệm nghe.", imageUrl: null, createdAt: "2026-09-20" },
  { id: -2, title: "Bluetooth hay Wi‑Fi: kết nối nào dành cho bạn?", slug: "bluetooth-hay-wifi", excerpt: "So sánh độ tiện lợi, chất lượng và khả năng nghe đa phòng.", content: "Bluetooth phù hợp sự linh hoạt; Wi‑Fi phù hợp chất lượng ổn định và hệ thống đa phòng.", imageUrl: null, createdAt: "2026-09-12" },
];

async function rows<T extends Record<string, unknown>>(sql: string): Promise<T[]> { return query<T>(sql); }
function normalizeProduct(product:Product):Product { const collections=Array.isArray(product.collections)?product.collections.map(collection=>({...collection,id:Number(collection.id)})):[]; return {...product,id:Number(product.id),price:Number(product.price),comparePrice:product.comparePrice===null?null:Number(product.comparePrice),featured:Number(product.featured),imageUrls:Array.isArray(product.imageUrls)?product.imageUrls:[],collections,collectionName:collections[0]?.name??product.collectionName??null}; }
const productSelect=`SELECT p.id, p.name, p.slug, p.price, p.compare_price AS "comparePrice", p.description, p.image_url AS "imageUrl", p.image_urls AS "imageUrls", legacy_collection.name AS "collectionName", COALESCE((SELECT json_agg(json_build_object('id',c.id,'name',c.name,'slug',c.slug) ORDER BY c.name) FROM product_collections pc JOIN collections c ON c.id=pc.collection_id WHERE pc.product_id=p.id),'[]'::json) AS collections, p.featured, p.seo_title AS "seoTitle", p.seo_description AS "seoDescription" FROM products p LEFT JOIN collections legacy_collection ON legacy_collection.id = p.collection_id`;
export async function getProducts() { try { const data = await rows<Product>(`${productSelect} WHERE p.published = TRUE ORDER BY p.created_at DESC`); return data.length ? data.map(normalizeProduct) : sampleProducts; } catch { return sampleProducts; } }
export async function getProductBySlug(slug: string) { try { const data = await query<Product>(`${productSelect} WHERE p.published = TRUE AND p.slug = $1 LIMIT 1`, [slug]); return data[0] ? normalizeProduct(data[0]) : sampleProducts.find((item) => item.slug === slug) ?? null; } catch { return sampleProducts.find((item) => item.slug === slug) ?? null; } }
export async function getCollections() { try { const data = await rows<Collection>(`SELECT id, name, slug, description, seo_title AS "seoTitle", seo_description AS "seoDescription" FROM collections WHERE published = TRUE ORDER BY created_at DESC`); return data.length ? data : sampleCollections; } catch { return sampleCollections; } }
export async function getPosts() { try { const data = await rows<Post>(`SELECT id, title, slug, excerpt, content, image_url AS "imageUrl", created_at AS "createdAt", seo_title AS "seoTitle", seo_description AS "seoDescription" FROM posts WHERE published = TRUE ORDER BY created_at DESC`); return data.length ? data : samplePosts; } catch { return samplePosts; } }
export async function getPostBySlug(slug:string) { try { const data=await query<Post>(`SELECT id,title,slug,excerpt,content,image_url AS "imageUrl",created_at AS "createdAt",seo_title AS "seoTitle",seo_description AS "seoDescription" FROM posts WHERE published=TRUE AND slug=$1 LIMIT 1`,[slug]); return data[0]??samplePosts.find(item=>item.slug===slug)??null; } catch { return samplePosts.find(item=>item.slug===slug)??null; } }
