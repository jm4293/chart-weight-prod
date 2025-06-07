import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";

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
      <body>
        <div className="w-full flex justify-center py-8">
          <Image src="/toplogo.png" alt="logo" width={366} height={60} />
        </div>

        <main className="desktop">{children}</main>
      </body>
    </html>
  );
}
