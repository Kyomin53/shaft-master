"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Filter, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilterSidebarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  brandFilter: string;
  setBrandFilter: (value: string) => void;
  flexFilter: string;
  setFlexFilter: (value: string) => void;
  weightFilter: string;
  setWeightFilter: (value: string) => void;
  brands: string[];
  flexes: string[];
  weights: string[];
  onReset: () => void;
}

export function FilterSidebar({
  searchQuery,
  setSearchQuery,
  brandFilter,
  setBrandFilter,
  flexFilter,
  setFlexFilter,
  weightFilter,
  setWeightFilter,
  brands,
  flexes,
  weights,
  onReset,
}: FilterSidebarProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-primary font-bold">
          <Filter className="h-5 w-5" />
          <span className="tracking-tight">필터 조건</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onReset}
          className="h-8 px-2 text-xs text-muted-foreground hover:text-primary transition-colors hover:bg-transparent"
        >
          <RotateCcw className="h-3 w-3 mr-1" />
          초기화
        </Button>
      </div>

      {/* 검색창 */}
      <div className="space-y-3">
        <Label htmlFor="search" className="text-[11px] text-muted-foreground uppercase tracking-widest font-semibold ml-1">모델명 검색</Label>
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
          <Input
            id="search"
            placeholder="상세 모델명을 입력하세요..."
            className="pl-9 bg-white/5 border-white/10 hover:border-primary/30 focus:border-primary transition-all duration-300 h-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 브랜드 필터 */}
      <div className="space-y-4">
        <Label className="text-[11px] text-muted-foreground uppercase tracking-widest font-semibold ml-1">브랜드 셀렉션</Label>
        <div className="flex flex-wrap gap-2">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setBrandFilter(brandFilter === brand ? "" : brand)}
              className={`px-3 py-2 rounded-md text-[11px] font-medium transition-all duration-300 border ${
                brandFilter === brand
                  ? "bg-primary text-primary-foreground border-primary gold-glow-sm"
                  : "bg-white/5 border-white/10 text-muted-foreground hover:border-primary/30 hover:text-primary"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* 강도 필터 */}
      <div className="space-y-4">
        <Label className="text-[11px] text-muted-foreground uppercase tracking-widest font-semibold ml-1">강도 (Flex)</Label>
        <div className="grid grid-cols-4 gap-2">
          {flexes.map((flex) => (
            <button
              key={flex}
              onClick={() => setFlexFilter(flexFilter === flex ? "" : flex)}
              className={`py-2 px-1 rounded-md text-[11px] font-bold transition-all duration-300 border ${
                flexFilter === flex
                  ? "bg-primary text-primary-foreground border-primary gold-glow-sm scale-[1.05]"
                  : "bg-white/5 border-white/10 text-muted-foreground hover:border-primary/30 hover:text-primary"
              }`}
            >
              {flex}
            </button>
          ))}
        </div>
      </div>

      {/* 무게 필터 */}
      <div className="space-y-4">
        <Label className="text-[11px] text-muted-foreground uppercase tracking-widest font-semibold ml-1">무게 대역 (Weight)</Label>
        <div className="grid grid-cols-2 gap-2">
          {weights.map((weight) => (
            <button
              key={weight}
              onClick={() => setWeightFilter(weightFilter === weight ? "" : weight)}
              className={`py-2 rounded-md text-[11px] font-medium transition-all duration-300 border ${
                weightFilter === weight
                  ? "bg-primary text-primary-foreground border-primary gold-glow-sm"
                  : "bg-white/5 border-white/10 text-muted-foreground hover:border-primary/30 hover:text-primary"
              }`}
            >
              {weight}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-8 border-t border-white/10 mt-8">
        <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
            <p className="text-[11px] text-primary/90 leading-relaxed text-center font-medium">
                "사용자의 스윙에 꼭 맞는 샤프트가 보이지 않나요?"
            </p>
            <p className="text-[10px] text-muted-foreground leading-relaxed text-center mt-2 group cursor-pointer hover:text-primary transition-colors">
                지금 바로 <span className="underline underline-offset-2">AI 에이전트와 상담</span> 을<br/>통해 맞춤 추천을 받아보세요.
            </p>
        </div>
      </div>
    </div>
  );
}
