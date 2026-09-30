import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
const allowed = new Set(["image/jpeg","image/png","image/webp","image/gif"]);
export async function POST(request:Request) { if(!await getAdminSession()) return NextResponse.json({error:"unauthorized"},{status:401}); const form=await request.formData(); const file=form.get("file"); if(!(file instanceof File)||!allowed.has(file.type)||file.size>4_000_000) return NextResponse.json({error:"invalid_file"},{status:400}); const blob=await put(`products/${file.name}`,file,{access:"public",addRandomSuffix:true}); return NextResponse.json({url:blob.url}); }
