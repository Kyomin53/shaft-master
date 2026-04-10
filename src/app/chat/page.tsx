import { ChatInterface } from "@/components/chat/ChatInterface";

export const metadata = {
  title: "AI 골프 에이전트 | ShaftMaster",
  description: "골프 스윙, 장비, 피팅에 관한 모든 질문을 AI에게 물어보세요",
};

export default function ChatPage() {
  return (
    <div className="flex-1 flex flex-col relative overflow-hidden" style={{ height: "calc(100vh - 4rem)" }}>
      {/* 배경 글로우 */}
      <div
        className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.77 0.175 78 / 0.07) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.60 0.14 70 / 0.05) 0%, transparent 70%)",
        }}
      />

      <div className="flex-1 max-w-4xl w-full mx-auto p-3 md:p-5 flex flex-col h-full z-10">
        <ChatInterface />
      </div>
    </div>
  );
}
