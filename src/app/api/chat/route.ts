import { NextResponse } from 'next/server';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import { shaftData } from '@/data/shafts';

// 시스템 프롬프트 설정 (데이터 최적화: 불필요한 필드 제거로 크기 축소)
const optimizedShaftData = shaftData.map(s => {
  const { tags, ...rest } = s; // tags 필드만 제거하고 purchaseUrl은 유지
  return rest;
});

const SYSTEM_PROMPT = `
당신은 '샤프트 마스터'의 수석 골프 피팅 전문가(Fitter)입니다. 
딱딱한 기계가 아닌, 트랙맨 룸에서 고객을 응대하는 친숙하고 전문적인 사람 피터처럼 대화해 주세요. 
제공된 샤프트 DB를 바탕으로 사용자의 스윙에 완벽한 샤프트를 추천합니다.

[학습 데이터: 샤프트 DB]
\${JSON.stringify(optimizedShaftData, null, 2)}

[피팅 진행 가이드라인: 점진적 질문 모드]
1. 필수 수집 데이터 (4가지):
   ① 드라이버 비거리 또는 스윙 스피드
   ② 스윙 템포 (예: 부드러운 편, 빠르고 강한 편)
   ③ 주요 구질 또는 고민 (예: 슬라이스, 훅, 스트레이트)
   ④ 현재 사용 중인 샤프트와 불편한 점 (예: "브랜드/강도 불문하고 지금 치는게 너무 무겁다/날린다" 등)

2. 대화의 흐름 (엄격한 순서 지킴):
   - 고객이 대답을 할 때마다 "즉시 샤프트를 추천하지 마세요."
   - 위 4가지 필수 데이터 중 아직 파악되지 않은 정보가 있다면, 친절하게 해당 정보를 추가로 질문하세요.
   - ❗️매우 중요: 한 번의 답변에서는 **반드시 한 번에 단 한 가지 질문만** 하세요. 절대로 2~3개의 질문을 동시에 던지지 마세요. (예: 템포를 묻고 답변을 받으면, 그 다음 턴에서 구질을 물어보세요.)
   - 단, 고객이 특정 질문에 대해 "모르겠다", "상관없다", "스킵해달라" 등의 반응을 보이면 해당 조건은 '스킵(알 수 없음)'으로 간주하고 넘어갑니다.
   - 비거리(m)가 입력되면 [비거리 / 2.3 = 달성 스윙스피드(mph)] 공식으로 환산해서 언급해주는 것은 유지합니다. 

3. 최종 추천 시점:
   - 위 4가지 질문에 대해 고객이 모두 대답했거나 스킵했을 때, 비로소 취합된 정보를 바탕으로 단 한 번의 "최종 분석 및 샤프트 추천(처방전 포함)"을 진행하세요.
   - 그 전까지는 오직 질문과 공감만 해야 하며 처방전(DATA_REPORT)이나 추천 리스트(PRODUCT_LIST)를 절대 출력하지 마세요.

4. 텍스트 포맷 규칙:
   - ❗️절대 마크다운 볼드체(**텍스트**) 문법을 사용하지 마세요. 텍스트는 굵기 조절 없이 일반 평문으로만 작성하세요.

[출력 데이터 형식 (시스템 UI 렌더링용 ✨필수✨)]
- 처방전과 추천 리스트 UI를 화면에 띄우기 위해, 조건에 맞는 추천 모델이 결정되면 답변의 '가장 마지막 부분'에 아래 시작/종료 태그쌍과 함께 JSON 데이터를 반드시 삽입해야 합니다.
- ❗️주의사항: 절대로 마크다운 코드블록(\`\`\`json)을 쓰지 말고, 텍스트 그대로 출력하세요. 포맷은 반드시 지켜야 합니다.

1. 추천 처방전 데이터 태그 (상세 분석용):
---DATA_REPORT_START---
{"flex":"강도","weight":"무게대","model":"정확한 모델명","speed":"계산된 스피드","tempo":"파악된 템포(모르면 '파악 중')","comment":"짧고 전문적인 피터의 한줄 코멘트"}
---DATA_REPORT_END---

2. 추천 상품 데이터 (카드 렌더링용 - 상위 1~3개):
---PRODUCT_LIST_START---
[{"brand":"브랜드","model":"모델명","flex":"강도","weight":무게숫자,"torque":토크숫자,"launch":"탄도","spin":"스핀","tags":["#해시태그1","#해시태그2"],"purchaseUrl":"구매링크"}]
---PRODUCT_LIST_END---

[마무리 지침]
- 첫 분석이든 최종 추천이든, 데이터가 포함된 답변의 마지막은 항상 이렇게 마무리하세요: "제가 고객님을 위해 현재까지 파악한 내용으로 처방전을 띄워드렸습니다. 확인해 보시고 궁금한 점이나 추가 정보 편하게 말씀해 주세요! ⛳"
`;

