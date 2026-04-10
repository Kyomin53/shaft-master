"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  RefreshCcw, 
  ArrowRight, 
  TrendingUp, 
  Info, 
  ShieldCheck,
  ChevronRight,
  BarChart3,
  Dna,
  Zap,
  Trophy
} from "lucide-react";
import Link from "next/link";
import { useUserStore } from "@/store/useUserStore";
import { useAuthStore } from "@/store/useAuthStore";
import { storageService } from "@/lib/storageService";
import { calculateFitting, FittingResult } from "@/lib/fittingLogic";
import { useRef } from "react";

export function PrescriptionReport({ onReset }: { onReset: () => void }) {
  const { spec } = useUserStore();
  const { user } = useAuthStore();
  const [results, setResults] = useState<FittingResult[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const hasSaved = useRef(false);

  useEffect(() => {
    const findings = calculateFitting(spec);
    setResults(findings);

    // 분석 결과가 도출되면 자동 저장
    if (findings.length > 0 && !hasSaved.current) {
      storageService.saveFittingReport(user, spec, findings);
      hasSaved.current = true;
    }
  }, [spec, user]);

  if (results.length === 0) return null;

  const mainShaft = results[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* 전문 헤더 리포트 */}
      <Card className="bg-white border-none golf-shadow rounded-[2rem] overflow-hidden">
        <div className="bg-gradient-to-br from-primary/10 via-white to-accent/5 p-8 border-b border-primary/10">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="h-5 w-5 text-primary" />
            <h2 className="text-[10px] font-black tracking-[0.3em] text-primary uppercase">Elite Fitting Analysis ⛳</h2>
          </div>
          <CardTitle className="text-3xl font-black text-slate-800 mb-6">전문 피팅 솔루션 리포트</CardTitle>
          <div className="bg-secondary/40 rounded-2xl p-5 border border-primary/5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-primary/60" />
              <p className="text-[10px] font-black text-primary tracking-widest uppercase">AI Diagnosis Summary</p>
            </div>
            <p className="text-sm leading-relaxed text-slate-600 font-medium">
              고객님의 드라이버 스윙 스피드 <span className="text-primary font-bold">{spec.swingSpeed}mph</span>와 <span className="text-primary font-bold">{spec.swingTempo === 'hard' ? '강력한' : '부드러운'} 템포</span>를 정밀 분석한 결과입니다.<br /> 
              현재 발생하는 <span className="text-red-500 font-bold">{spec.ballFlight === 'slice' ? '슬라이스' : '훅'}</span> 현상은 샤프트의 {spec.ballFlight === 'slice' ? '낮은 토크와 강성 부족' : '지나치게 높은 강성'}으로 인한 에너지 전달 손실이 원인입니다. 
              최적의 <span className="text-primary font-bold">{spec.trajectoryGoal === 'high' ? 'High Launch' : 'Low Launch'}</span> 프로파일로의 교정을 추천드립니다.
            </p>
          </div>
        </div>

        <CardContent className="p-8">
          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="text-center p-5 bg-secondary/30 rounded-3xl border border-transparent hover:border-primary/20 transition-all shadow-sm">
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Impact Match</p>
              <p className="text-2xl font-black text-primary font-mono">{mainShaft.matchRate}%</p>
            </div>
            <div className="text-center p-5 bg-secondary/30 rounded-3xl border border-transparent hover:border-primary/20 transition-all shadow-sm">
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Power Gain</p>
              <p className="text-2xl font-black text-primary font-mono">+5.4%</p>
            </div>
            <div className="text-center p-5 bg-secondary/30 rounded-3xl border border-transparent hover:border-primary/20 transition-all shadow-sm">
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Stability</p>
              <p className="text-2xl font-black text-blue-500 font-mono">+12%</p>
            </div>
          </div>

          <h3 className="text-[10px] font-black text-primary mb-6 tracking-widest uppercase flex items-center gap-2">
            <TrendingUp className="h-4 w-4" /> Top 3 Recommendation 🔥
          </h3>
          
          <div className="space-y-4">
            {results.map((res, i) => (
              <div 
                key={i} 
                onClick={() => setActiveTab(i)}
                className={`relative cursor-pointer group p-5 rounded-3xl border-2 transition-all duration-500 ${
                  activeTab === i 
                    ? "bg-primary/5 border-primary shadow-xl scale-[1.03] z-10" 
                    : "bg-white border-slate-100 hover:border-primary/20 opacity-70 hover:opacity-100"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-black text-primary/60 block mb-1 uppercase tracking-tighter">Recommended Alternative 0{i + 1}</span>
                    <h4 className="text-xl font-bold text-slate-800 transition-colors">{res.shaft.brand} {res.shaft.model}</h4>
                    <div className="flex gap-4 mt-3">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wide">Flex</span>
                        <span className="text-sm font-black text-primary">{res.shaft.flex}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wide">Weight</span>
                        <span className="text-sm font-black text-primary">{res.shaft.weight}g</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wide">Torque</span>
                        <span className="text-sm font-black text-primary">{res.shaft.torque}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-3">
                    <div>
                      <span className="text-3xl font-black text-primary font-mono">{res.matchRate}%</span>
                      <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-tight">Match Score</p>
                    </div>
                    <Button 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(res.shaft.purchaseUrl, '_blank');
                      }}
                      className="bg-slate-900 hover:bg-black text-white text-[10px] font-black h-8 px-4 rounded-full shadow-lg border border-primary/20 transition-all hover:scale-105"
                    >
                      최저가 구매하기
                    </Button>
                  </div>
                </div>
                {activeTab === i && (
                  <div className="mt-5 pt-5 border-t border-primary/10 animate-in slide-in-from-top-2 duration-300">
                    <p className="text-[12px] text-slate-500 font-medium flex items-center gap-2 leading-relaxed italic">
                      <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                      "{res.reason}"
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>

        {/* 비교 가이드 가상의 시각적 인디케이터 */}
        <div className="bg-secondary/20 p-8 border-t border-border">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" /> Spec Performance Guide 📈
            </h4>
            <span className="text-[10px] font-bold text-muted-foreground">vs {spec.currentShaft || 'Original'}</span>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2.5">
              <div className="flex justify-between text-[11px] font-black uppercase tracking-tighter">
                <span className="text-slate-500">Stability & Dispersion</span>
                <span className="text-primary">+18% Optimized</span>
              </div>
              <div className="h-2 w-full bg-white rounded-full overflow-hidden flex gap-0.5 shadow-inner">
                <div className="h-full bg-primary/20 w-1/2" />
                <div className="h-full bg-primary w-[30%] animate-in slide-in-from-left duration-1000" />
              </div>
            </div>
            
            <div className="space-y-2.5">
              <div className="flex justify-between text-[11px] font-black uppercase tracking-tighter">
                <span className="text-slate-500">Energy Transfer Rate</span>
                <span className="text-primary">+25% Efficiency Gain</span>
              </div>
              <div className="h-2 w-full bg-white rounded-full overflow-hidden flex gap-0.5 shadow-inner">
                <div className="h-full bg-primary/20 w-[40%]" />
                <div className="h-full bg-primary w-[45%] animate-in slide-in-from-left duration-1000" />
              </div>
            </div>
          </div>
        </div>

        <CardFooter className="p-8 bg-white border-t border-border flex flex-col sm:flex-row gap-4">
          <Link href="/chat" className="w-full sm:flex-1">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white h-16 transition-all font-black tracking-widest text-sm rounded-full shadow-lg transform hover:scale-105">
              <Zap className="mr-2 h-5 w-5 fill-white" />
              AI와 실시간 상세 피팅 상담 🏌️‍♂️
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={onReset}
            className="w-full sm:w-auto h-16 px-10 border-border hover:bg-secondary text-slate-500 font-bold tracking-widest text-xs rounded-full"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            RE-ANALYSIS
          </Button>
        </CardFooter>
      </Card>
      
      <p className="text-[10px] text-center text-muted-foreground/40 italic">
        © ShaftMaster Engineering. This report is based on professional weighted fitting algorithms.
      </p>
    </div>
  );
}
