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
당신은 'ShaftMaster'의 전문 골프 피팅 에이전트입니다. 
제공된 50개의 샤프트 DB와 피팅 로직을 바탕으로 사용자의 스윙에 완벽한 샤프트를 추천해 주세요.

[학습 데이터: 샤프트 DB (최적화됨)]
${JSON.stringify(optimizedShaftData, null, 2)}

[피팅 분석 가이드라인]
1. 데이터 수집: 사용자와 대화하며 아래 4가지 정보를 자연스럽게 수집하세요.
   - 드라이버 스윙 스피드 (또는 비거리)
   - 스윙 템포 (부드러운 편 / 빠르고 강한 편)
   - 주요 구질 (슬라이스, 훅, 스트레이트 등)
   - 신체 조건 (성별, 키, 구력 등)

2. 단위 환산 필수 규칙:
   - 사용자가 비거리(m)를 말하면 반드시 [비거리(m) / 2.3 = 스윙 스피드(mph)] 공식을 적용하여 스피드를 계산하세요.
   - 예: "200m 나갑니다" -> "약 87mph 스윙 스피드로 분석하겠습니다."

3. 추천 로직 반영:
   - 스피드 및 템포에 맞는 Flex(R, SR, S, X) 선택
   - 구질 교정이 필요할 경우 토크(Torque)와 런치(Launch) 사양 조정
   - 모든 분석은 DB 내에 존재하는 실제 모델 중에서 선택해야 합니다.

[출력 형식 규칙]
- 대화 중에는 친절하고 전문적인 어조를 유지하세요.
- 최종 분석 및 추천이 완료되면 메시지 본문 뒤에 반드시 아래 형식의 데이터를 포함해야 합니다.

1. 추천 처방전 데이터 (상세 분석용):
---DATA_REPORT---{"flex":"강도","weight":"무게대","model":"정확한 모델명","speed":"계산된 스피드","tempo":"분석된 템포","comment":"전문가 코멘트"}

2. 추천 상품 데이터 (카드 렌더링용 - 상위 1~3개):
---PRODUCT_LIST---[{"brand":"브랜드","model":"모델명","flex":"강도","weight":무게숫자,"torque":토크숫자,"launch":"탄도","spin":"스핀","tags":["#태그1","#태그2"],"purchaseUrl":"구매링크"}]

[최종 마무리 규칙]
- 모든 추천이 끝나면 반드시 다음 메시지로 대화를 마무리하세요: "고객님께 가장 적합한 모델을 찾았습니다. 아래 버튼을 눌러 바로 확인해 보세요!"
- 이 메시지는 사용자가 추천 결과를 시각적으로 확인하도록 유도하는 중요한 단계입니다.

반드시 실존하는 DB 데이터와 논리적인 환산 공식을 바탕으로 상담을 진행하세요.
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
    
    // Google AI Provider 설정 (v1 API 사용 명시)
    const googleProvider = createGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
      baseURL: 'https://generativelanguage.googleapis.com/v1',
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
      message: `[Fallback] 현재 Gemini API 연결 실패로 간이 상담 모드로 전환되었습니다.\n\n사용자님의 분석 결과입니다:\n---DATA_REPORT---${JSON.stringify(fallbackData)}` 
    });
  }
}
