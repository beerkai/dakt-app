import type {
  CaseData,
  Document,
  Evidence,
  Suspect,
  Testimony,
  TimelineEvent,
} from "@/lib/case-types";

import payload from "./114-payload.json";
import { messageThreads114 } from "./114-message-threads";

/** Zaman çizelgesi — başlangıçta hafif karıştırılmış sıra (22 kart) */
const TL114_SHUFFLE_IDX = [
  3, 11, 0, 19, 8, 14, 1, 21, 5, 16, 9, 2, 12, 7, 4, 15, 10, 6, 13, 18, 20, 17,
] as const;

function parseEvidenceDetails(html: string): Array<{ label: string; value: string }> {
  const raw = html.split(/<br\s*\/?>/i);
  const out: Array<{ label: string; value: string }> = [];
  for (const line of raw) {
    const m = line.match(/<span>(▸[^<]+)<\/span>\s*(.*)/);
    if (m) {
      out.push({
        label: m[1].replace(/^▸\s*/, "").replace(/:\s*$/, ""),
        value: m[2].trim(),
      });
    }
  }
  return out;
}

const suspects: Suspect[] = [
  {
    id: "suspect-01",
    code: "SUSP-01 · LVT-VGA/VK",
    name: "Vedat Kaplan",
    role: "Büro kurucu ortağı · 52",
    quote:
      '"Yasemin en iyi avukatımdı. Kartal davası bitince onu ortak yapacaktım."',
  },
  {
    id: "suspect-02",
    code: "SUSP-02 · LVT-VGA/DA",
    name: "Dilan Arslan",
    role: "Stajyer avukat · 26 · Yasemin'in ekibinde",
    quote: '"Gece dosya hazırlığı yapıyordum. Yasemin Hanım benden kalmasını istedi."',
  },
  {
    id: "suspect-03",
    code: "SUSP-03 · LVT-GÜV/NÇ",
    name: "Nuri Çakır",
    role: "Gece güvenlik görevlisi · 41",
    quote: '"Tur yaparken buldum. Kapı açıktı. İçeri baktım ve..."',
  },
  {
    id: "suspect-04",
    code: "SUSP-04 · LVT-TMZ/SY",
    name: "Songül Yıldız",
    role: "Temizlik personeli · 48 · 7 yıldır binada",
    quote: '"28. kata her gece girerim. O gece de girdim. Kimseyi görmedim."',
  },
  {
    id: "suspect-05",
    code: "SUSP-05 · LVT-IT/CB",
    name: "Cem Balcı",
    role: "IT destek · Dış kaynak · 29 · Gece bakım için orada",
    quote:
      '"Server bakımı için geldim. 26. kattaki sunucu odasındaydım. 28. kata çıkmadım."',
  },
];

type PayloadT = (typeof payload)["testimonies"][number];

const testimonies: Testimony[] = payload.testimonies.map((t: PayloadT) => ({
  id: t.id,
  suspectName: t.suspectName,
  date: t.date,
  birth: t.birth,
  occupation: t.occupation,
  address: t.address,
  paragraphs: t.paragraphs,
  signature: t.signature,
  signatureRole: t.signatureRole,
  headerDocId: t.headerDocId,
  title: t.title,
  ...(typeof t.session === "number" && (t.session === 1 || t.session === 2)
    ? { session: t.session as 1 | 2 }
    : {}),
  ...(t.metaRows ? { metaRows: t.metaRows } : {}),
}));

const forensics: Document[] = payload.forensics.map((d) => ({
  id: d.id,
  docId: d.docId,
  title: d.title,
  meta: d.meta,
  body: d.body,
  signature: d.signature,
}));

const documents: Document[] = payload.documents.map((d) => ({
  id: d.id,
  docId: d.docId,
  title: d.title,
  meta: d.meta,
  body: d.body,
  signature: d.signature,
}));

const technical: Document[] = payload.technical.map((d) => ({
  id: d.id,
  docId: d.docId,
  title: d.title,
  meta: d.meta,
  body: d.body,
  signature: d.signature,
}));

