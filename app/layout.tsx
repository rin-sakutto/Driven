import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DRIVEN — We Move. You Follow.",
  description: "Driven is a collective that moves in the shadows. Apparel for those who know.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-black text-white">{children}</body>
    </html>
  );
}
