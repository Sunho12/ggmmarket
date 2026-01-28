import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "🍠 고구마마켓",
  description: "당신 근처의 고구마마켓",
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
