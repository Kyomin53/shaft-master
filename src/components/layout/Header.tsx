import Link from 'next/link';
import { Target } from 'lucide-react';
import { AuthButton } from '../auth/AuthButton';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center px-4 md:px-8">
        {/* 로고 */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <Target className="h-6 w-6 text-primary group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute inset-0 blur-sm bg-primary/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <span className="font-black text-xl tracking-tighter golf-gradient-text">
            ShaftMaster
          </span>
        </Link>

        {/* 네비게이션 */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              href="/fitting"
              className="rounded-full px-4 py-2 text-sm font-bold text-muted-foreground transition-all hover:text-primary hover:bg-primary/5"
            >
              피팅 마법사
            </Link>
            <Link
              href="/explorer"
              className="rounded-full px-4 py-2 text-sm font-bold text-muted-foreground transition-all hover:text-primary hover:bg-primary/5"
            >
              샤프트 탐색
            </Link>
            <Link
              href="/chat"
              className="rounded-full px-4 py-2 text-sm font-bold text-muted-foreground transition-all hover:text-primary hover:bg-primary/5 mr-4"
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
