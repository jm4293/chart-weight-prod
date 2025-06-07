import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "동탄연세맑음내과 투석실",
  description: "투석실",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
