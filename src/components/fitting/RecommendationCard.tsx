"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, RefreshCcw, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useUserStore } from "@/store/useUserStore";

export function RecommendationCard({ onReset }: { onReset: () => void }) {
  const { spec } = useUserStore();

  return (
    <Card className="bg-white border-none golf-shadow rounded-[3rem] p-4 overflow-hidden animate-in zoom-in-95 duration-500">
      <CardHeader className="text-center pb-2">
        {/* 아이콘 */}
        <div className="mx-auto mb-6 relative w-24 h-24">
          <div className="absolute inset-0 rounded-full bg-primary/10 shadow-lg" />
          <div className="relative w-24 h-24 rounded-full bg-white border-2 border-primary/20 flex items-center justify-center">
            <Sparkles className="h-10 w-10 text-primary animate-pulse" />
          </div>
        </div>
        <CardTitle className="text-3xl font-black text-slate-800 tracking-tighter">
          최적의 샤프트를 찾았습니다 ⛳
        </CardTitle>
        <p className="text-muted-foreground mt-3 text-sm font-medium">
          스윙 스피드 <strong className="text-primary font-black">{spec.swingSpeed || "95"} mph</strong> ·
          스피드 및 템포 기준 정밀 분석 결과
        </p>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="rounded-[2rem] border-2 border-primary/10 bg-secondary/30 p-8 space-y-6">
          {/* 매칭 헤더 */}
          <div className="flex justify-between items-start border-b border-primary/5 pb-6">
            <div>
              <p className="text-[10px] font-black text-primary/70 uppercase tracking-widest mb-2">
                BEST MATCHING ⛳
              </p>
              <h3 className="text-3xl font-black text-slate-800 tracking-tight">Fujikura Ventus Blue 6S</h3>
              <p className="text-sm text-slate-500 font-bold mt-2">스티프 (약 65g) · 벨로코어 기술 탑재</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="inline-flex items-center rounded-full bg-primary text-white px-4 py-1.5 text-xs font-black shadow-lg">
                98% MATCH
              </span>
            </div>
          </div>

          {/* 추천 이유 */}
          <div className="space-y-3 text-[14px] text-slate-600 leading-relaxed font-medium italic">
            <p className="font-black text-primary uppercase tracking-widest text-[10px] not-italic">Diagnosis Report</p>
            <p className="bg-white/50 p-4 rounded-2xl border border-white">
              "스윙 스피드 <span className="text-primary font-bold">{spec.swingSpeed || "95"} mph</span>와 
              분석된 스윙 시퀀스 기준, 데이터 기반 안정성이 가장 뛰어난 세팅입니다. 
              Ventus Blue는 가속 구간에서의 샤프트 뒤틀림을 최소화하여 정타율을 획기적으로 높여줍니다."
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 pt-8 px-8">
        <Link href="/chat" className="w-full">
          <Button className="w-full bg-primary hover:bg-primary/90 text-white h-14 transition-all font-black rounded-xl shadow-xl transform hover:scale-[1.02]">
            AI 에이전트 상세 상담 🏌️‍♂️
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
        <div className="flex gap-3 w-full">
          <Button
            onClick={() => {
              const searchUrl = `https://www.google.com/search?q=${encodeURIComponent('Fujikura Ventus Blue 6S 구매')}`;
              window.open(searchUrl, '_blank');
            }}
            className="flex-1 h-14 bg-slate-900 hover:bg-black text-white font-black rounded-xl shadow-lg border border-primary/20 transition-all hover:scale-[1.02]"
          >
            최저가 구매하기
          </Button>
          <Button
            variant="outline"
            onClick={onReset}
            className="w-auto h-14 px-6 border-border hover:bg-secondary text-slate-500 font-bold rounded-xl"
          >
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
