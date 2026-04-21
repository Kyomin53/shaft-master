"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Loader2, Sparkles, ClipboardCheck, Gauge, Zap, Search, Trophy } from "lucide-react";
import { GolfLoading, GolfLoadingSmall } from "@/components/ui/golf-loading";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ReportData {
  flex: string;
  weight: string;
  model: string;
  speed: string;
  tempo: string;
  comment: string;
}

// 프리미엄 처방전 카드 컴포넌트
function PrescriptionCard({ data }: { data: ReportData }) {
  return (
    <div className="w-full mt-4 p-1 rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/50 to-primary/20 border border-primary/20 shadow-xl animate-in zoom-in-95 duration-500">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 border border-primary/10">
        <div className="flex items-center justify-between mb-6 border-b border-primary/5 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Trophy className="h-5 w-5 text-primary" />
            </div>
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold golf-gradient-text tracking-tight">샤프트 마스터 처방전 ⛳</h3>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest opacity-70">Personalized Fitting Report</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-primary/60 font-bold font-mono uppercase tracking-tighter">FITTING CERTIFICATE</span>
          </div>
        </div>

        {/* 수집 데이터 영역 */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-secondary/50 rounded-2xl p-3 border border-border/50">
            <div className="flex items-center gap-1.5 mt-1.5 mb-2">
              <Trophy className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Medical Analysis ⛳</span>
            </div>
            <p className="text-xl font-black text-slate-800 leading-tight">샤프트 정밀 피팅 리포트</p>
            <p className="text-[11px] text-slate-500 font-bold mt-1.5 flex items-center gap-1.5">
              <Zap className="h-3 w-3 text-primary" />
              Gemini 1.5 Flash Precision Logic
            </p>
          </div>
          <div className="bg-secondary/50 rounded-2xl p-3 border border-border/50">
            <div className="flex items-center gap-2 mb-1 opacity-70">
              <Zap className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-bold">TEMPO</span>
            </div>
            <p className="text-sm font-bold text-foreground">{data.tempo}</p>
          </div>
        </div>

        {/* 추천 결과 영역 */}
        <div className="space-y-4">
          <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 to-transparent rounded-2xl p-4 border border-primary/20">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] font-bold text-primary/80">RECOMMENDED SHAFT MODEL</span>
              <Sparkles className="h-3 w-3 text-primary animate-pulse" />
            </div>
            <p className="text-xl font-black text-foreground tracking-tighter mb-4">{data.model}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] block font-bold opacity-60 mb-1 uppercase">Stiffness</span>
                <span className="text-lg font-extrabold text-primary">{data.flex}</span>
              </div>
              <div>
                <span className="text-[10px] block font-bold opacity-60 mb-1 uppercase">Weight</span>
                <span className="text-lg font-extrabold text-primary">{data.weight}</span>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Search className="h-3 w-3 text-muted-foreground" />
              <span className="text-[11px] font-semibold opacity-70">FITTING COMMENT</span>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground italic">
              "{data.comment}"
            </p>
          </div>
          
          {/* 구매 버튼 추가 */}
          <Button 
            className="w-full mt-4 bg-slate-900 hover:bg-black text-white h-12 rounded-xl font-bold tracking-tight shadow-lg transition-all hover:scale-[1.02] border border-primary/20"
            onClick={() => {
              const query = encodeURIComponent(data.model);
              const searchUrl = `https://search.shopping.naver.com/search/all?query=${query}`;
              window.open(searchUrl, '_blank');
            }}
          >
            기능성 정품 최저가 확인하기 🛍️
          </Button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-[9px] text-muted-foreground/40 italic">※ This report is generated by ShaftMaster AI Analysis Engine</p>
        </div>
      </div>
    </div>
  );
}

