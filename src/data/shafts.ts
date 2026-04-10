export interface Shaft {
  brand: string;
  model: string;
  flex: string;
  weight: number;
  torque: number;
  launch: string;
  spin: string;
  speedRange: string;
  tags: string[];
  purchaseUrl: string;
}

export const shaftData: Shaft[] = [
  { brand: "Fujikura", model: "Ventus Blue VeloCore+", flex: "S", weight: 65, torque: 3.1, launch: "Mid", spin: "Low", speedRange: "95-105", tags: ["#상급자용", "#안정성", "#베스트셀러"], purchaseUrl: "https://www.google.com/search?q=Fujikura+Ventus+Blue+VeloCore%2B+구매" },
  { brand: "Fujikura", model: "Ventus Black VeloCore+", flex: "X", weight: 64, torque: 3.3, launch: "Low", spin: "Low", speedRange: "105+", tags: ["#히터용", "#저스핀", "#프로추천"], purchaseUrl: "https://www.google.com/search?q=Fujikura+Ventus+Black+VeloCore%2B+구매" },
  { brand: "Fujikura", model: "Ventus Red VeloCore+", flex: "S", weight: 64, torque: 3.2, launch: "High", spin: "Mid", speedRange: "90-100", tags: ["#비거리최대화", "#고탄도", "#드로우성향"], purchaseUrl: "https://www.google.com/search?q=Fujikura+Ventus+Red+VeloCore%2B+구매" },
  { brand: "Fujikura", model: "Ventus TR Blue", flex: "S", weight: 68, torque: 2.9, launch: "Mid", spin: "Low", speedRange: "95-105", tags: ["#강력한임팩트", "#정밀함", "#투어인기"], purchaseUrl: "https://www.google.com/search?q=Fujikura+Ventus+TR+Blue+구매" },
  { brand: "Fujikura", model: "Ventus TR Black", flex: "X", weight: 69, torque: 2.8, launch: "Low", spin: "Low", speedRange: "105+", tags: ["#히터용", "#강한강성", "#프로버전"], purchaseUrl: "https://www.google.com/search?q=Fujikura+Ventus+TR+Black+구매" },
  { brand: "Fujikura", model: "Speeder NX Green", flex: "S", weight: 55, torque: 4.4, launch: "Mid/High", spin: "Mid", speedRange: "85-95", tags: ["#부드러운타감", "#가속력", "#중급자추천"], purchaseUrl: "https://www.google.com/search?q=Fujikura+Speeder+NX+Green+구매" },
  { brand: "Fujikura", model: "Speeder NX Black", flex: "S", weight: 53, torque: 4.8, launch: "High", spin: "Mid", speedRange: "80-90", tags: ["#슬라이스방지", "#고탄도", "#편안한스윙"], purchaseUrl: "https://www.google.com/search?q=Fujikura+Speeder+NX+Black+구매" },
  { brand: "Graphite Design", model: "Tour AD DI", flex: "S", weight: 65, torque: 3.3, launch: "High", spin: "Low", speedRange: "95-105", tags: ["#전설의샤프트", "#안정성", "#고탄도"], purchaseUrl: "https://www.google.com/search?q=Graphite+Design+Tour+AD+DI+구매" },
  { brand: "Graphite Design", model: "Tour AD VF", flex: "S", weight: 66, torque: 3.1, launch: "Low/Mid", spin: "Low", speedRange: "100+", tags: ["#강력한탄도", "#정확도", "#최신모델"], purchaseUrl: "https://www.google.com/search?q=Graphite+Design+Tour+AD+VF+구매" },
  { brand: "Graphite Design", model: "Tour AD UB", flex: "S", weight: 64, torque: 3.2, launch: "Mid", spin: "Low", speedRange: "95-105", tags: ["#일관성", "#중탄도", "#강한팁"], purchaseUrl: "https://www.google.com/search?q=Graphite+Design+Tour+AD+UB+구매" },
  { brand: "Graphite Design", model: "Tour AD CQ", flex: "S", weight: 62, torque: 3.4, launch: "High", spin: "Mid", speedRange: "90-100", tags: ["#선단가속", "#고탄도", "#드로우볼"], purchaseUrl: "https://www.google.com/search?q=Graphite+Design+Tour+AD+CQ+구매" },
  { brand: "Graphite Design", model: "Tour AD XC", flex: "X", weight: 65, torque: 3.2, launch: "Low", spin: "Low", speedRange: "105+", tags: ["#상급자추천", "#저스핀", "#강한임팩트"], purchaseUrl: "https://www.google.com/search?q=Graphite+Design+Tour+AD+XC+구매" },
  { brand: "Graphite Design", model: "Tour AD IZ", flex: "S", weight: 63, torque: 3.2, launch: "High", spin: "Low", speedRange: "90-100", tags: ["#탄성극대화", "#정확도", "#스테디셀러"], purchaseUrl: "https://www.google.com/search?q=Graphite+Design+Tour+AD+IZ+구매" },
  { brand: "Mitsubishi", model: "Tensei 1K White", flex: "S", weight: 62, torque: 3.8, launch: "Low", spin: "Low", speedRange: "100+", tags: ["#화이트의정석", "#저스핀", "#고강성"], purchaseUrl: "https://www.google.com/search?q=Mitsubishi+Tensei+1K+White+구매" },
  { brand: "Mitsubishi", model: "Tensei 1K Orange", flex: "S", weight: 65, torque: 3.5, launch: "Low/Mid", spin: "Low", speedRange: "100+", tags: ["#카운터밸런스", "#일관성", "#상급자용"], purchaseUrl: "https://www.google.com/search?q=Mitsubishi+Tensei+1K+Orange+구매" },
  { brand: "Mitsubishi", model: "Tensei 1K Blue", flex: "S", weight: 64, torque: 3.9, launch: "Mid", spin: "Mid", speedRange: "95-105", tags: ["#올라운더", "#타구감", "#안정성"], purchaseUrl: "https://www.google.com/search?q=Mitsubishi+Tensei+1K+Blue+구매" },
  { brand: "Mitsubishi", model: "Diamana WB (2024)", flex: "S", weight: 61, torque: 3.2, launch: "Low", spin: "Low", speedRange: "100+", tags: ["#2024신상", "#저탄도", "#강력한임팩트"], purchaseUrl: "https://www.google.com/search?q=Mitsubishi+Diamana+WB+2024+구매" },
  { brand: "Mitsubishi", model: "Diamana BB (2024)", flex: "S", weight: 63, torque: 3.4, launch: "Mid", spin: "Mid", speedRange: "95-105", tags: ["#2024신상", "#부드러운가속", "#안정성"], purchaseUrl: "https://www.google.com/search?q=Mitsubishi+Diamana+BB+2024+구매" },
  { brand: "Mitsubishi", model: "Diamana GT", flex: "S", weight: 62, torque: 3.8, launch: "Mid", spin: "Mid", speedRange: "95-105", tags: ["#부드러운느낌", "#중탄도", "#정확성"], purchaseUrl: "https://www.google.com/search?q=Mitsubishi+Diamana+GT+구매" },
  { brand: "Project X", model: "HZRDUS Black Gen 4", flex: "S", weight: 60, torque: 3.5, launch: "Low", spin: "Low", speedRange: "100+", tags: ["#하드히터", "#저스핀", "#강한반발력"], purchaseUrl: "https://www.google.com/search?q=Project+X+HZRDUS+Black+Gen+4+구매" },
  { brand: "Project X", model: "HZRDUS Silver", flex: "S", weight: 65, torque: 3.3, launch: "Mid", spin: "Mid", speedRange: "90-105", tags: ["#중급자용", "#밸런스", "#일관성"], purchaseUrl: "https://www.google.com/search?q=Project+X+HZRDUS+Silver+구매" },
  { brand: "Project X", model: "Denali Blue", flex: "S", weight: 60, torque: 3.7, launch: "Mid", spin: "Mid", speedRange: "95-105", tags: ["#혁신적인소재", "#부드러운피드백", "#중탄도"], purchaseUrl: "https://www.google.com/search?q=Project+X+Denali+Blue+구매" },
  { brand: "Project X", model: "Denali Black", flex: "X", weight: 65, torque: 3.2, launch: "Low", spin: "Low", speedRange: "105+", tags: ["#초고속스윙", "#저스핀", "#안정성"], purchaseUrl: "https://www.google.com/search?q=Project+X+Denali+Black+구매" },
  { brand: "UST Mamiya", model: "LIN-Q M40X White", flex: "S", weight: 67, torque: 3.4, launch: "Low", spin: "Low", speedRange: "100+", tags: ["#고급소재", "#에너지전달", "#저탄도"], purchaseUrl: "https://www.google.com/search?q=UST+Mamiya+LIN-Q+M40X+White+구매" },
  { brand: "UST Mamiya", model: "LIN-Q M40X Blue", flex: "S", weight: 65, torque: 3.6, launch: "Mid", spin: "Mid", speedRange: "95-105", tags: ["#부드러운타감", "#일관성", "#중급자추천"], purchaseUrl: "https://www.google.com/search?q=UST+Mamiya+LIN-Q+M40X+Blue+구매" },
  { brand: "UST Mamiya", model: "LIN-Q M40X Red", flex: "S", weight: 64, torque: 3.8, launch: "High", spin: "Mid", speedRange: "90-100", tags: ["#비거리용", "#고탄도", "#편안한스윙"], purchaseUrl: "https://www.google.com/search?q=UST+Mamiya+LIN-Q+M40X+Red+구매" },
  { brand: "UST Mamiya", model: "The ATTAS V2", flex: "S", weight: 55, torque: 4.2, launch: "Mid", spin: "Mid", speedRange: "85-95", tags: ["#직진성", "#타구감", "#고반발"], purchaseUrl: "https://www.google.com/search?q=UST+Mamiya+The+ATTAS+V2+구매" },
  { brand: "KBS", model: "TD Graphite Driver", flex: "S", weight: 60, torque: 3.8, launch: "Mid", spin: "Mid", speedRange: "90-100", tags: ["#KBS명성", "#일관성", "#안정적인방향성"], purchaseUrl: "https://www.google.com/search?q=KBS+TD+Graphite+Driver+구매" },
  { brand: "KBS", model: "TD Graphite Driver", flex: "R", weight: 50, torque: 4.2, launch: "High", spin: "High", speedRange: "80-90", tags: ["#입문자용", "#비거리증가", "#고탄도"], purchaseUrl: "https://www.google.com/search?q=KBS+TD+Graphite+Driver+구매" },
  { brand: "Aldila", model: "Rogue Silver 130 MSI", flex: "S", weight: 65, torque: 3.2, launch: "Low/Mid", spin: "Low", speedRange: "100+", tags: ["#정밀함", "#저스핀", "#상급자용"], purchaseUrl: "https://www.google.com/search?q=Aldila+Rogue+Silver+130+MSI+구매" },
  { brand: "Aldila", model: "Ascent Blue", flex: "R", weight: 50, torque: 5.2, launch: "High", spin: "Mid", speedRange: "80-90", tags: ["#슬라이스방지", "#가벼움", "#초보추천"], purchaseUrl: "https://www.google.com/search?q=Aldila+Ascent+Blue+구매" },
  { brand: "AutoFlex", model: "SF505", flex: "Unique", weight: 54, torque: 4.8, launch: "Mid", spin: "Mid", speedRange: "95-110", tags: ["#요술지팡이", "#혁신기술", "#편한스윙"], purchaseUrl: "https://www.google.com/search?q=AutoFlex+SF505+구매" },
  { brand: "AutoFlex", model: "SF405", flex: "Unique", weight: 49, torque: 5.2, launch: "High", spin: "Mid", speedRange: "85-95", tags: ["#시니어추천", "#비거리혁명", "#가벼움"], purchaseUrl: "https://www.google.com/search?q=AutoFlex+SF405+구매" },
  { brand: "LA Golf", model: "Bryson Series (Olyss)", flex: "X", weight: 75, torque: 2.5, launch: "Low", spin: "Low", speedRange: "110+", tags: ["#괴력스윙", "#초고강도", "#프로전용"], purchaseUrl: "https://www.google.com/search?q=LA+Golf+Bryson+Series+Olyss+구매" },
  { brand: "LA Golf", model: "DJ Series", flex: "S", weight: 65, torque: 3.2, launch: "Mid", spin: "Low", speedRange: "100+", tags: ["#디샘보샤프트", "#안정성", "#파워"], purchaseUrl: "https://www.google.com/search?q=LA+Golf+DJ+Series+구매" },
  { brand: "Fujikura", model: "Ventus Blue TR", flex: "R", weight: 55, torque: 3.5, launch: "Mid", spin: "Mid", speedRange: "85-95", tags: ["#R스펙", "#안정적인탄도", "#중급자용"], purchaseUrl: "https://www.google.com/search?q=Fujikura+Ventus+Blue+TR+구매" },
  { brand: "Fujikura", model: "Air Speeder", flex: "R", weight: 35, torque: 7.5, launch: "High", spin: "High", speedRange: "~80", tags: ["#초경량", "#시니어용", "#비거리극대화"], purchaseUrl: "https://www.google.com/search?q=Fujikura+Air+Speeder+구매" },
  { brand: "Mitsubishi", model: "Grand Bassara", flex: "R", weight: 39, torque: 5.5, launch: "High", spin: "High", speedRange: "~80", tags: ["#고품격", "#경량샤프트", "#여성추천"], purchaseUrl: "https://www.google.com/search?q=Mitsubishi+Grand+Bassara+구매" },
  { brand: "Mitsubishi", model: "Vanquish", flex: "S", weight: 50, torque: 4.5, launch: "Mid/High", spin: "Mid", speedRange: "85-95", tags: ["#경량강성", "#가속도", "#비거리용"], purchaseUrl: "https://www.google.com/search?q=Mitsubishi+Vanquish+구매" },
  { brand: "Graphite Design", model: "Tour AD HD", flex: "S", weight: 66, torque: 3.1, launch: "Mid", spin: "Low", speedRange: "95-105", tags: ["#하이퍼드라이브", "#안정성", "#정확도"], purchaseUrl: "https://www.google.com/search?q=Graphite+Design+Tour+AD+HD+구매" },
  { brand: "Graphite Design", model: "Tour AD TP", flex: "S", weight: 65, torque: 3.2, launch: "Mid/High", spin: "Mid", speedRange: "90-100", tags: ["#일관된탄도", "#부드러운팁", "#스테디셀러"], purchaseUrl: "https://www.google.com/search?q=Graphite+Design+Tour+AD+TP+구매" },
  { brand: "Project X", model: "EvenFlow Riptide", flex: "S", weight: 60, torque: 3.7, launch: "Mid", spin: "Mid", speedRange: "90-100", tags: ["#에너지전달", "#부드러움", "#중급자용"], purchaseUrl: "https://www.google.com/search?q=Project+X+EvenFlow+Riptide+구매" },
  { brand: "Project X", model: "EvenFlow White", flex: "X", weight: 65, torque: 3.2, launch: "Low", spin: "Low", speedRange: "105+", tags: ["#히터용", "#저탄도", "#강력한임팩트"], purchaseUrl: "https://www.google.com/search?q=Project+X+EvenFlow+White+구매" },
  { brand: "True Temper", model: "Dynamic Gold Spinner", flex: "Wedge", weight: 120, torque: 1.8, launch: "Low", spin: "High", speedRange: "N/A", tags: ["#웨지전용", "#스핀극대화", "#정교함"], purchaseUrl: "https://www.google.com/search?q=True+Temper+Dynamic+Gold+Spinner+구매" },
  { brand: "Aerotech", model: "SteelFiber i95", flex: "S", weight: 95, torque: 2.4, launch: "Mid", spin: "Mid", speedRange: "90-105", tags: ["#아이언혁명", "#정확도", "#안정성"], purchaseUrl: "https://www.google.com/search?q=Aerotech+SteelFiber+i95+구매" },
  { brand: "Fujikura", model: "Ventus Blue 7", flex: "X", weight: 75, torque: 2.8, launch: "Mid", spin: "Low", speedRange: "110+", tags: ["#70g대", "#프로급", "#강력한지지"], purchaseUrl: "https://www.google.com/search?q=Fujikura+Ventus+Blue+7+구매" },
  { brand: "Mitsubishi", model: "Tensei CK Pro Orange", flex: "S", weight: 68, torque: 3.4, launch: "Low/Mid", spin: "Low", speedRange: "100+", tags: ["#전통의강자", "#카운터밸런스", "#일관성"], purchaseUrl: "https://www.google.com/search?q=Mitsubishi+Tensei+CK+Pro+Orange+구매" },
  { brand: "Graphite Design", model: "Tour AD XC", flex: "S", weight: 64, torque: 3.2, launch: "Low", spin: "Low", speedRange: "95-105", tags: ["#정교한컨트롤", "#저탄도", "#최첨단"], purchaseUrl: "https://www.google.com/search?q=Graphite+Design+Tour+AD+XC+구매" },
  { brand: "UST Mamiya", model: "Helium Nanocore", flex: "R", weight: 45, torque: 5.5, launch: "High", spin: "High", speedRange: "~85", tags: ["#초경량", "#탄력", "#입문자용"], purchaseUrl: "https://www.google.com/search?q=UST+Mamiya+Helium+Nanocore+구매" },
  { brand: "Veylix", model: "Alpina", flex: "S", weight: 67, torque: 3.2, launch: "Mid", spin: "Mid", speedRange: "95-105", tags: ["#프리미엄소재", "#독특한디자인", "#타구감"], purchaseUrl: "https://www.google.com/search?q=Veylix+Alpina+구매" },
];
