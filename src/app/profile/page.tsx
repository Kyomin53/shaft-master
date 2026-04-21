"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { storageService, SavedReport } from "@/lib/storageService";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Calendar, Zap, TrendingUp, Trophy, ArrowRight, User as UserIcon, LogIn, ChevronRight, Clock } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { PrescriptionReport } from "@/components/fitting/PrescriptionReport";
import { useUserStore } from "@/store/useUserStore";

export default function ProfilePage() {
  const { user, setAuthDialogOpen, isLoading } = useAuthStore();
  const { setSpec } = useUserStore();
  const [history, setHistory] = useState<SavedReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<SavedReport | null>(null);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      setIsHistoryLoading(true);
      const data = await storageService.getFittingHistory(user);
      setHistory(data);
      setIsHistoryLoading(false);
    }
    loadHistory();
  }, [user]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-20 text-center">
        <p className="text-muted-foreground animate-pulse font-bold">인증 상태 확인 중...</p>
      </div>
    );
  }

  // 보고서 상세 보기 모드
  if (selectedReport) {
    return (
      <div className="container mx-auto py-10 px-4 max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedReport(null)}
            className="rounded-full font-bold text-muted-foreground hover:text-primary transition-all"
          >
            ← 목록으로 돌아가기
          </Button>
          <div className="text-right">
            <p className="text-[10px] font-black text-primary/60 tracking-widest uppercase">Saved Analysis Date</p>
            <p className="text-sm font-bold text-slate-800">
              {format(new Date(selectedReport.created_at), "yyyy년 MM월 dd일 HH:mm", { locale: ko })}
            </p>
          </div>
        </div>
        <PrescriptionReport onReset={() => setSelectedReport(null)} />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 왼쪽: 프로필 섹션 */}
        <div className="lg:col-span-1">
          <Card className="bg-white border-none golf-shadow rounded-[2rem] overflow-hidden sticky top-24">
            <div className="bg-gradient-to-br from-primary via-primary/90 to-emerald-700 h-32 relative">
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                <div className="h-24 w-24 rounded-3xl bg-white p-1.5 shadow-xl rotate-3">
                  <div className="h-full w-full rounded-2xl bg-secondary flex items-center justify-center overflow-hidden">
                    {user?.user_metadata?.avatar_url ? (
                      <img src={user.user_metadata.avatar_url} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                      <UserIcon className="h-10 w-10 text-primary/40" />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="pt-16 pb-10 text-center">
              <h2 className="text-2xl font-black text-slate-800 mb-1">
                {user?.user_metadata?.full_name || (user ? "골퍼님" : "게스트 골퍼")}
              </h2>
              <p className="text-xs font-bold text-muted-foreground mb-6">{user?.email || "로그인하여 데이터를 영구 저장하세요"}</p>
              
              {!user && (
                <div className="space-y-4 px-4">
                  <div className="bg-secondary/50 rounded-2xl p-4 border border-primary/5">
                    <p className="text-xs text-slate-500 leading-relaxed font-bold">
                      로그인하시면 로컬에 저장된 데이터가<br/>
                      계정에 자동으로 안전하게 연동됩니다.
                    </p>
                  </div>
                  <Button onClick={() => setAuthDialogOpen(true)} className="w-full h-12 rounded-full bg-primary font-black tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all">
                    <LogIn className="w-4 h-4 mr-2" />
                    로그인 시작하기
                  </Button>
                </div>
              )}

              {user && (
                <div className="grid grid-cols-2 gap-3 px-2">
                  <div className="bg-primary/5 rounded-2xl p-4 text-center">
                    <p className="text-[9px] font-black text-primary/60 uppercase tracking-tighter mb-1">Total Fitting</p>
                    <p className="text-xl font-black text-primary font-mono">{history.length}</p>
                  </div>
                  <div className="bg-blue-50 rounded-2xl p-4 text-center">
                    <p className="text-[9px] font-black text-blue-400 uppercase tracking-tighter mb-1">Max Speed</p>
                    <p className="text-xl font-black text-blue-600 font-mono">
                      {history.length > 0 ? Math.max(...history.map(h => parseInt(h.swing_speed))) : 0}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 오른쪽: 히스토리 섹션 */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight">나의 피팅 히스토리</h3>
              <p className="text-sm text-muted-foreground font-bold">과거의 분석 기록을 통해 변화를 확인하세요.</p>
            </div>
            {user && (
              <span className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1.5 rounded-full uppercase tracking-widest">
                Database Sync Active
              </span>
            )}
          </div>

          {isHistoryLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 w-full bg-secondary/50 rounded-[1.5rem] animate-pulse" />
              ))}
            </div>
          ) : history.length === 0 ? (
            <Card className="bg-white border-dashed border-2 border-slate-200 rounded-[2rem] p-12 text-center">
              <div className="bg-secondary/50 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4 text-slate-300">
                <Trophy className="h-8 w-8" />
              </div>
              <p className="text-slate-400 font-bold mb-6">아직 생성된 피팅 리포트가 없습니다.</p>
              <Link 
                href="/fitting"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "rounded-full h-12 px-8 bg-primary font-black tracking-widest flex items-center justify-center text-primary-foreground hover:bg-primary/90"
                )}
              >
                첫 피팅 시작하기
              </Link>
            </Card>
          ) : (
            <div className="space-y-4">
              {history.map((report, idx) => (
                <Card 
                  key={idx} 
                  onClick={() => {
                    // 리포트 볼 때 당시의 spec을 스토어에 세팅 (PrescriptionReport가 spec을 바라보고 결과 계산함)
                    // 만약 storageService가 results를 같이 들고 있다면 PrescriptionReport를 results 기반으로 렌더링하도록 수정할 수 있음.
                    // 현재는 spec을 주입하여 PrescriptionReport가 다시 계산하도록 유도.
                    setSpec(report.spec);
                    setSelectedReport(report);
                  }}
                  className="bg-white border-none golf-shadow-sm rounded-[1.5rem] overflow-hidden hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group hover:shadow-xl border-l-[6px] border-l-primary/30"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span className="text-[11px] font-bold">
                            {format(new Date(report.created_at), "yyyy.MM.dd HH:mm", { locale: ko })}
                          </span>
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-primary/60 uppercase tracking-widest leading-none mb-1">Recommended Model</p>
                          <h4 className="text-xl font-bold text-slate-800 group-hover:text-primary transition-colors">
                            {report.recommended_model}
                          </h4>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 items-center">
                        <div className="text-right">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Match</p>
                          <p className="text-2xl font-black text-primary font-mono">{report.match_rate}%</p>
                        </div>
                        <div className="h-8 w-px bg-slate-100" />
                        <div className="text-right">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Speed</p>
                          <p className="text-xl font-black text-slate-700 font-mono">{report.swing_speed}<small className="text-[10px] ml-0.5">mph</small></p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-all group-hover:translate-x-1" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
