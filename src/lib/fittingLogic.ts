import { Shaft, shaftData } from "@/data/shafts";
import { UserSpec } from "@/store/useUserStore";

export interface FittingResult {
  shaft: Shaft;
  matchRate: number;
  reason: string;
}

export function calculateFitting(spec: Partial<UserSpec>): FittingResult[] {
  const speed = parseInt(spec.swingSpeed || "0");
  const results: FittingResult[] = [];

  for (const shaft of shaftData) {
    let score = 0;
    let reasons: string[] = [];

    // 1. 스피드 매칭 (기본 점수 40점)
    const [min, max] = shaft.speedRange.split("-").map(s => parseInt(s.replace(/[^0-9]/g, "")));
    if (speed >= min && (!max || speed <= max)) {
      score += 40;
    } else if (Math.abs(speed - min) < 10) {
      score += 20;
    }

    // 2. 템포 가중치 (기본 점수 20점)
    if (spec.swingTempo === "hard") {
      if (shaft.weight >= 60 && (shaft.flex === "S" || shaft.flex === "X")) {
        score += 20;
        reasons.push("강한 템포에 적합한 무게와 강성");
      }
    } else if (spec.swingTempo === "smooth") {
      if (shaft.weight <= 55 && (shaft.flex === "R" || shaft.flex === "SR")) {
        score += 20;
        reasons.push("부드러운 템포에 적합한 탄성");
      }
    } else {
      score += 15;
    }

    // 3. 구질/토크 매칭 (기본 점수 20점)
    if (spec.ballFlight === "slice") {
      if (shaft.torque >= 3.5) {
        score += 20;
        reasons.push("슬라이스 방지를 위한 높은 토크값");
      }
    } else if (spec.ballFlight === "hook") {
      if (shaft.torque <= 3.2) {
        score += 20;
        reasons.push("훅 방지를 위한 낮은 토크와 뒤틀림 억제");
      }
    } else {
      score += 15;
    }

    // 4. 탄도/킥포인트 매칭 (기본 점수 20점)
    if (spec.trajectoryGoal === "high") {
      if (shaft.launch === "High") {
        score += 20;
        reasons.push("높은 탄도 형성을 위한 하이 런칭 프로파일");
      }
    } else if (spec.trajectoryGoal === "low") {
      if (shaft.launch === "Low") {
        score += 20;
        reasons.push("낮은 탄도 유지를 위한 로우 런칭 프로파일");
      }
    } else {
      score += 15;
    }

    // 5. 신장 가중치 (보너스 점수)
    if ((spec.height || 0) >= 180 && shaft.weight >= 65) {
      score += 5;
      reasons.push("신장에 따른 안정적인 무게감");
    }

    const matchRate = Math.min(Math.round((score / 105) * 100), 99);
    
    results.push({
      shaft,
      matchRate,
      reason: reasons.length > 0 ? reasons[0] : "종합 스펙 밸런스 최적"
    });
  }

  // 매칭율 순으로 정렬하여 상위 3개 반환
  return results.sort((a, b) => b.matchRate - a.matchRate).slice(0, 3);
}
