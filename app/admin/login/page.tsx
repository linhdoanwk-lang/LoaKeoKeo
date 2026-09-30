"use client";
import { useState } from "react";
import { LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);
  async function submit(event:React.FormEvent<HTMLFormElement>) { event.preventDefault(); setLoading(true); setError(""); const body=Object.fromEntries(new FormData(event.currentTarget)); const response=await fetch("/api/auth/login",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(body)}); if(response.ok){window.location.href="/admin";return} setLoading(false); setError("Email hoặc mật khẩu chưa đúng."); }
  return <main className="grid min-h-screen place-items-center bg-[#0b0f15] px-5 text-white"><form onSubmit={submit} className="w-full max-w-md rounded-[1.75rem] border border-white/10 bg-white/[.05] p-7 shadow-2xl"><span className="grid h-12 w-12 place-items-center rounded-full bg-[#ffffff] text-black"><LockKeyhole size={21}/></span><h1 className="mt-6 text-3xl font-semibold tracking-tight">Đăng nhập quản trị</h1><p className="mt-2 text-sm leading-6 text-white/50">Sử dụng tài khoản quản trị đã cấu hình cho cửa hàng.</p><div className="mt-7 grid gap-2"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" autoComplete="username" required className="border-white/15 bg-white/5 text-white"/></div><div className="mt-4 grid gap-2"><Label htmlFor="password">Mật khẩu</Label><Input id="password" name="password" type="password" autoComplete="current-password" required className="border-white/15 bg-white/5 text-white"/></div>{error&&<p className="mt-4 text-sm text-red-300">{error}</p>}<Button disabled={loading} className="mt-6 w-full bg-[#ffffff] text-black hover:bg-[#ffffff]">{loading?"Đang đăng nhập…":"Đăng nhập"}</Button></form></main>;
}
