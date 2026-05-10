import type {
  CaseData,
  Document,
  Evidence,
  Suspect,
  Testimony,
  TimelineEvent,
} from "@/lib/case-types";
import gen from "./104-generated.json";
import extra from "./104-extra.json";
import briefVerdict from "./104-brief-verdict.json";
import { messageThreads104 } from "./104-message-threads";

const TL104_SHUFFLE_IDX = [
  4, 1, 8, 0, 5, 2, 9, 3, 7, 6
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
  "104-D": "İfade Sahibi · Emniyette",
  "104-E": "İfade Sahibi · Emniyette",
  "104-F": "İfade Sahibi · Emniyette",
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
}));

const forensics: Document[] = gen.forensics.map((d) => ({
  id: d.id,
  docId: d.docId,
  title: d.title,
  meta: d.meta,
  body: d.body,
  signature: d.signature,
}));

const documents: Document[] = gen.documents.map((d) => ({
  id: d.id,
  docId: d.docId,
  title: d.title,
  meta: d.meta,
  body: d.body,
  signature: d.signature,
}));

const technical: Document[] = gen.technical.map((d) => ({
  id: d.id,
  docId: d.docId,
  title: d.title,
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

const timelineInitialOrder = TL104_SHUFFLE_IDX.map(
  (i) => extra.timeline[i]!.id,
);

export const case104: CaseData = {
  id: "104",
  codename: "Kusurlu Hasat",
  fullTitle: "Vaka № 104 — Kusurlu Hasat Dosyası",
  status: "active",
  difficulty: "Zor",
  recommendedPlayers: "4-5",
  location: "İzmir · Urla",
  victim: "Vedat Somer (55, erkek)",
  date: "20 Eylül 2024 · 19:00 — 19:15 arası",
  shortSummary:
    "Urla, 20 Eylül 2024, 19:45. Şarap mahzeninde ölü bulunan bir vizyoner. Kırık bir kadeh, zehirli bir fıçı, silinmiş akıllı havalandırma logları. Bu davada kapıyı kırarak girenler değil, içeriden havalandıranlar tehlikelidir.",
  enabledTabs: [
    "brief",
    "supheliler",
    "ifadeler",
    "adli-tip",
    "deliller",
    "belgeler",
    "teknik",
    "deduction",
    "cozum",
  ],
  brief: {
    subtitle: "104-A · Olay Yeri",
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
  messageThreads: messageThreads104,
  technical,
  technicalAudio: undefined,
  timeline,
  timelineInitialOrder,
  deduction: {
    contradictions: extra.deduction.c,
    elimination: extra.deduction.e,
  },
  tabSectionSub: {
    brief: "104-A · Olay Yeri",
    supheliler: "Gizli · 07 Profil",
    ifadeler: "104-D → 104-F",
    "adli-tip": "104-A · 104-B · 104-C",
    deliller: "5 Adet Delil Fişi",
    belgeler: "104-L · 104-N",
    teknik: "104-K · 104-M · 104-O",
    deduction: "Notlar · Sadece sana özel",
    cozum: "104-Z2 · Sınırlı Erişim",
  },
  verdict: {
    perpetratorId: "suspect-01",
    perpetratorName: "Aylin Somer",
    murderTime:
      "Zehirleme 20 Eylül 2024, 17:30 dolaylarında mahzende; mağdur şarabı 19:00 - 19:15 arasında içti.",
    murderLocation: "Somer Bağları Yeraltı Mahzeni.",
    murderWeapon: "Aconitine (Kurtboğan), yüksek tanenli şarap fıçısında.",
    motivation:
      "Vedat'ın Pazartesi sabahı şirketin tüm varlığını İsviçre'ye aktarıp şirketi iflasa ve Aylin'i evsizliğe terk edecek olması.",
    evidenceList: [
      "104-K: Mahzen havalandırmasının 17:32'de manuel çalıştırılması.",
      "104-L: Aconitum'un peyzaj süsü olarak aylar önce Aylin tarafından alınması.",
      "104-M: Biyometrik kapının sadece kurban ve fail tarafından açılabilmesi.",
      "104-N: Gizli UBS banka transfer emrinin ifşası.",
      "104-O: Aylin'in şoförü kullanarak yarattığı sahte şehir merkezi alibisi."
    ],
    conclusion:
      "Aylin Somer, Vedat Somer'i Aconitine ile zehirledi. Kapalı mahzen sistemini kullanarak zamanı manipüle etti.",
    wrongAnswerMessage:
      "Tahminin yanlıştı. Hedefe doğru yönden bakmadın. Olay yerindeki 'gürültüye' aldanıp sessiz ve planlı ilerleyen tehdidi kaçırdın.",
    solutionDocLabel: "104-Z2 · Resmi Çözüm Belgesi · 25.09.2024",
    solutionHtml: briefVerdict.verdict_inner,
  },
};
