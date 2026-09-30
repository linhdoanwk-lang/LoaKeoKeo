import Link from "next/link";
import { Headphones, Mail, MapPin, Phone } from "lucide-react";

const footerGroups = [
  {
    title: "Danh mục",
    links: [
      ["Loa di động", "/collections"],
      ["Loa để bàn", "/collections"],
      ["Loa karaoke", "/collections"],
      ["Soundbar", "/collections"],
      ["Phụ kiện", "/collections"],
    ],
  },
  {
    title: "Thông tin",
    links: [
      ["Về chúng tôi", "/"],
      ["Liên hệ", "mailto:lienhe@amthanhviet.vn"],
      ["Điều khoản sử dụng", "/"],
      ["Đổi trả & hoàn tiền", "/"],
      ["Giao hàng & nhận hàng", "/"],
    ],
  },
  {
    title: "Hỗ trợ",
    links: [
      ["Tài khoản của tôi", "/admin/login"],
      ["Hướng dẫn chọn loa", "/blog"],
      ["Câu hỏi thường gặp", "/blog"],
      ["Chính sách bảo hành", "/blog"],
      ["Góc âm thanh", "/blog"],
    ],
  },
];

const socialLinks = [
  ["Facebook", "https://www.facebook.com/"],
  ["Instagram", "https://www.instagram.com/"],
  ["YouTube", "https://www.youtube.com/"],
  ["TikTok", "https://www.tiktok.com/"],
  ["Zalo", "https://zalo.me/"],
];

export function SiteFooter() {
  return (
    <footer className="border-t border-black/[.06] bg-[#f5f5f7] px-5 py-14 text-sm text-black/50 sm:py-16 lg:px-8">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-[1.8fr_repeat(4,1fr)] lg:gap-12">
        <div className="col-span-2 lg:col-span-1">
          <Link href="/" className="inline-flex items-center gap-3 text-black">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-black text-white">
              <Headphones size={22} />
            </span>
            <span className="text-2xl font-bold tracking-[-.04em]">ÂM THANH VIỆT</span>
          </Link>

          <div className="mt-6 space-y-1.5 text-[13px] leading-5 text-black/65">
            <p>© 2026 Âm Thanh Việt. Đã đăng ký bản quyền.</p>
            <p>Nghe đúng chất. Sống đúng gu.</p>
          </div>

          <address className="mt-7 space-y-4 not-italic">
            <a href="https://maps.google.com/?q=Ho+Chi+Minh+City+Vietnam" target="_blank" rel="noreferrer" className="flex items-start gap-3 hover:text-black">
              <MapPin aria-hidden="true" size={18} strokeWidth={1.5} className="mt-0.5 shrink-0" />
              <span>TP. Hồ Chí Minh, Việt Nam</span>
            </a>
            <a href="mailto:lienhe@amthanhviet.vn" className="flex items-center gap-3 hover:text-black">
              <Mail aria-hidden="true" size={18} strokeWidth={1.5} className="shrink-0" />
              <span>lienhe@amthanhviet.vn</span>
            </a>
            <a href="tel:+84901234567" className="flex items-center gap-3 hover:text-black">
              <Phone aria-hidden="true" size={18} strokeWidth={1.5} className="shrink-0" />
              <span>+84 901 234 567</span>
            </a>
          </address>
        </div>

        {footerGroups.map((group, index) => (
          <nav key={group.title} aria-labelledby={`footer-group-${index}`}>
            <h2 id={`footer-group-${index}`} className="text-lg font-semibold text-black">{group.title}</h2>
            <ul className="mt-6 space-y-3.5">
              {group.links.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="hover:text-black">{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <nav aria-labelledby="footer-social-title">
          <h2 id="footer-social-title" className="text-lg font-semibold text-black">Theo dõi</h2>
          <ul className="mt-6 space-y-3.5">
            {socialLinks.map(([label, href]) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noreferrer" className="hover:text-black">{label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
