import { NextResponse } from "next/server";
import { createAdminSession, verifyAdminCredentials } from "@/lib/admin-auth";
export async function POST(request:Request) { const body=await request.json() as Record<string,unknown>; const email=String(body.email??""); const password=String(body.password??""); if(!verifyAdminCredentials(email,password)) return NextResponse.json({error:"invalid_credentials"},{status:401}); await createAdminSession(email); return NextResponse.json({ok:true}); }
