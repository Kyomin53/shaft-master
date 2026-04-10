"use client";

import { Shaft } from "@/data/shafts";
import { Card, CardContent } from "@/components/ui/card";
import { Weight, Zap, Disc, ArrowUpRight } from "lucide-react";

interface ShaftCardProps {
  shaft: Shaft;
}

export function ShaftCard({ shaft }: ShaftCardProps) {
  return (
    <Card className="glass-card group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:gold-glow hover:border-primary/50">
      <CardContent className="p-6">
        {/* Brand Logo Placeholder */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-[0.2em] text-primary/80 uppercase">
            {shaft.brand}
          </span>
          <ArrowUpRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>

        {/* Model Name */}
        <h3 className="mb-4 text-xl font-bold tracking-tight text-foreground group-hover:gold-text transition-all duration-300">
          {shaft.model}
        </h3>

        {/* Main Specs */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-primary/10 transition-colors duration-300">
            <Weight className="h-4 w-4 mb-1 opacity-60 text-primary" />
            <span className="text-[10px] text-muted-foreground">무게</span>
            <span className="text-xs font-semibold">{shaft.weight}g</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-primary/10 transition-colors duration-300">
            <Disc className="h-4 w-4 mb-1 opacity-60 text-primary" />
            <span className="text-[10px] text-muted-foreground">토크</span>
            <span className="text-xs font-semibold">{shaft.torque}</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-primary/10 transition-colors duration-300">
            <Zap className="h-4 w-4 mb-1 opacity-60 text-primary" />
            <span className="text-[10px] text-muted-foreground">강도</span>
            <span className="text-xs font-semibold">{shaft.flex}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {shaft.tags.map((tag) => (
            <span 
              key={tag} 
              className="text-[9px] px-2 py-0.5 rounded-full border border-primary/20 bg-primary/5 text-primary/80 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Detailed Specs (Hover Overlay) */}
        <div className="absolute inset-0 bg-background/95 backdrop-blur-sm p-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 flex flex-col justify-center pointer-events-none group-hover:pointer-events-auto">
            <h4 className="text-lg font-bold gold-text mb-4">상세 스펙</h4>
            <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-white/5 pb-1">
                    <span className="text-xs text-muted-foreground">런치각</span>
                    <span className="text-xs font-medium">{shaft.launch}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-1">
                    <span className="text-xs text-muted-foreground">스핀량</span>
                    <span className="text-xs font-medium">{shaft.spin}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-1">
                    <span className="text-xs text-muted-foreground">스피드 범위</span>
                    <span className="text-xs font-medium">{shaft.speedRange} mph</span>
                </div>
                <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-md">
                    <p className="text-[10px] text-primary/80 leading-tight italic">
                        * 최첨단 소재 기술과 정교한 밸런스 설계가 적용된 프리미엄 피팅 샤프트입니다.
                    </p>
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