const evidence: Evidence[] = [
  {
    id: "VGA-BÇK01",
    tag: "Kesici",
    title: "Gümüş Saplı Kâğıt Bıçağı",
    description:
      "Vedat Kaplan'ın masasından alınmış. Lavaboda, su altında bulundu. Parmak izi yok.",
    details: parseEvidenceDetails(`<span>▸ Sahibi:</span> Vedat Kaplan (ifadesinde doğruladı)<br>
        <span>▸ Gizli kan:</span> Sap oymalarında mikroskobik kan kalıntısı<br>
        <span>▸ DNA:</span> Analiz sonucu: <strong>Vedat Kaplan</strong> (%99.1) ✓<br>
        <span>▸ Yorum:</span> Vedat'ın günlük kullandığı bir nesne — parmak izi normal, ama oymalardaki KAN kilit`),
  },
  {
    id: "KOR-KAN01",
    tag: "Kan",
    title: "Koridor Kan Damlaları",
    description:
      "Tuvaletten asansör holüne doğru 3 damla. Düşme açısı: koşmak değil, <strong>yavaş yürümek</strong>.",
    details: parseEvidenceDetails(`<span>▸ DNA:</span> 2 damla mağdura ait, 1 damla <strong>karışık profil</strong> (mağdur + bilinmeyen)<br>
        <span>▸ Karışık damla:</span> Failin eli kanamış ve mağdur kanıyla karışmış<br>
        <span>▸ Bilinmeyen DNA:</span> Vedat Kaplan ile <strong>eşleşme talebi yapıldı</strong>`),
  },
  {
    id: "YMR-PIZ01",
    tag: "Parmak İzi",
    title: "Yangın Merdiveni Parmak İzi",
    description:
      "28. kat yangın merdiveni kapısı itme barında. Kanlı, kısmi. Sağ el 3 parmak.",
    details: parseEvidenceDetails(`<span>▸ Eşleşme:</span> <strong>Vedat Kaplan</strong> — %87 kısmi eşleşme (3/5 minutiae)<br>
        <span>▸ Not:</span> Kısmi olduğu için %100 kesinlik yok, ama mevcut noktalar uyuşuyor<br>
        <span>▸ Alternatif:</span> Diğer şüphelilerin hiçbiriyle eşleşme yok`),
  },
  {
    id: "YSM-LAP01",
    tag: "Dijital",
    title: "Yasemin'in Dizüstü Bilgisayarı",
    description:
      "Masasında açık halde bulundu. Son değiştirilen dosya: <strong>\"VEDAT_NOTLAR.docx\"</strong> — 18 Ekim 22:40.",
    details: parseEvidenceDetails(`<span>▸ İçerik:</span> Kartal davası manipülasyonu iddiaları (bkz. 114-K)<br>
        <span>▸ Son aktivite:</span> 22:40 — dosya kaydedilmiş<br>
        <span>▸ Tarayıcı:</span> 23:15'te "baro şikâyet nasıl yapılır" araması`),
  },
  {
    id: "CEM-KRT01",
    tag: "Kart",
    title: "Cem'in Erişim Kartı",
    description:
      "01:22'de 28. katta kullanılmış. Cem \"26'daydım, kapıda asılıydı\" diyor.",
    details: parseEvidenceDetails(`<span>▸ Log:</span> 21:31 → 26. kat (giriş), 01:22 → 28. kat, 03:15 → zemin (çıkış)<br>
        <span>▸ Soru:</span> 01:22'de kartı kim kullandı?<br>
        <span>▸ 26. kat kamerası:</span> 00:55'te sunucu odası koridorunda bir figür — tanımlanamadı`),
  },
  {
    id: "VDT-TEL01",
    tag: "Telefon",
    title: "Vedat'ın Telefon Arama Kaydı",
    description:
      "23:02'de 4 dakikalık arama — karşı taraf: <strong>anonim prepaid hat</strong>. Songül: \"Bağıra bağıra konuşuyordu.\"",
    details: parseEvidenceDetails(`<span>▸ Prepaid hat:</span> Sahibi tespit edilemedi — Kartal İnşaat bağlantısı araştırılıyor<br>
        <span>▸ İçerik:</span> "Bunu yaparsanız hepimiz yanarız" (Songül tanıklığı)<br>
        <span>▸ Sonraki arama:</span> 01:05 — aynı hat, 2 dakika (gelen arama)`),
  },
];

const timeline: TimelineEvent[] = payload.timeline.map((e) => ({
  id: e.id,
  time: e.time,
  event: e.event,
  source: e.source,
  critical: e.critical,
}));

const timelineInitialOrder = TL114_SHUFFLE_IDX.map((i) => payload.timeline[i]!.id);

