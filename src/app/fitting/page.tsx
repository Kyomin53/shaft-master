import { FittingWizard } from "@/components/fitting/FittingWizard";

export const metadata = {
  title: "샤프트 피팅 | ShaftMaster",
  description: "스윙 데이터 기반 맞춤 샤프트 추천",
};

export default function FittingPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative min-h-[calc(100vh-4rem)]">
      {/* 배경 글로우 */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.77 0.175 78 / 0.10) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* 상단 타이틀 */}
        <div className="text-center mb-8 space-y-2">
          <p className="text-xs font-bold text-primary uppercase tracking-widest">
            AI 피팅 시스템
          </p>
          <h1 className="text-3xl font-bold tracking-tight gold-text">
            샤프트 피팅 위저드
          </h1>
          <p className="text-muted-foreground text-sm">
            5가지 질문으로 당신에게 꼭 맞는 샤프트를 찾아드립니다.
          </p>
        </div>

        <FittingWizard />
      </div>
    </div>
  );
}
