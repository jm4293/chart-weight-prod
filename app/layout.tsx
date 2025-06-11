import type { Metadata } from "next";
import "./globals.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/ko";
import Logo from "@/components/image/Logo";
import Modal from "@/components/modal/Modal";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ko");

export const metadata: Metadata = {
  title: "동탄연세맑은내과 투석실",
  description: "투석실",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
        <title>동탄연세맑은내과 투석실</title>
      </head>
      <body>
        <Logo />
        <main className="desktop">{children}</main>

        <Modal />
        <div id="modal-root" />
      </body>
    </html>
  );
}
