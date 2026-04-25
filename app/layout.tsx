import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "架空RPG職業診断",
  description: "名前と選択式の回答から、あなたの架空RPG職業を診断するゲーム風 Web アプリ。"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
