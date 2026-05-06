import type {
  CaseData,
  Document,
  Evidence,
  Suspect,
  Testimony,
  TimelineEvent,
} from "@/lib/case-types";
import gen from "./067-generated.json";
import extra from "./067-extra.json";
import briefVerdict from "./067-brief-verdict.json";

const TL067_SHUFFLE_IDX = [
  17, 3, 11, 0, 8, 14, 5, 16, 2, 9, 12, 7, 4, 15, 1, 10, 6, 13,
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

const suspects: Suspect[] = extra.suspects_raw.map((s, i) => ({
  id: `suspect-${String(i + 1).padStart(2, "0")}`,
  code: s.code,
  name: s.name,
  role: s.role,
  quote: s.quote,
}));

const TESTIMONY_SIG_LINE: Record<string, string> = {
  "067-F": "İfade Sahibi · Avukat huzurunda",
  "067-G": "İfade Sahibi · Telefonla",
  "067-H": "İfade Sahibi · Avukat huzurunda",
};

const testimonies: Testimony[] = gen.testimonies.map((t) => ({
  id: t.id,
  suspectName: t.suspectName,
  date: t.date,
  birth: t.birth,
  occupation: t.occupation,
  address: t.address,
  paragraphs: t.paragraphs,
  signature: t.signature,
  signatureRole: TESTIMONY_SIG_LINE[t.id],
  headerDocId: t.headerDocId,
  title: t.title,
  stamps: t.stamps as Testimony["stamps"],
}));

const forensics: Document[] = gen.forensics.map((d) => ({
  id: d.id,
  docId: d.docId,
  title: d.title,
  stamps: d.stamps as Document["stamps"],
  meta: d.meta,
  body: d.body,
  signature: d.signature,
}));

const documents: Document[] = gen.documents.map((d) => ({
  id: d.id,
  docId: d.docId,
  title: d.title,
  stamps: d.stamps as Document["stamps"],
  meta: d.meta,
  body: d.body,
  signature: d.signature,
}));

const technical: Document[] = gen.technical.map((d) => ({
  id: d.id,
  docId: d.docId,
  title: d.title,
  stamps: d.stamps as Document["stamps"],
  meta: d.meta,
  body: d.body,
  signature: d.signature,
}));

const evidence: Evidence[] = extra.evidence.map((e) => ({
  id: e.code,
  tag: e.tag,
  title: e.title,
  description: e.desc,
  details: parseEvidenceDetails(e.detail_html),
}));

const timeline: TimelineEvent[] = extra.timeline.map((e) => ({
  id: e.id,
  time: e.time,
  event: e.event,
  source: e.source,
  critical: e.critical,
}));

const timelineInitialOrder = TL067_SHUFFLE_IDX.map(
  (i) => extra.timeline[i]!.id,
);

export const case067: CaseData = {
  id: "067",
  codename: "Koleksiyoncu",
  fullTitle: "Vaka № 067 — Koleksiyoncu Dosyası",
  status: "active",
  difficulty: "Zor",
  recommendedPlayers: "4-5",
  location: "İstanbul · Bebek",
  victim: "Kerem Avcıoğlu (58, erkek)",
  date: "14 Mart 2024 · 11:30 — 12:15 arası",
  shortSummary:
    "Beyoğlu, 14 Mart 2024, 12:15. Kendi müzayede evinin mutfağında baygın bulunan bir koleksiyoncu. Bir fincan çay, eksik bir kimyasal, yedi şüpheli, on sekiz belge. Bu davada en bariz şüpheli, gerçek faili saklamak için seçilmiş olabilir.",
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
    subtitle: "067-A · Olay Yeri",
    stamps: ["approved", "denied", "classified"],
    metaPairs: briefVerdict.brief_meta.map((m) => ({
      label: m.label,
      value: m.value,
    })),
    sections: briefVerdict.brief_sections.map((s) => ({
      title: s.title,
      body: s.body,
    })),
    signature: briefVerdict.brief_signature,
  },
  suspects,
  testimonies,
  forensics,
  evidence,
  documents,
  technical,
  technicalAudio: {
    label: "067-T · Sesli Mesaj — Selin → Kerem · 13 Mart 23:51",
    durationLine: "00:42 · BÜROYA AİT BUZLU CAM TELEFON HATTI",
    transcript: [
      "Kerem, beni dinle.",
      "Cengiz Bey'le konuştuğunu biliyorum. Pazartesi imza atacağını biliyorum. Ben aptal mıyım?",
      "Eğer beni o belgeden çıkarırsan, ben de senin Bakanlık dosyasında tek bir cümle söylediğimde Ferhat'ın değil senin yıkımın olur. Beni hisse sahibi yapmazsan, seni kimse yapamaz.",
      '<span class="highlight">"Yarın sabah çayını sakin iç. Konuşacaklarımız var."</span>',
      "İyi geceler.",
    ],
  },
  timeline,
  timelineInitialOrder,
  deduction: {
    contradictions: extra.deduction.c,
    elimination: extra.deduction.e,
  },
  tabSectionSub: {
    brief: "067-A · Olay Yeri",
    supheliler: "Gizli · 07 Profil",
    ifadeler: "067-C → 067-I",
    "adli-tip": "067-A · 067-B · 067-J",
    deliller: "5 Adet Delil Fişi",
    belgeler: "067-K → 067-Q",
    teknik: "067-R · 067-S · 067-T · 067-U · 067-V",
    "zaman-cizelgesi": "13 — 14 Mart 2024",
    deduction: "Çelişkiler · Eleme · Bağlantılar",
    cozum: "067-Z2 · Sınırlı Erişim",
  },
  verdict: {
    perpetratorId: "suspect-02",
    perpetratorName: "Selin Çelik",
    murderTime:
      "Zehirleme 14 Mart 2024, 10:48 — 10:52 arasında mutfakta; mağdur çayı 11:00 — 11:05 arasında içti.",
    murderLocation: "Avcıoğlu Müzayede Evi personel mutfağı.",
    murderWeapon: "Potasyum siyanür (KCN), sıcak çay fincanında.",
    motivation:
      "Vasiyetname ve ilişki dinamikleri; Pazartesi imzası öncesi kontrol kaybı ve susturulma korkusu (çözüm belgesinde katmanlı anlatım).",
    evidenceList: [
      "067-D: Diş randevusu kaydı yok (yalan alibi).",
      "067-J: Adli biyokimya zaman penceresi → 11:00'dan önce zehir konuldu.",
      "067-M: Postalanmamış mektup → vasiyet bilgisi ifşa.",
      '067-N: Çöp kovasındaki yırtık not "S." imzası → Kerem\'e tehdit.',
      "067-O: Banka — Kerem'den anonim aylık 45.000 TL ödeme + 13/14 Mart kaçış parası.",
      "067-P: Stok defterindeki 12 Mart imzası — KCN şifresine erişim itirafı.",
      "067-R: Kanal 1 ve Kanal 3 — atkılı kadın silüeti.",
      "067-S: Telefon sinyali → 11:05'te büroya 80m mesafede.",
      '067-T: "Yarın sabah çayını sakin iç" sesli mesajı — yöntem önceden imzalandı.',
      '067-U: Randevu defteri "Selin — özel" çizik — silme girişimi.',
      '067-V: Kapıcı tanıklığı — yürüyüş, "Yapma Kerem, lütfen" cümlesi.',
    ],
    conclusion:
      "Selin Çelik, Kerem Avcıoğlu'nu öldürdü. Yöntem: oral KCN. Yer: büro mutfağı. Zaman: 11:00 — 11:05.",
    wrongAnswerMessage:
      "Tahminin yanlıştı. Bu vakada [SECILEN_ISIM] failin kendisi değildi — sadece çevresinden biri. Gerçek fail kayıtlardan silindi. Davanın izi kapandı.",
    solutionDocLabel: "067-Z2 · Resmi Çözüm Belgesi · 19.03.2024",
    solutionHtml: briefVerdict.verdict_inner,
  },
};
