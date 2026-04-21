"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, User, Sparkles } from "lucide-react";
import { storageService } from "@/lib/storageService";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuthDialog } from "./AuthDialog";

export function AuthButton() {
  const { user, signOut, setAuthDialogOpen } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 로그인 감지 시 데이터 동기화
  useEffect(() => {
    if (mounted && user) {
      storageService.syncGuestData(user.id);
    }
  }, [user, mounted]);

  if (!mounted) return <div className="w-20 h-9 bg-secondary rounded-full animate-pulse" />;

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Button 
          onClick={() => setAuthDialogOpen(true)}
          size="sm"
          className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold h-9 px-5 shadow-sm"
        >
          <LogIn className="w-4 h-4 mr-2" />
          로그인
        </Button>
        <AuthDialog />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full border-2 border-primary/20 p-0 hover:bg-primary/5 transition-all">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.full_name} />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">
                {user.user_metadata?.full_name?.charAt(0) || "G"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mt-2 rounded-2xl p-2 shadow-2xl border-primary/10" align="end" forceMount>
          <DropdownMenuLabel className="font-normal p-3">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-black leading-none">{user.user_metadata?.full_name || "골퍼"}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-primary/5" />
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex items-center p-3 rounded-xl cursor-pointer hover:bg-primary/5 transition-colors focus:bg-primary/5">
              <User className="mr-3 h-4 w-4 text-primary" />
              <span>내 정보 / 피팅 히스토리</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/fitting" className="flex items-center p-3 rounded-xl cursor-pointer hover:bg-primary/5 transition-colors focus:bg-primary/5">
              <Sparkles className="mr-3 h-4 w-4 text-primary" />
              <span>새 피팅 시작하기</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-primary/5" />
          <DropdownMenuItem 
            onClick={() => signOut()}
            className="flex items-center p-3 rounded-xl cursor-pointer text-red-500 hover:bg-red-50 focus:bg-red-50 transition-colors"
          >
            <LogOut className="mr-3 h-4 w-4" />
            <span>로그아웃</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {/* 사용자가 로그인한 상태에서도 다른 탭에서 Dialog가 열렸을 경우를 대비하거나, 구조적으로 하나 유지해둘 수 있음.
          하지만 Navbar 쪽에서 전역적으로 띄우는 것이 더 좋음. 일단 여기에 둡니다. */}
      <AuthDialog />
    </div>
  );
}
