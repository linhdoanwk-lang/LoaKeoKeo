import { FaEnvelope, FaFacebookF, FaPinterestP, FaTelegram, FaWhatsapp, FaXTwitter } from "react-icons/fa6";

type ProductShareLinksProps = {
  name: string;
  slug: string;
};

export function ProductShareLinks({ name, slug }: ProductShareLinksProps) {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://loa-keo-keo.vercel.app").replace(/\/$/, "");
  const productUrl = `${siteUrl}/products/${encodeURIComponent(slug)}`;
  const encodedUrl = encodeURIComponent(productUrl);
  const encodedName = encodeURIComponent(name);
  const links = [
    { label: "Chia sẻ lên Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, icon: FaFacebookF },
    { label: "Chia sẻ lên X", href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedName}`, icon: FaXTwitter },
    { label: "Chia sẻ lên Pinterest", href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedName}`, icon: FaPinterestP },
    { label: "Chia sẻ qua Telegram", href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedName}`, icon: FaTelegram },
    { label: "Chia sẻ qua email", href: `mailto:?subject=${encodedName}&body=${encodedUrl}`, icon: FaEnvelope },
    { label: "Chia sẻ qua WhatsApp", href: `https://wa.me/?text=${encodedName}%20${encodedUrl}`, icon: FaWhatsapp },
  ];

  return (
    <div className="mt-6 flex items-center gap-4" aria-label="Chia sẻ sản phẩm">
      {links.map(({ label, href, icon: Icon }) => (
        <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} aria-label={label} className="text-black/75 transition hover:text-black">
          <Icon aria-hidden size={18} />
        </a>
      ))}
    </div>
  );
}
