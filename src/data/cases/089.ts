import type {
  CaseData,
  Document,
  Evidence,
  Suspect,
  Testimony,
  TimelineEvent,
} from "@/lib/case-types";
import payload from "./089-payload.json";
import { messageThreads089 } from "./089-message-threads";

/** Zaman çizelgesi kartları — başlangıçta kronolojiden hafifçe karıştırılmış sıra */
const TL089_SHUFFLE_IDX = [
  3, 11, 0, 19, 8, 14, 1, 22, 5, 16, 9, 2, 12, 7, 4, 15, 10, 6, 13, 18, 20,
  21, 17, 24, 23, 25,
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
    code: "GRM-KCO/IP",
    name: "İpek Sarıhan",
    role: "Yakın arkadaş · Tatil grubu üyesi · 26",
    quote:
      '"Defne gece dışarı çıktığında uyuyordum. Sabah yatağının boş olduğunu gördüm."',
  },
  {
    id: "suspect-02",
    code: "GRM-KCO/CA",
    name: "Ceren Aksoy",
    role: "Yakın arkadaş · Tatil grubu üyesi · 25",
    quote:
      '"İpek\'le ayrı odadaydım. Defne\'yle akşam tartıştık, sonra barıştık. Normal bir gece."',
  },
  {
    id: "suspect-03",
    code: "GRM-RST/TK",
    name: "Tolga Kıvanç",
    role: "Otel barmen · Yerel · 32",
    quote:
      '"Son içkisini ben hazırladım. Flört ettik mi? Belki. Ama takip etmedim."',
  },
  {
    id: "suspect-04",
    code: "GRM-TUR/AE",
    name: "Alp Erdoğan",
    role: "ATV tur rehberi · Eski sevgili (Defne) · 28",
    quote:
      '"Evet, Defne\'nin burada olduğunu biliyordum. Tesadüf değil. Konuşmak istiyordum."',
  },
  {
    id: "suspect-05",
    code: "GRM-VIP/HO",
    name: "Hakan Orbay",
    role: "İstanbul işadamı · Oteldeki misafir · 45",
    quote: '"Otel restoranında tanıştık. İçki ısmarladım. Bu kadar."',
  },
  {
    id: "suspect-06",
    code: "GRM-KCO/EM",
    name: "Elif Mertoğlu",
    role: "Otel müdiresi · Kelebek Cave Otel · 39",
    quote:
      '"Otelimde cinayet olması beni yıktı. Güvenlik kameralarını hemen teslim ettim."',
  },
];

type PayloadTestimony = (typeof payload.testimonies)[number];

const testimonies: Testimony[] = payload.testimonies.map((t: PayloadTestimony) => {
  const sessionFromJson = t.session;
  const session: 1 | 2 | undefined =
    sessionFromJson === 1 || sessionFromJson === 2
      ? sessionFromJson
      : t.id === "089-D"
        ? 1
        : undefined;
  return {
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
    session,
    metaRows: t.metaRows,
  };
});

const forensics: Document[] = payload.forensics.map((d) => ({
  id: d.id,
  docId: d.docId,
  title: d.title,
  meta: d.meta,
  body: d.body,
  signature: d.signature,
}));

const CHAT_DOC_IDS = new Set(["089-K", "089-L", "089-P"]);