export const case114: CaseData = {
  id: "114",
  codename: "Cam Kule",
  fullTitle: "Vaka № 114 — Cam Kule Dosyası",
  status: "active",
  difficulty: "Zor",
  recommendedPlayers: "3-4",
  location: "İstanbul · Levent",
  victim: "Yasemin Tümer (33, kadın)",
  date: "19 Ekim 2024 · 02:47",
  shortSummary:
    "Levent'te 34 katlı Meridyen Tower'ın 28. katında bir avukat tuvalette ölü bulunur. Boğazı kesik. Beş şüpheli, on yedi belge, bir gece nöbeti, bir yalan ağı.",
  enabledTabs: [
    "brief",
    "supheliler",
    "ifadeler",
    "adli-tip",
    "deliller",
    "belgeler",
    "teknik",
    "zaman-cizelgesi",
    "deduction",
    "cozum",
  ],
  brief: {
    subtitle: "114-A · Olay Yeri",
    metaPairs: payload.briefMetaPairs,
    sections: payload.briefSections,
    signature: payload.briefSignature,
  },
  suspects,
  testimonies,
  forensics,
  evidence,
  documents,
  messageThreads: messageThreads114,
  technical,
  timeline,
  timelineInitialOrder,
  deduction: { contradictions: [], elimination: [] },
  tabSectionSub: {
    brief: "114-A · Olay Yeri",
    supheliler: "Gizli · 05 Profil",
    ifadeler: "114-C → 114-H",
    "adli-tip": "114-A · 114-B",
    deliller: "6 Adet Delil Fişi",
    belgeler: "114-K → 114-N",
    teknik: "114-O · 114-P · 114-Q",
    "zaman-cizelgesi": "18 — 19 Ekim 2024",
    deduction: "Notlar · Sadece sana özel",
    cozum: "114-Z2 · Sınırlı Erişim",
  },
  verdict: {
    perpetratorId: "suspect-01",
    perpetratorName: "Vedat Kaplan",
    murderTime: "19 Ekim 2024, 01:50 — 02:05 arası.",
    murderLocation:
      "İstanbul · Levent · Meridyen Tower · Kat 28 · Vega Hukuk Bürosu · Kadın Tuvaleti",
    murderWeapon: "Gümüş saplı kâğıt kesme bıçağı (letter opener)",
    motivation:
      "Yasemin'in, Vedat'ın Kartal İnşaat tarafından rüşvet aldığını 21 Ekim Pazartesi İstanbul Barosu'na bildirme planını kesmek; meslekî yıkım ve cezai soruşturmayı önlemek. Kartal İnşaat baskısı ve \"susturma\" iklimi tetikleyici unsur.",
    evidenceList: [
      "114-P (DNA): Bıçak sapı kan — Vedat (%99.1)",
      "114-P: Koridor karışık kan — Yasemin + Vedat",
      "114-P: Yangın merdiveni kanlı parmak izi — Vedat (%87)",
      "114-P: Bluz yakası lifi — Vedat'ın kazağı (%91)",
      "114-K: Yasemin'in not dosyası — rüşvet kanıtı + baro şikâyet planı",
      "114-L: Vedat ↔ Selim e-posta — gizli gece toplantısı",
      "114-M: Banka — aylık 75.000 TL offshore EFT",
      "114-Q: Selim: \"Vedat eldiven giyiyordu\"",
      "114-N + 114-O: Cem'in kartı ile hayalet asansör = Selim'in girişi, Vedat'ın kamera bilgisi",
    ],
    conclusion:
      "Vedat Kaplan, Yasemin Tümer'i 19 Ekim 2024 sabaha karşı 28. kattaki kadın tuvaletinde kendi kâğıt bıçağıyla boğazını keserek öldürdü. Motif: Yasemin'in, Vedat'ın Kartal İnşaat'tan rüşvet aldığını İstanbul Barosu'na bildirme planını engellemek. Fail, bina güvenlik sistemini tanıyordu ve delil temizlemeye çalıştı — ancak gümüş bıçağın oymalarındaki mikroskobik kanı temizleyemedi.",
    wrongAnswerMessage:
      "Tahminin yanlıştı. Bu vakada [SECILEN_ISIM] failin kendisi değildi — sadece çevresinden biri ya da yalan söyleyenlerden biri. Gerçek fail kayıtlardan silindi. Yasemin Tümer davasının izi kapandı.",
    solutionDocLabel: "114-Z2 · Resmi Çözüm Belgesi · 25.10.2024",
    solutionHtml: payload.solutionHtml,
  },
};
