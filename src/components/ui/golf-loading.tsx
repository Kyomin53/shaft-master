"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GolfLoadingProps {
  className?: string;
  message?: string;
}

export function GolfLoading({ className, message = "AI가 스윙을 분석 중입니다..." }: GolfLoadingProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-8 w-full", className)}>
      <div className="relative w-64 h-24 flex items-center justify-center overflow-hidden mb-4">
        {/* 골퍼 캐릭터 */}
        <div className="absolute left-4 bottom-4 text-4xl animate-golf-swing origin-bottom">
          🏌️‍♂️
        </div>
        
        {/* 날아가는 골프공 */}
        <div className="absolute left-16 bottom-12 text-xl animate-ball-fly">
          ⚪
        </div>

        {/* 잔디 바닥 표현 */}
        <div className="absolute bottom-0 w-full h-2 bg-gradient-to-r from-primary/40 via-primary/20 to-primary/40 rounded-full" />
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
        </div>
        <p className="text-sm font-medium text-primary/80 animate-pulse">{message}</p>
      </div>
    </div>
  );
}

export function GolfLoadingSmall() {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-secondary/50 border border-primary/10">
      <div className="text-lg animate-golf-swing origin-bottom">🏌️‍♂️</div>
      <div className="flex gap-1">
        <span className="w-1 h-1 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
        <span className="w-1 h-1 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
        <span className="w-1 h-1 rounded-full bg-primary animate-bounce" />
      </div>
    </div>
  );
}
