import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-auth";
import { AdminDashboard } from "./admin-dashboard";
export const dynamic = "force-dynamic";
export default async function AdminPage() { const user = await getAdminSession(); if(!user) redirect("/admin/login"); return <AdminDashboard userName={user.email}/>; }