export async function POST(req: Request) {
  // 디버깅 로그: 환경 변수 로드 확인
  console.log("Gemini API Key Loaded Status:", !!process.env.GOOGLE_GENERATIVE_AI_API_KEY);
  
  let requestBody;
  try {
    requestBody = await req.json();
  } catch (e) {
    console.error("Request JSON parse error:", e);
    return NextResponse.json({ message: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  const messages = requestBody.messages || [];

  try {
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      throw new Error("GOOGLE_GENERATIVE_AI_API_KEY가 환경 변수에 설정되지 않았습니다.");
    }

    // 메시지 정제: 비어있는 메시지 필터링 및 역할 매핑 확인
    const sanitizedMessages = messages
      .filter((m: any) => m.content && m.content.trim() !== '')
      .map((m: any) => ({
        role: m.role,
        content: m.content,
      }));

    const MODEL_NAMES = [
      'gemini-1.5-flash',
      'gemini-1.5-flash-latest',
      'gemini-flash-latest',
      'gemini-2.0-flash',
      'gemini-2.5-flash',
      'gemini-3-flash-preview',
      'models/gemini-1.5-flash'
    ];

    console.log("Gemini API 호출 시도 중 (v1 endpoint)...");
    
    // 디버깅: 전체 요청 데이터 로깅 (사용자 요청 사항)
    console.log("--- FULL_REQUEST_DATA (DEBUG) ---");
    console.log(JSON.stringify({
      system: SYSTEM_PROMPT.substring(0, 500) + "...", // 프롬프트가 너무 길어 앞부분만 로그
      messages: sanitizedMessages,
      model_candidates: MODEL_NAMES
    }, null, 2));
    
    // Google AI Provider 설정 (기본값 사용)
    const googleProvider = createGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    });



    let text = '';
    let usedModel = '';
    let lastError = null;

    // 모델 식별자를 순차적으로 시도
    for (const modelName of MODEL_NAMES) {
      try {
        console.log(`Using Model ID: [${modelName}]`);
        
        const result = await generateText({
          model: googleProvider(modelName),
          system: SYSTEM_PROMPT,
          messages: sanitizedMessages,
          temperature: 0.7, // 매개변수 안정화
          topP: 0.8,        // 매개변수 안정화
        });
        
        text = result.text;
        usedModel = modelName;
        break; // 성공 시 루프 탈출
      } catch (error: any) {
        lastError = error;
        // 404 에러인 경우 다음 모델 시도
        if (error.status === 404 || error.message?.includes('404') || error.message?.includes('not found')) {
          console.warn(`Model [${modelName}] failed with 404, trying next...`);
          continue;
        }
        // 다른 종류의 에러는 즉시 중단 (fallback으로 이동)
        throw error;
      }
    }

    if (!text && lastError) {
      throw lastError;
    }

    console.log(`Gemini 응답 성공 (Used Model: ${usedModel})`);
    return NextResponse.json({ message: text });

  } catch (error: any) {
    console.error("Gemini API Error Detail:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    // Fallback: 기존 모크 로직 (API 장애 시 대응)
    const lastUserMessage = messages.filter((m: any) => m.role === 'user').pop()?.content || "";
    
    // 단위 환산 로직 포함 (비거리 -> 스피드)
    const distanceMatch = lastUserMessage.match(/(\d+)\s*(m|미터)/i);
    const speedMatch = lastUserMessage.match(/(\d+)\s*(mph|마일|스피드)/i);
    const anyNumberMatch = lastUserMessage.match(/\d+/);
    
    let speedVal = 90;
    let isConverted = false;

    if (distanceMatch) {
      speedVal = Math.round(parseInt(distanceMatch[1]) / 2.3);
      isConverted = true;
    } else if (speedMatch) {
      speedVal = parseInt(speedMatch[1]);
    } else if (anyNumberMatch) {
      speedVal = parseInt(anyNumberMatch[0]);
    }
    
    const fallbackData = {
      flex: speedVal > 95 ? "S" : speedVal > 85 ? "SR" : "R",
      weight: speedVal > 95 ? "60g 대" : "50g 대",
      model: "Fujikura Ventus Blue TR (Fallback Mode)",
      speed: `${speedVal} mph${isConverted ? " (환산됨)" : ""}`,
      tempo: "보통",
      comment: `현재 AI 서버 연결이 원활하지 않아 간이 분석 결과(Fallback)를 제공합니다. 
                에러: ${error.message?.substring(0, 50)}...
                API 키가 유효한지, .env 파일이 올바르게 로드되었는지 확인해 주세요.`
    };

    return NextResponse.json({ 
      message: `[Fallback] 현재 Gemini API 연결 실패로 간이 상담 모드로 전환되었습니다.\n\n사용자님의 분석 결과입니다:\n---DATA_REPORT_START---\n${JSON.stringify(fallbackData)}\n---DATA_REPORT_END---` 
    });
  }
}