const documents: Document[] = payload.documents
  .filter((d) => !CHAT_DOC_IDS.has(d.id))
  .map((d) => ({
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
    id: "DFN-TRN01",
    tag: "DNA",
    title: "Tırnak Altı DNA",
    description:
      "Mağdurun sağ el tırnak altı sıyrıntısı. Failin derisinden olası transfer.",
    details: parseEvidenceDetails(`<span>▸ Sonuç:</span> <strong>Alp Erdoğan</strong> ile %99.7 eşleşme ✓<br>
        <span>▸ Yorum:</span> Mağdur saldırganı tırnaklarken DNA bırakmış<br>
        <span>▸ Alp ifadesi:</span> "ATV turunda ellerim çizildi, belki orada bulaştı" — 6 Haziran sabahı, yani 24 saat önce`),
  },
  {
    id: "PRB-LIF01",
    tag: "Lif",
    title: "Koyu Mavi Pamuk Lifi",
    description:
      "Peri bacası yamacındaki kaya çıkıntısında. <strong>Alp'in sweatshirt'ünün lifleriye eşleşmesi bekleniyor.</strong>",
    details: parseEvidenceDetails(`<span>▸ Renk:</span> Koyu lacivert, %100 pamuk<br>
        <span>▸ Alp'in kıyafeti:</span> 7 Haziran sabahı arama — lacivert Nike sweatshirt, sol dirseğinde yırtık<br>
        <span>▸ Eşleşme:</span> Lif analizi devam ediyor`),
  },
  {
    id: "PRB-SIG01",
    tag: "İzmarit",
    title: "Sigara İzmariti — Marlboro Red",
    description:
      "Peri bacasından 150m uzakta patika kenarında. DNA tükürük analizi bekliyor.",
    details: parseEvidenceDetails(`<span>▸ Marka:</span> Marlboro Red<br>
        <span>▸ Not:</span> Alp'in marka tercihi: Parliament (Tolga ifadesinde doğrulandı)<br>
        <span>▸ Tolga:</span> Marlboro Red içiyor (bar muhasebe çeki)<br>
        <span>▸ Soru:</span> Tolga da orada mıydı?`),
  },
  {
    id: "PRB-AYK01",
    tag: "Ayakkabı",
    title: "42 Numara Ayakkabı İzi",
    description:
      "Peri bacası çevresinde. Düz tabanlı spor ayakkabı desen. Mağdur: 38 numara.",
    details: parseEvidenceDetails(`<span>▸ Alp Erdoğan:</span> 43 numara (yarım numara fark)<br>
        <span>▸ Tolga Kıvanç:</span> <strong>42 numara</strong> ✓<br>
        <span>▸ Hakan Orbay:</span> 44 numara<br>
        <span>▸ Kritik:</span> Alp'in iz bırakmaması garip — ya başka ayakkabı giymişti ya da orada değildi`),
  },
  {
    id: "DFN-TEL01",
    tag: "Dijital",
    title: "Defne'nin Telefonu",
    description:
      "Otel odasında, şarj kablolarında bulundu. Dışarı çıkarken telefonsuz gitmiş veya <strong>birisi odaya geri koymuş</strong>.",
    details: parseEvidenceDetails(`<span>▸ Son aktivite:</span> 23:47 — Instagram story<br>
        <span>▸ Çelişki:</span> 01:15'te dışarı çıktığında neden telefon yok?<br>
        <span>▸ Olasılık:</span> Biri onu çağırdı — telefonu almadan çıktı (tanıdık biri)`),
  },
  {
    id: "ALP-SWR01",
    tag: "Kıyafet",
    title: "Alp'in Lacivert Sweatshirt'ü",
    description:
      "Ürgüp evinde aramada ele geçirildi. Sol dirseğinde <strong>yırtık</strong>. Yıkama izi <strong>taze</strong>.",
    details: parseEvidenceDetails(`<span>▸ Yıkama:</span> 7 Haziran sabahı 06:30'da makinede — şüpheli zamanlama<br>
        <span>▸ Lif:</span> Peri bacası lifiyle eşleşme bekleniyor<br>
        <span>▸ Kan:</span> Yıkama öncesi iz tespit edilemedi`),
  },
  {
    id: "HKN-KRT01",
    tag: "Kartvizit",
    title: "Hakan'ın Kartviziti",
    description:
      "Defne'nin otel odasındaki çantasında bulundu. Arkasında el yazısı: <strong>\"01:00, teras\"</strong>.",
    details: parseEvidenceDetails(`<span>▸ El yazısı:</span> Defne'nin yazısı (onaylı)<br>
        <span>▸ Anlam:</span> Defne, Hakan'la 01:00'da buluşma planlamış mı?<br>
        <span>▸ Hakan ifadesi:</span> "23:00'da odama çıktım" — teras buluşması bahsetmemiş`),
  },
];

const timeline: TimelineEvent[] = payload.timeline.map((e) => ({
  id: e.id,
  time: e.time,
  event: e.event,
  source: e.source,
  critical: e.critical,
}));

const timelineInitialOrder = TL089_SHUFFLE_IDX.map(
  (i) => payload.timeline[i]!.id,
);

export const case089: CaseData = {
  id: "089",
  codename: "Peri Bacası",
  fullTitle: "Vaka № 089 — Peri Bacası Dosyası",
  status: "active",
  difficulty: "Zor",
  recommendedPlayers: "4-5",
  location: "Nevşehir · Göreme",
  victim: "Defne Karataş (25, kadın)",
  date: "7 Haziran 2024 · 06:10",
  shortSummary:
    "Göreme'de bir peri bacasının tepesinde, çırılçıplak bir kadın cesedi. 25 yaşında, boğularak öldürülmüş. Altı şüpheli, yirmi iki belge — herkes bir şey saklıyor.",
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
    subtitle: "089-A · Olay Yeri",
    metaPairs: payload.briefMetaPairs,
    sections: payload.briefSections,
    signature: {
      role: "Düzenleyen\nKriminal Soruşturma Birimi",
      name: "G. Aras",
    },
  },
  suspects,
  testimonies,
  forensics,
  evidence,
  documents,
  messageThreads: messageThreads089,
  technical,
  timeline,
  timelineInitialOrder,
  deduction: { contradictions: [], elimination: [] },
  tabSectionSub: {
    brief: "089-A · Olay Yeri",
    supheliler: "Gizli · 06 Profil",
    ifadeler: "089-C → 089-H",
    "adli-tip": "089-A · 089-B",
    deliller: "7 Adet Delil Fişi",
    belgeler: "089-K → 089-R",
    teknik: "089-S · 089-T · 089-U",
    "zaman-cizelgesi": "6 — 7 Haziran 2024",
    deduction: "Notlar · Sadece sana özel",
    cozum: "089-Z2 · Sınırlı Erişim",
  },
  verdict: {
    perpetratorId: "suspect-04",
    perpetratorName: "Alp Erdoğan",
    murderTime: "7 Haziran 2024, 03:30 — 04:00 arası",
    murderLocation: "Aşıklar Vadisi yakını, açık arazide",
    murderWeapon: "Elle boğma (mekanik asfiksi)",
    motivation:
      "Defne'nin, İpek'e Alp ile olan geçmiş ilişkisini açıklamasını engellemek; obsesif kontrol ve \"susturma\" refleksi (çözüm belgesindeki olaylar zinciri).",
    evidenceList: [
      "089-U: Tırnak altı DNA — Alp (%99.7)",
      "089-T: GPS — Alp'in aracı 02:08-04:32 Göreme'de",
      "089-S: GSM — Alp 02:30-04:00 Aşıklar Vadisi'nde",
      '089-K: İpek → Alp: "Vadiye gel" (01:18)',
      "089-B: Avuç genişliği 21cm → Alp (22cm, uyumlu)",
      "089-U: Lif — Alp'in sweatshirt'ü (%94 eşleşme)",
      "089-F2: Alp'in 2. oturumda ayakkabı toprağı doğrulaması",
      "089-A: Olay yeri — fail bölgeyi biliyor (ATV rehberi profili)",
    ],
    conclusion:
      "Alp Erdoğan, Defne Karataş'ı 7 Haziran 2024 sabaha karşı Aşıklar Vadisi'nde elle boğarak öldürdü. Cesedi peri bacasının tepesine taşıdı. Kıyafetleri delil temizliği amacıyla uzaklaştırdı. Suç ortağı: İpek Sarıhan (azmettirme/yönlendirme). İkinci soruşturma: Tolga Kıvanç (takipçilik). Üçüncü soruşturma: Hakan Orbay (uygunsuz teklif ve ifade gizleme).",
    wrongAnswerMessage:
      "Tahminin yanlıştı. Bu vakada [SECILEN_ISIM] failin kendisi değildi — sadece çevresinden biri ya da yalan söyleyenlerden biri. Gerçek fail kayıtlardan silindi. Defne Karataş davasının izi kapandı.",
    solutionDocLabel: "089-Z2 · Resmi Çözüm Belgesi · 14.06.2024",
    solutionHtml: payload.solutionHtml,
  },
};
