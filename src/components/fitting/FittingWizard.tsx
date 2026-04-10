"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/store/useUserStore";
import { 
  ArrowRight, 
  ArrowLeft, 
  Loader2, 
  Sparkles, 
  User, 
  Activity, 
  Zap, 
  Target, 
  ChevronRight, 
  Monitor,
  Trophy
} from "lucide-react";
import { PrescriptionReport } from "./PrescriptionReport";
import { GolfLoading } from "../ui/golf-loading";

const STEPS = [
  {
    id: "physical",
    title: "신체 정보",
    desc: "고객님의 신장과 손 크기를 바탕으로 최적의 무게를 산출합니다.",
    icon: <User className="h-5 w-5" />
  },
  {
    id: "diagnosis",
    title: "현 상태 진단",
    desc: "기존 장비의 문제점을 파악하여 해결책을 도출합니다.",
    icon: <Activity className="h-5 w-5" />
  },
  {
    id: "swing",
    title: "스윙 데이터",
    desc: "스피드와 템포는 샤프트 강성을 결정하는 핵심 요소입니다.",
    icon: <Zap className="h-5 w-5" />
  },
  {
    id: "goals",
    title: "목표 및 고민",
    desc: "구질 고민을 해결할 수 있는 최적의 킥포인트를 매칭합니다.",
    icon: <Target className="h-5 w-5" />
  },
];

