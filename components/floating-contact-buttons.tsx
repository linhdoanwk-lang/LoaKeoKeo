"use client";

import { usePathname } from "next/navigation";
import { FaFacebookMessenger } from "react-icons/fa6";
import { SiZalo } from "react-icons/si";

const contacts = [
  {
    name: "Zalo",
    href: process.env.NEXT_PUBLIC_ZALO_URL || "https://zalo.me/",
    className: "border border-[#2563eb]/15 bg-white text-[#2563eb] hover:bg-[#f7f9ff]",
    icon: <SiZalo aria-hidden="true" size={37} />,
  },
  {
    name: "Messenger",
    href: process.env.NEXT_PUBLIC_MESSENGER_URL || "https://www.messenger.com/",
    className: "bg-[#ffb800] text-white hover:bg-[#f2aa00]",
    icon: <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#ffb800]"><FaFacebookMessenger aria-hidden="true" size={27} /></span>,
  },
];

export function FloatingContactButtons() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <aside className="fixed bottom-6 right-4 z-50 flex flex-col gap-3 sm:bottom-8 sm:right-6" aria-label="Liên hệ nhanh">
      {contacts.map((contact) => (
        <a
          key={contact.name}
          href={contact.href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`Mở ${contact.name}`}
          title={contact.name}
          className={`grid h-14 w-14 place-items-center rounded-full shadow-[0_8px_24px_rgba(0,0,0,.16)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,.2)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black ${contact.className}`}
        >
          {contact.icon}
        </a>
      ))}
    </aside>
  );
}
