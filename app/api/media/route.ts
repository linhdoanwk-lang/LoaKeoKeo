import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
const allowed = new Set(["image/jpeg","image/png","image/webp","image/gif"]);
export async function POST(request:Request) { if(!await getAdminSession()) return NextResponse.json({error:"unauthorized"},{status:401}); const form=await request.formData(); const files=[...form.getAll("files"),form.get("file")].filter((value):value is File=>value instanceof File); if(!files.length||files.length>12||files.some(file=>!allowed.has(file.type)||file.size>4_000_000)) return NextResponse.json({error:"invalid_file"},{status:400}); const blobs=await Promise.all(files.map(file=>put(`products/${file.name}`,file,{access:"public",addRandomSuffix:true}))); const urls=blobs.map(blob=>blob.url); return NextResponse.json({url:urls[0],urls}); }