// 추천 상품 리스트 컴포넌트
function ProductList({ products }: { products: any[] }) {
  return (
    <div className="w-full mt-4 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="flex items-center gap-2 px-1">
        <div className="p-1 bg-primary/20 rounded-md">
          <Search className="h-3 w-3 text-primary" />
        </div>
        <h4 className="text-xs font-bold text-primary/90 uppercase tracking-wider">Recommended Products</h4>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {products.map((product, idx) => (
          <div key={`${product.model}-${idx}`} className="premium-card rounded-2xl p-4 border border-border/50 hover:border-primary/30 transition-all duration-300">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-[9px] font-bold text-primary/60 uppercase tracking-widest">{product.brand}</span>
                <h5 className="text-sm font-bold text-foreground">{product.model}</h5>
              </div>
              <div className="bg-primary/10 px-2 py-0.5 rounded-full text-[10px] font-bold text-primary border border-primary/20">
                {product.flex}
              </div>
            </div>
            <div className="flex gap-3 mt-3">
              <div className="flex flex-col">
                <span className="text-[8px] text-muted-foreground uppercase">Weight</span>
                <span className="text-xs font-semibold">{product.weight}g</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] text-muted-foreground uppercase">Torque</span>
                <span className="text-xs font-semibold">{product.torque}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] text-muted-foreground uppercase">Launch</span>
                <span className="text-xs font-semibold">{product.launch}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mt-3">
              {product.tags?.slice(0, 2).map((tag: string) => (
                <span key={tag} className="text-[8px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>

            {/* 개별 상품 구매 버튼 */}
            <Button 
              size="sm"
              variant="outline"
              className="w-full mt-4 h-9 rounded-xl text-[10px] font-black border-primary/20 hover:bg-primary/5 text-primary transition-all"
              onClick={() => {
                if (product.purchaseUrl) {
                  window.open(product.purchaseUrl, '_blank');
                } else {
                  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(product.brand + ' ' + product.model + ' 구매')}`;
                  window.open(searchUrl, '_blank');
                }
              }}
            >
              지금 구매하기
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);

  // 자동 스크롤
  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `서버 응답 오류 (${response.status})`);
      }
      
      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error("Chat failed:", error);
      
      const assistantErrorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `⚠️ 통신 오류가 발생했습니다: ${error.message}\n\n1. .env 파일에 API 키가 있는지 확인\n2. npm install 후 서버 재시작 여부 확인\n3. 인터넷 연결 상태 확인 부탁드립니다.`,
      };

      setMessages((prev) => [...prev, assistantErrorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-full bg-white golf-shadow rounded-[2rem] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 border-none">
      {/* 채팅 헤더 */}
      <div className="flex-shrink-0 h-20 border-b border-border flex items-center px-8 bg-secondary/30">
        <div className="flex items-center space-x-3">
          <div className="relative bg-primary/15 p-2 rounded-full border border-primary/30">
            <Bot className="h-5 w-5 text-primary" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-background" />
          </div>
          <div>
            <h2 className="font-bold text-lg tracking-tight">골프 AI 에이전트 🏌️‍♂️</h2>
            <p className="text-[11px] text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis">Gemini 1.5 Flash 실시간 상담 엔진 가동 중</p>
          </div>
        </div>
      </div>

      {/* 메시지 영역 */}
      <ScrollArea className="flex-1">
        <div ref={viewportRef} className="space-y-6 max-w-3xl mx-auto p-4 py-6">
          {/* 빈 상태 (AI 선제 질문) */}
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-5 animate-in fade-in zoom-in-95 duration-500">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center premium-glow shadow-sm">
                <Bot className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-4 text-center max-w-sm w-full mx-auto">
                <p className="text-2xl font-black golf-gradient-text tracking-tighter">안녕하세요! 수석 피터입니다 ⛳</p>
                <div className="text-[13px] text-foreground leading-relaxed bg-white border border-border shadow-sm p-5 rounded-3xl rounded-tl-sm text-left relative">
                  고객님께 가장 완벽한 샤프트를 찾아드리기 위해 피팅을 시작하겠습니다.<br /><br />
                  가장 먼저, 평소 <strong>평균 드라이버 비거리</strong>가 어떻게 되시는지 편하게 말씀해 주시겠어요?<br />
                  <span className="text-muted-foreground mt-2 block text-[11px]">(예: "200m 나갑니다!", "스피드가 95마일 정도 돼요")</span>
                </div>
              </div>
            </div>
          )}

          {/* 메시지 목록 */}
          {messages.map((msg) => {
            // 특별한 데이터 태그들 분리 및 텍스트 추출
            let displayContent = msg.content;
            let reportData: ReportData | null = null;
            let productListData: any[] | null = null;

            if (msg.role === "assistant") {
              // _START 및 _END 태그를 이용한 완벽한 파싱 로직
              const extractBoundaryJSON = (startMarker: string, endMarker: string) => {
                const startIdx = displayContent.indexOf(startMarker);
                const endIdx = displayContent.indexOf(endMarker);
                
                // 마커가 없거나 시작이 끝보다 뒤에 있으면 실패
                if (startIdx === -1 || endIdx === -1 || startIdx >= endIdx) return null;
                
                // 마커 사이의 순수 JSON 문자열 추출
                const jsonStr = displayContent.substring(startIdx + startMarker.length, endIdx).trim();
                let parsedData = null;
                
                try {
                  // 혹시 모를 마크다운 잔재(```json) 제거
                  const cleanJsonStr = jsonStr.replace(/```json/gi, "").replace(/```/g, "").trim();
                  parsedData = JSON.parse(cleanJsonStr);
                } catch (e) {
                  console.error(`${startMarker} parse error`, e);
                }
                
                // 마커를 포함한 해당 블록 전체를 텍스트에서 완전히 삭제
                const stringToRemove = displayContent.substring(startIdx, endIdx + endMarker.length);
                displayContent = displayContent.replace(stringToRemove, "");
                
                return parsedData;
              };

              reportData = extractBoundaryJSON("---DATA_REPORT_START---", "---DATA_REPORT_END---");
              productListData = extractBoundaryJSON("---PRODUCT_LIST_START---", "---PRODUCT_LIST_END---");
              
              // 혹시 남아있을 수 있는 잔재 지우기
              displayContent = displayContent.replace(/---DATA_REPORT_START---[\s\S]*?---DATA_REPORT_END---/g, "");
              displayContent = displayContent.replace(/---PRODUCT_LIST_START---[\s\S]*?---PRODUCT_LIST_END---/g, "");
              
              // 이전 버전 마커(fallback용) 잔재 지우기
              displayContent = displayContent.replace(/---DATA_REPORT---[\s\S]*?}/g, "");
              displayContent = displayContent.replace(/---PRODUCT_LIST---[\s\S]*?\]/g, "");
              
              displayContent = displayContent.trim();
            }

            return (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-3 max-w-[90%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  {/* 아바타 */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 ${
                      msg.role === "user" ? "bg-secondary text-secondary-foreground" : "bg-primary/15 text-primary border border-primary/25"
                    }`}
                  >
                    {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>

                  {/* 메시지 본문 + 카드들 */}
                  <div className="flex flex-col gap-2 w-full">
                    {displayContent.trim() && (
                      <div
                        className={`px-5 py-3.5 rounded-3xl text-[14px] leading-relaxed whitespace-pre-wrap ${
                          msg.role === "user" ? "bg-primary text-white rounded-tr-sm shadow-md" : "bg-secondary/40 border border-border/50 rounded-tl-sm"
                        }`}
                      >
                        {displayContent}
                      </div>
                    )}
                    
                    {reportData && <PrescriptionCard data={reportData} />}
                    {productListData && <ProductList products={productListData} />}
                  </div>
                </div>
              </div>
            );
          })}

          {/* 로딩 인디케이터 */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/15 text-primary border border-primary/25 flex items-center justify-center mt-1">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="px-1 py-1">
                  <GolfLoadingSmall />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* 입력 영역 */}
      <div className="flex-shrink-0 p-6 border-t border-border bg-secondary/10">
        <form 
          onSubmit={handleSubmit} 
          className="max-w-3xl mx-auto relative flex items-center gap-2"
        >
          <Input
            id="message-input"
            name="message"
            className="flex-1 pr-16 py-7 text-sm rounded-2xl bg-white border-border focus-visible:ring-primary/30 transition-all placeholder:text-muted-foreground/50 shadow-sm"
            placeholder="스피드나 템포를 말씀해 주세요... 🏌️‍♂️"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-2 h-10 w-10 rounded-full bg-primary text-white hover:bg-primary/90 transition-all hover:scale-110 disabled:opacity-40 shadow-lg"
            disabled={!input.trim() || isLoading}
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </Button>
        </form>
        <p className="text-center text-[11px] text-muted-foreground/60 mt-3 font-medium">
          전문적인 데이터 분석을 통해 최적의 샤프트를 처방합니다. ⛳
        </p>
      </div>
    </Card>
  );
}
