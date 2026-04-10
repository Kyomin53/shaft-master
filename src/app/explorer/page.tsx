"use client";

import { useState, useMemo } from "react";
import { shaftData } from "@/data/shafts";
import { ShaftCard } from "@/components/explorer/ShaftCard";
import { FilterSidebar } from "@/components/explorer/FilterSidebar";
import { ShoppingBag, LayoutGrid, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ExplorerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [flexFilter, setFlexFilter] = useState("");
  const [weightFilter, setWeightFilter] = useState("");

  const brands = useMemo(() => Array.from(new Set(shaftData.map(s => s.brand))).sort(), []);
  const flexes = useMemo(() => ["R", "SR", "S", "X"], []);
  const weights = useMemo(() => ["40g대", "50g대", "60g대", "70g대+"], []);

  const filteredShafts = useMemo(() => {
    return shaftData.filter(shaft => {
      // 검색어 필터링 (모델명 또는 브랜드)
      const matchesSearch = shaft.model.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           shaft.brand.toLowerCase().includes(searchQuery.toLowerCase());
      
      // 브랜드 필터링
      const matchesBrand = brandFilter === "" || shaft.brand === brandFilter;
      
      // 강도 필터링
      const matchesFlex = flexFilter === "" || shaft.flex === flexFilter;
      
      // 무게 필터링
      let matchesWeight = true;
      if (weightFilter !== "") {
        if (weightFilter === "40g대") matchesWeight = shaft.weight < 50;
        else if (weightFilter === "50g대") matchesWeight = shaft.weight >= 50 && shaft.weight < 60;
        else if (weightFilter === "60g대") matchesWeight = shaft.weight >= 60 && shaft.weight < 70;
        else if (weightFilter === "70g대+") matchesWeight = shaft.weight >= 70;
      }

      return matchesSearch && matchesBrand && matchesFlex && matchesWeight;
    });
  }, [searchQuery, brandFilter, flexFilter, weightFilter]);

  const resetFilters = () => {
    setSearchQuery("");
    setBrandFilter("");
    setFlexFilter("");
    setWeightFilter("");
  };

  return (
    <div className="min-h-screen bg-background pt-12 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-screen-2xl">
        
        {/* Header Section */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-12">
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-[0.2em] gold-glow-sm">
              <ShoppingBag className="h-3.5 w-3.5" />
              Dynamic Shaft Showroom
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Shaft <span className="gold-text">Explorer</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              최정상급 브랜드의 최신 샤프트 데이터를 한곳에서 확인하세요.<br className="hidden md:block" />
              전문가 급 필터링으로 당신의 스윙에 최적화된 스펙을 찾을 수 있습니다.
            </p>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
            <div className="flex flex-col items-end">
                <span className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Total Dataset</span>
                <div className="flex items-center gap-2">
                    <LayoutGrid className="h-4 w-4 text-primary" />
                    <span className="font-bold text-foreground">{shaftData.length} Models</span>
                </div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="flex flex-col items-end">
                <span className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Filtered</span>
                <div className="flex items-center gap-2">
                    <span className="text-primary font-bold text-xl leading-none">{filteredShafts.length}</span>
                    <span className="text-xs">Results</span>
                </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-80 shrink-0">
            <div className="lg:sticky lg:top-24">
              <FilterSidebar 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                brandFilter={brandFilter}
                setBrandFilter={setBrandFilter}
                flexFilter={flexFilter}
                setFlexFilter={setFlexFilter}
                weightFilter={weightFilter}
                setWeightFilter={setWeightFilter}
                brands={brands}
                flexes={flexes}
                weights={weights}
                onReset={resetFilters}
              />
            </div>
          </aside>

          {/* Grid Content */}
          <main className="flex-1">
            {filteredShafts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in zoom-in-95 duration-1000">
                {filteredShafts.map((shaft, idx) => (
                  <ShaftCard key={`${shaft.model}-${idx}`} shaft={shaft} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl animate-in fade-in duration-700">
                <div className="p-6 rounded-full bg-white/5 mb-6">
                    <Info className="h-10 w-10 text-muted-foreground opacity-20" />
                </div>
                <h3 className="text-2xl font-bold text-muted-foreground mb-3 tracking-tight">조건에 맞는 샤프트가 없습니다</h3>
                <p className="text-base text-muted-foreground/60 mb-8 max-w-sm text-center font-light">
                    검색어를 단순화하거나 필터 조건을 초기화하여 더 많은 샤프트를 확인해보세요.
                </p>
                <Button 
                    variant="outline" 
                    onClick={resetFilters} 
                    className="h-12 px-8 border-primary/40 hover:bg-primary/10 hover:border-primary/60 transition-all font-semibold"
                >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    검색 조건 초기화하기
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

// Helper to keep the RotateCcw icon import happy
function RotateCcw({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
}
