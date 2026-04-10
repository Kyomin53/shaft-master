import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ShaftMaster — AI 골프 피팅 에이전트",
    template: "%s | ShaftMaster",
  },
  description:
    "스윙 스피드·비거리·핸디캡 데이터를 바탕으로 AI가 최적의 샤프트를 추천해드립니다. 전문 피팅을 온라인으로 경험하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary/25 selection:text-primary-foreground">
        <Header />
        <main className="flex-1 flex flex-col w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
