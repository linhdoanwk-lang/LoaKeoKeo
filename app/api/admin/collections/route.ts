import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { query } from "@/lib/db";
import { slugify } from "@/lib/slug";
export async function POST(request:Request) { if(!await getAdminSession()) return NextResponse.json({error:"unauthorized"},{status:401}); const body=await request.json() as Record<string,unknown>; if(!body.name) return NextResponse.json({error:"missing_fields"},{status:400}); const slug=slugify(String(body.slug||body.name)); try { const rows=await query<{id:number}>(`INSERT INTO collections (name,slug,description,image_url,published,seo_title,seo_description) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id`,[String(body.name),slug,String(body.description||""),body.imageUrl||null,body.published!==false,String(body.seoTitle||""),String(body.seoDescription||"")]); return NextResponse.json({id:rows[0].id},{status:201}); } catch(e) { return NextResponse.json({error:"save_failed",detail:String(e)},{status:500}); } }
