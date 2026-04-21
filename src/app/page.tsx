"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageSquare, Target, ChevronRight } from "lucide-react";
import { motion, Variants } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 15 
    } 
  },
};

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden min-h-[calc(100vh-4rem)] bg-background">

      {/* 배경 글로우 오브 (Animated) */}
      <motion.div 
        className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, oklch(0.61 0.17 145 / 0.08) 0%, transparent 70%)' }}
        animate={{ 
          scale: [1, 1.05, 1], 
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute top-1/4 right-1/4 w-[300px] md:w-[400px] h-[300px] md:h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, oklch(0.61 0.17 145 / 0.05) 0%, transparent 70%)' }}
        animate={{ 
          x: [0, 30, 0], 
          y: [0, -30, 0],
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />

      {/* 격자 배경 */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(oklch(0.61 0.17 145) 1px, transparent 1px), linear-gradient(90deg, oklch(0.61 0.17 145) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      {/* 메인 콘텐츠 */}
      <motion.div 
        className="container relative z-10 mx-auto px-4 py-20 flex flex-col items-center text-center space-y-10"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >

        {/* 배지 */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[13px] sm:text-sm font-bold text-primary backdrop-blur-sm transition-all hover:bg-primary/10 cursor-default shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
          샤프트 마스터 AI 3.0 — 프리미엄 골프 피팅 에이전트 ⛳
          <ChevronRight className="h-3.5 w-3.5 opacity-60" />
        </motion.div>

        {/* 헤드라인 */}
        <motion.div variants={itemVariants} className="space-y-6 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] md:leading-[1.05]">
            당신의 스윙에 맞는
            <br className="hidden sm:block" />
            <span className="golf-gradient-text px-2">완벽한 샤프트</span>를
            <br />
            찾아드립니다 ⛳
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
            스윙 스피드, 비거리, 핸디캡 데이터를 바탕으로 AI가 최적의 샤프트를 추천합니다.
            전문 피팅의 경험을 지금 바로 온라인으로 경험해보세요.
          </p>
        </motion.div>

        {/* CTA 버튼 */}
        <motion.div variants={itemVariants} className="flex flex-col w-full sm:w-auto sm:flex-row items-center gap-4 pt-6">
          <Link href="/fitting" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto h-14 px-8 md:px-10 text-base font-bold bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:bg-primary/95 transition-all duration-300 transform hover:-translate-y-1 rounded-full"
            >
              <Target className="mr-2 h-5 w-5" />
              피팅 시작하기 ⛳
            </Button>
          </Link>
          <Link href="/chat" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto h-14 px-8 md:px-10 text-base font-bold border-primary/20 text-foreground hover:border-primary/40 focus:border-primary/40 hover:bg-primary/5 backdrop-blur-md transition-all duration-300 transform hover:-translate-y-1 rounded-full bg-background/50"
            >
              <MessageSquare className="mr-2 h-5 w-5 text-primary" />
              AI 에이전트 대화 🏌️‍♂️
            </Button>
          </Link>
        </motion.div>

        {/* 통계 행 (Staggered separately) */}
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-6 sm:gap-12 pt-10 text-center"
          variants={containerVariants}
        >
          {[
            { value: '98%', label: '추천 정확도' },
            { value: '5단계', label: '정밀 분석' },
            { value: '24/7', label: '실시간 상담' },
          ].map((stat, i) => (
            <motion.div key={stat.label} variants={itemVariants} className="space-y-1 min-w-[100px]">
              <p className="text-3xl md:text-4xl font-black text-primary">{stat.value}</p>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>
    </div>
  );
}
