import type { Metadata } from "next";
import { FloatingContactButtons } from "@/components/floating-contact-buttons";
import "./globals.css";

export const metadata: Metadata = {
  title: "Âm Thanh Việt — Loa cho mọi nhịp sống",
  description: "Khám phá loa di động, loa để bàn và giải pháp âm thanh được tuyển chọn.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" data-scroll-behavior="smooth">
      <body suppressHydrationWarning className="antialiased">
        {children}
        <FloatingContactButtons />
      </body>
    </html>
  );
}