export function FittingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const { spec, setSpec } = useUserStore();
  const [mounted, setMounted] = useState(false);

  // Hydration mismatch 방지
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-[600px] flex items-center justify-center bg-white/50 rounded-[2.5rem] animate-pulse">
      <p className="text-muted-foreground font-bold">시스템 불러오는 중...</p>
    </div>;
  }

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((c) => c + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((c) => c - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowReport(true);
    }, 3500); // 넉넉한 분석 대기 시간
  };

  const renderStep = () => {
    const step = STEPS[currentStep];
    switch (step.id) {
      case "physical":
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <Label className="text-sm text-muted-foreground uppercase tracking-widest">신장 (Height)</Label>
                <span className="text-2xl font-black text-primary font-mono">{spec.height || 175} <small className="text-xs font-normal text-muted-foreground">cm</small></span>
              </div>
              <input
                type="range"
                min="150"
                max="200"
                step="1"
                className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer accent-primary"
                value={spec.height || 175}
                onChange={(e) => setSpec({ height: parseInt(e.target.value) })}
              />
              <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                <span>150CM</span>
                <span>200CM</span>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-sm text-muted-foreground uppercase tracking-widest">장갑 사이즈 (Glove Size)</Label>
              <div className="flex gap-2">
                {["22", "23", "24", "25", "26"].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSpec({ gloveSize: sz })}
                    className={`flex-1 h-16 rounded-2xl border transition-all duration-300 font-bold ${
                      spec.gloveSize === sz 
                        ? "bg-primary text-white border-primary shadow-lg scale-105" 
                        : "bg-white border-border hover:border-primary/40 text-muted-foreground"
                    }`}
                  >
                    {sz}호
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case "diagnosis":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-3">
              <Label className="text-sm text-muted-foreground tracking-widest uppercase">현재 사용 샤프트 (Current Shaft)</Label>
              <div className="relative">
                <Input
                  placeholder="예: Ventus Blue 6S"
                  className="h-16 pl-6 bg-secondary/30 border-border focus-visible:ring-primary rounded-2xl"
                  value={spec.currentShaft || ""}
                  onChange={(e) => setSpec({ currentShaft: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm text-muted-foreground tracking-widest uppercase">사용감 피드백 (Feel/Feedback)</Label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "soft", label: "너무 낭창거림" },
                  { id: "hard", label: "너무 딱딱함" },
                  { id: "heavy", label: "무겁고 버거움" },
                  { id: "light", label: "날리는 느낌" },
                ].map((fb) => (
                  <button
                    key={fb.id}
                    onClick={() => {
                      const current = spec.feelFeedback || [];
                      const next = current.includes(fb.id) 
                        ? current.filter(id => id !== fb.id) 
                        : [...current, fb.id];
                      setSpec({ feelFeedback: next });
                    }}
                    className={`h-16 px-5 rounded-2xl border text-sm font-bold transition-all duration-300 text-left flex items-center justify-between ${
                      spec.feelFeedback?.includes(fb.id)
                        ? "bg-primary/5 border-primary text-primary shadow-sm"
                        : "bg-white border-border text-muted-foreground"
                    }`}
                  >
                    {fb.label}
                    {spec.feelFeedback?.includes(fb.id) && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case "swing":
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-4">
              <div className="flex justify-between items-baseline mb-2">
                <Label className="text-sm text-muted-foreground tracking-widest uppercase">드라이버 스윙 스피드 (Swing Speed)</Label>
                <Monitor className="h-4 w-4 text-primary opacity-50" />
              </div>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="MPH"
                  className="h-20 text-4xl font-black text-center bg-primary/5 border-primary/20 focus-visible:ring-primary rounded-2xl"
                  value={spec.swingSpeed || ""}
                  onChange={(e) => setSpec({ swingSpeed: e.target.value })}
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-sm font-bold text-primary/40 font-mono">MPH</span>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-sm text-muted-foreground tracking-widest uppercase">스윙 템포 (Tempo)</Label>
              <div className="flex gap-3">
                {[
                  { id: "smooth", label: "부드러움", sub: "Smooth/Fluid" },
                  { id: "normal", label: "보통", sub: "Standard" },
                  { id: "hard", label: "강함", sub: "Aggressive/Hard" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSpec({ swingTempo: t.id as any })}
                    className={`flex-1 py-5 px-3 rounded-3xl border transition-all duration-300 group ${
                      spec.swingTempo === t.id 
                        ? "bg-primary text-white border-primary scale-105 shadow-xl" 
                        : "bg-white border-border text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    <p className="font-black text-sm mb-1">{t.label}</p>
                    <p className={`text-[10px] uppercase tracking-tighter opacity-70 font-bold ${spec.swingTempo === t.id ? "text-white" : ""}`}>{t.sub}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case "goals":
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-4">
              <Label className="text-sm text-muted-foreground tracking-widest uppercase">현재 주된 구질 (Ball Flight)</Label>
              <div className="flex gap-2">
                {[
                  { id: "slice", label: "슬라이스", sub: "Slice/Fade" },
                  { id: "straight", label: "스트레이트", sub: "Straight" },
                  { id: "hook", label: "훅", sub: "Hook/Draw" },
                ].map((bf) => (
                  <button
                    key={bf.id}
                    onClick={() => setSpec({ ballFlight: bf.id as any })}
                    className={`flex-1 py-5 border rounded-3xl transition-all duration-300 ${
                      spec.ballFlight === bf.id 
                        ? "bg-primary text-white border-primary shadow-lg" 
                        : "bg-white border-border text-muted-foreground"
                    }`}
                  >
                    <p className="font-black text-sm">{bf.label}</p>
                    <p className="text-[10px] opacity-70 mt-1 font-bold">{bf.sub}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-sm text-muted-foreground tracking-widest uppercase">희망 탄도 (Trajectory Goal)</Label>
              <div className="flex gap-2">
                {[
                  { id: "low", label: "낮은 탄도", sub: "Low Launch" },
                  { id: "mid", label: "중간 탄도", sub: "Mid Launch" },
                  { id: "high", label: "높은 탄도", sub: "High Launch" },
                ].map((tg) => (
                  <button
                    key={tg.id}
                    onClick={() => setSpec({ trajectoryGoal: tg.id as any })}
                    className={`flex-1 py-4 border rounded-2xl transition-all duration-300 ${
                      spec.trajectoryGoal === tg.id 
                        ? "bg-primary text-primary-foreground border-primary" 
                        : "bg-background/40 border-border/60 text-muted-foreground"
                    }`}
                  >
                    <p className="font-bold text-sm">{tg.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  if (showReport) {
    return (
      <PrescriptionReport
        onReset={() => {
          setShowReport(false);
          setCurrentStep(0);
        }}
      />
    );
  }

  return (
    <Card className="bg-white golf-shadow rounded-[2.5rem] overflow-hidden relative border-none border-primary/10">
      {/* 장식 배경 */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 -mr-16 -mt-16 rounded-full blur-3xl pointer-events-none" />
      
      {isSubmitting ? (
        <CardContent className="h-[600px] flex items-center justify-center p-0 relative z-20">
          <div className="animate-in fade-in zoom-in-95 duration-700">
            <GolfLoading message="Gemini AI가 최적의 샤프트를 분석 중입니다..." />
          </div>
        </CardContent>
      ) : (
        <>
      <CardHeader className="pb-4 pt-8 px-8 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              {STEPS[currentStep].icon}
            </div>
            <div>
              <p className="text-[10px] font-black text-primary/60 tracking-[0.2em] uppercase leading-none mb-1.5">Step 0{currentStep + 1}</p>
              <CardTitle className="text-2xl font-black text-slate-800 tracking-tight">
                {STEPS[currentStep].title}
              </CardTitle>
            </div>
          </div>
          
          <div className="flex gap-1.5">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-500 shadow-sm ${
                  i === currentStep
                    ? "w-12 bg-primary shadow-[0_0_10px_rgba(40,167,69,0.2)]"
                    : i < currentStep
                    ? "w-8 bg-primary/20"
                    : "w-8 bg-secondary"
                }`}
              />
            ))}
          </div>
        </div>
        <CardDescription className="text-base text-muted-foreground/90 font-bold leading-relaxed">
          {STEPS[currentStep].desc}
        </CardDescription>
      </CardHeader>

      <CardContent className="py-6 min-h-[380px] flex flex-col justify-center relative z-10 px-8">
        {renderStep()}
      </CardContent>

      <CardFooter className="flex justify-between border-t border-border/50 pt-8 pb-10 px-8 relative z-10 bg-secondary/20 backdrop-blur-sm">
        <Button
          variant="ghost"
          onClick={handlePrev}
          disabled={currentStep === 0 || isSubmitting}
          className="h-14 px-10 text-muted-foreground hover:text-primary transition-all font-bold rounded-full"
        >
          <ArrowLeft className="mr-3 h-4 w-4" />
          BACK
        </Button>

        {currentStep === STEPS.length - 1 ? (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-primary text-white h-14 px-12 transition-all font-black tracking-widest rounded-full hover:scale-105 active:scale-95 shadow-xl"
          >
            <Sparkles className="mr-3 h-5 w-5 text-white/80" />
            GENERATE REPORT
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            className="h-14 px-12 bg-white border-2 border-primary/20 text-primary hover:bg-primary hover:text-white transition-all font-black tracking-widest rounded-full group shadow-md"
          >
            NEXT STEP
            <ChevronRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        )}
      </CardFooter>
      </>
      )}
    </Card>
  );
}
