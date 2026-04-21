"use client";

import Link from 'next/link';
import { Target, Menu } from 'lucide-react';
import { AuthButton } from '../auth/AuthButton';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-8">
        
        {/* 모바일 햄버거 메뉴 (좌측, 모바일에서만 보임) */}
        <div className="flex items-center md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="mr-2" />}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle mobile menu</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px] p-6 border-r-primary/10">
              <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
              <div className="flex flex-col gap-6">
                <Link 
                  href="/" 
                  className="flex items-center space-x-2 group" 
                  onClick={() => setIsOpen(false)}
                >
                  <Target className="h-6 w-6 text-primary" />
                  <span className="font-black text-xl tracking-tighter golf-gradient-text">
                    샤프트 마스터
                  </span>
                </Link>
                
                <nav className="flex flex-col space-y-4 mt-6">
                  <Link
                    href="/fitting"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center px-4 py-3 rounded-xl hover:bg-primary/5 text-sm font-bold text-foreground transition-colors"
                  >
                    샤프트 맞춤 추천
                  </Link>
                  <Link
                    href="/explorer"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center px-4 py-3 rounded-xl hover:bg-primary/5 text-sm font-bold text-foreground transition-colors"
                  >
                    샤프트 탐색
                  </Link>
                  <Link
                    href="/chat"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center px-4 py-3 rounded-xl hover:bg-primary/5 text-sm font-bold text-foreground transition-colors"
                  >
                    AI 상담
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* 로고 (중앙정렬 on Mobile, 좌측정렬 on Desktop) */}
        <Link href="/" className="flex items-center space-x-2 group absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
          <div className="relative">
            <Target className="h-6 w-6 text-primary group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute inset-0 blur-sm bg-primary/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <span className="font-black text-xl tracking-tighter golf-gradient-text hidden sm:inline-block">
            샤프트 마스터
          </span>
        </Link>

        {/* 회원 정보 등 우측 영역 */}
        <div className="flex items-center justify-end flex-shrink-0 md:flex-1 space-x-4">
          
          {/* 데스크탑 네비게이션 */}
          <nav className="hidden md:flex items-center space-x-1 mr-4">
            <Link
              href="/fitting"
              className="rounded-full px-4 py-2 text-sm font-bold text-muted-foreground transition-all hover:text-primary hover:bg-primary/5"
            >
              샤프트 맞춤 추천
            </Link>
            <Link
              href="/explorer"
              className="rounded-full px-4 py-2 text-sm font-bold text-muted-foreground transition-all hover:text-primary hover:bg-primary/5"
            >
              샤프트 탐색
            </Link>
            <Link
              href="/chat"
              className="rounded-full px-4 py-2 text-sm font-bold text-muted-foreground transition-all hover:text-primary hover:bg-primary/5"
            >
              AI 상담
            </Link>
          </nav>
          
          <AuthButton />
        </div>
      </div>
    </header>
  );
}
