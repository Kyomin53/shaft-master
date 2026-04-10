import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageSquare, Target, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden min-h-[calc(100vh-4rem)]">

      {/* 배경 글로우 오브 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, oklch(0.61 0.17 145 / 0.08) 0%, transparent 70%)' }}
      />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, oklch(0.61 0.17 145 / 0.04) 0%, transparent 70%)' }}
      />

      {/* 격자 배경 */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(oklch(0.61 0.17 145) 1px, transparent 1px), linear-gradient(90deg, oklch(0.61 0.17 145) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      {/* 메인 콘텐츠 */}
      <div className="container relative z-10 mx-auto px-4 py-20 flex flex-col items-center text-center space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">

        {/* 배지 */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-bold text-primary backdrop-blur-sm transition-all hover:bg-primary/10 cursor-default shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
          ShaftMaster AI 3.0 — 프리미엄 골프 피팅 에이전트 ⛳
          <ChevronRight className="h-3.5 w-3.5 opacity-60" />
        </div>

        {/* 헤드라인 */}
        <div className="space-y-5 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.05]">
            당신의 스윙에 맞는
            <br />
            <span className="golf-gradient-text">완벽한 샤프트</span>를
            <br />
            찾아드립니다 ⛳
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            스윙 스피드, 비거리, 핸디캡 데이터를 바탕으로 AI가 최적의 샤프트를 추천합니다.
            전문 피팅의 경험을 지금 바로 온라인으로 경험해보세요.
          </p>
        </div>

        {/* CTA 버튼 */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <Link href="/fitting">
            <Button
              size="lg"
              className="h-14 px-10 text-base font-bold bg-primary text-white shadow-xl hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 rounded-full"
            >
              <Target className="mr-2 h-5 w-5" />
              피팅 시작하기 ⛳
            </Button>
          </Link>
          <Link href="/chat">
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-10 text-base font-bold border-primary/30 text-primary hover:bg-primary/5 backdrop-blur-md transition-all duration-300 transform hover:scale-105 rounded-full"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              AI 에이전트 대화 🏌️‍♂️
            </Button>
          </Link>
        </div>

        {/* 통계 행 */}
        <div className="flex items-center gap-8 pt-6 text-center">
          {[
            { value: '98%', label: '추천 정확도' },
            { value: '5단계', label: '정밀 분석' },
            { value: '24/7', label: '실시간 상담' },
          ].map((stat) => (
            <div key={stat.label} className="space-y-1">
              <p className="text-2xl font-black text-primary">{stat.value}</p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
