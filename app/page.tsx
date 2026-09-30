import { ShieldCheck, Truck, Waves } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroBanner } from "@/components/hero-banner";
import { LazyHomeSections } from "@/components/lazy-home-sections";
export const revalidate = 60;
export default function Home() { return <main className="min-h-screen bg-white text-black"><SiteHeader/><HeroBanner/><LazyHomeSections/><section className="mx-auto grid max-w-7xl gap-4 px-5 py-12 md:grid-cols-3 lg:px-8">{[[Waves,"Chất âm được tuyển chọn","Cân bằng, rõ nét và phù hợp từng không gian."],[Truck,"Giao hàng toàn quốc","Đóng gói an toàn, theo dõi hành trình rõ ràng."],[ShieldCheck,"Bảo hành minh bạch","Thông tin chính sách được công bố trên từng sản phẩm."]].map(([Icon,title,copy])=><div key={String(title)} className="flex gap-4 rounded-2xl border border-black/8 bg-black/[.03] p-5"><Icon className="text-black"/><div><h2 className="font-semibold">{String(title)}</h2><p className="mt-1 text-sm leading-6 text-black/50">{String(copy)}</p></div></div>)}</section><SiteFooter/></main>; }
