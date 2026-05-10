/**
 * 027 Güverte taslağını (`4-tam.json` içindeki iskelet+malzeme tek dosyası) CaseData uyumlu hale getirir.
 * Zaten verdict alanı olan (birleştirilmiş) bir dosyaya tekrar çalıştırılmaz.
 *
 * Çalıştır: node vaka-kaynak/builders/merge-027-tam.mjs
 */

import fs from "node:fs";
import path from "node:path";

const CASE_ID = "027";
const root = process.cwd();
const tDir = path.join(root, "vaka-kaynak/taslaklar", CASE_ID);
const tamPath = path.join(tDir, "4-tam.json");

function metaGet(meta, label) {
  const m = meta?.find((x) => x.label === label);
  return m?.value ?? "—";
}

function markdownishToBlocks(md) {
  let s = md
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/\*\*([^*]+):\*\*/g, "<strong>$1:</strong>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  return s
    .split(/\n\n+/)
    .map((b) => b.trim())
    .filter(Boolean)
    .map((b) => {
      if (b.startsWith("<h3")) return b;
      if (b.startsWith("<")) return b;
      return `<p>${b.replace(/\n/g, "<br/>")}</p>`;
    })
    .join("");
}

function legacyDetailsToKv(details) {
  return details.map((line, idx) => {
    const trimmed = line.replace(/^▸\s*/, "").trim();
    const colonIdx = trimmed.indexOf(":");
    if (colonIdx > 0 && colonIdx < Math.min(trimmed.length - 1, 52)) {
      return {
        label: trimmed.slice(0, colonIdx).trim(),
        value: trimmed.slice(colonIdx + 1).trim(),
      };
    }
    return { label: `Satır ${idx + 1}`, value: trimmed };
  });
}

function boardLineToDeductionHtml(s) {
  const safe = String(s).replace(/</g, "&lt;");
  const sep = safe.indexOf(" → ");
  if (sep <= 0) return `<p>${safe}</p>`;
  const a = safe.slice(0, sep).trim();
  const b = safe.slice(sep + " → ".length).trim();
  return `<p><strong>${a}</strong> → ${b}</p>`;
}

function buildSolutionHtml(raw) {
  const sol = raw.solution;
  const pn = sol.fail.name;
  const two = (sol.twoLiars ?? [])
    .map(
      (x) =>
        `<li><strong>${x.suspect}</strong> — ${x.lies}</li>`
    )
    .join("");
  const rh = (sol.redHerrings ?? [])
    .map((x) => `<p><strong>${x.suspect}:</strong> ${x.lies}</p>`)
    .join("");
  const keys = (sol.keyEvidence ?? []).map((k) => `<li>${k}</li>`).join("");
  return (
    `<div class="verdict-stamp">CLASSIFIED</div>` +
    `<div class="doc-id" style="margin-bottom:12px;">027-Z2 · Resmi Çözüm Belgesi · 16 Ağustos 2025</div>` +
    `<h3 style="font-family:'Cormorant Garamond',serif;font-size:24px;margin:0 0 8px;">Failin kimliği</h3>` +
    `<div class="verdict-name">${pn}</div>` +
    `<h3>Özet</h3>` +
    `<p>${sol.summary}</p>` +
    `<h3>Olay zamanlaması ve kilit nokta</h3>` +
    `<p><strong>${sol.streamShutdown}</strong></p>` +
    `<h3>Failin kritik hatası</h3>` +
    `<p>${sol.criticalMistake}</p>` +
    `<h3>İki yalancı</h3><ol>${two}</ol>` +
    `<h3>Kırmızı ringalar</h3>${rh}` +
    `<h3>Dayanılan kritik deliller</h3><ol>${keys}</ol>` +
    `<p style="background:rgba(107,22,32,.12);padding:16px;border-left:3px solid var(--bordeaux);margin-top:24px;"><strong>SONUÇ:</strong> ${sol.conclusion}</p>` +
    `<p style="margin-top:18px;"><strong>Tutuklama:</strong> ${sol.arrestDate}</p>` +
    `<div class="doc-signature"><div class="sig-line">Kıdemli Kriminal Analist · D.A.K.T.</div><div class="sig-name">Onaylı</div></div>`
  );
}

const raw = JSON.parse(fs.readFileSync(tamPath, "utf8"));

if (raw.verdict && typeof raw.victim === "string") {
  console.log("✓ 4-tam.json zaten CaseData formatında, birleştirme atlandı.");
  process.exit(0);
}

if (typeof raw.victim !== "object" || raw.victim == null) {
  console.error(
    'Beklenen eski şema (victim: { name, description }) veya yeni şema (victim string + verdict). Dosyayı kontrol edin.'
  );
  process.exit(1);
}

const idToSuspectName = Object.fromEntries(
  raw.suspects.map((s) => [s.id, s.name])
);

function suspectCode(tag, idx) {
  return `SUSP-${String(idx).padStart(2, "0")} · ${tag}`;
}

const suspects = raw.suspects.map((s, i) => ({
  id: s.id,
  code: suspectCode(s.tag, i + 1),
  name: s.name,
  role: s.role,
  quote: `"${s.quote}"`,
}));

const testimonies = raw.testimonies.map((t) => {
  const session = t.session ?? 1;
  const useMetaRows = session > 1;
  const out = {
    id: t.id,
    suspectName: idToSuspectName[t.suspectId],
    headerDocId: `${t.docCode} · Sahil Güvenlik Kriminal Büro`,
    title: t.title,
    date: t.date,
    birth: useMetaRows ? "—" : metaGet(t.meta, "Doğum"),
    occupation: useMetaRows ? "—" : metaGet(t.meta, "Meslek"),
    address: useMetaRows ? "—" : metaGet(t.meta, "Adres"),
    session,
    paragraphs: String(t.content)
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean),
    signature: t.signature,
  };
  if (useMetaRows) {
    const rows = [...(t.meta ?? [])];
    if (t.note) rows.unshift({ label: "Not", value: t.note });
    out.metaRows = rows;
  }
  if (t.criticalNote) out.callouts = [t.criticalNote];
  return out;
});

const scene = raw.forensics.sceneReport;
const aut = raw.forensics.autopsy;

const sceneBody =
  `<h3>Bulgular</h3><ol>${scene.findings.map((f) => `<li>${f}</li>`).join("")}</ol>` +
  `<p><strong>Ön değerlendirme:</strong> ${scene.preliminaryNote}</p>`;

const autBody =
  `<h3>Dış Muayene</h3><ul>${aut.externalExam.map((x) => `<li>${x}</li>`).join("")}</ul>` +
  `<h3>İç Muayene</h3><ul>${aut.internalExam.map((x) => `<li>${x}</li>`).join("")}</ul>` +
  `<p><strong>Ölüm nedeni:</strong> ${aut.causeOfDeath}</p>` +
  `<p><strong>Ölüm zamanı (tahmini):</strong> ${aut.timeOfDeath}</p>` +
  `<h3>Kritik bulgular</h3><ul>${aut.criticalFindings.map((x) => `<li>${x}</li>`).join("")}</ul>`;

const forensics = [
  {
    id: "027-A",
    docId: "027-A · Olay Yeri İnceleme",
    title: scene.title,
    meta: [
      { label: "Olay tarihi referansı", value: raw.dateRange },
      { label: "Hazırlayan", value: scene.author },
    ],
    body: sceneBody,
    signature: {
      role: "Olay Yeri İnceleme",
      name: "Başkomiser Yılmaz",
    },
  },
  {
    id: "027-B",
    docId: "027-B · Antalya Adli Tıp",
    title: aut.title,
    meta: [
      { label: "Rapor Tarihi", value: aut.date },
      { label: "Hazırlayan", value: aut.author },
    ],
    body: autBody,
    signature: {
      role: "Uzm. Dr.",
      name: "S. Akbulut",
    },
  },
];

const evidence = raw.evidence.map((e) => ({
  id: e.code,
  tag: e.tag,
  title: e.title,
  description: e.description,
  details: legacyDetailsToKv(e.details),
}));

const documents = raw.documents.map((d, i) => ({
  id: d.docCode || `027-doc-${i}`,
  docId: `${d.docCode} · Dosya Ekleri`,
  title: d.title,
  meta: [
    { label: "Tip", value: d.type ?? "Belge" },
    { label: "Sıra", value: `${i + 1}` },
  ],
  body: markdownishToBlocks(d.content),
}));

const technical = raw.technical.items.map((it, i) => ({
  id: it.docCode ?? `027-T-${i}`,
  docId: `${it.docCode} · Teknik`,
  title: it.title,
  meta: [{ label: "Belge tipi", value: "Teknik rapor" }],
  body: markdownishToBlocks(it.content),
}));

const senderFromThread = new Map([
  ["pinar", "Pınar Korkmaz"],
  ["dr_x", "Dr. T. (Kayıtlı Kişi)"],
  ["cem", "Cem Tunalı"],
  ["bekir", "Bekir İskenderun"],
  ["damla", "Damla Aydoğan"],
  ["selin", "Selin (Arkadaş)"],
]);

const messageThreads = raw.messageThreads.map((thread) => {
  const finalParticipants =
    thread.id === "thread-pinar-doc"
      ? [
          { name: "Dr. T. (Kayıtlı Kişi)", isPerpetrator: false },
          { name: "Pınar Korkmaz", isUser: true },
        ]
      : thread.id === "thread-cem-bekir"
        ? [
            { name: "Bekir İskenderun" },
            { name: "Cem Tunalı", isUser: true },
          ]
        : [
            { name: "Selin (Arkadaş)" },
            { name: "Damla Aydoğan", isUser: true },
          ];

  const messages = thread.messages.map((m) => {
    const ts = (m.timestamp || "").trim();
    const parts = ts.split(/\s+/);
    const datePart = parts[0] || "";
    const timePart = parts.slice(1).join(" ") || "";
    const mid = `${thread.id}-${m.id}`;
    if (m.type === "system" || (!m.senderId && m.type !== "text")) {
      return {
        id: mid,
        sender: "Sistem",
        text: m.text,
        time: timePart || "—",
        date: datePart,
        type: "system",
        systemText: m.text,
      };
    }
    const sender =
      senderFromThread.get(m.senderId) ??
      idToSuspectName[m.senderId] ??
      m.senderId;
    return {
      id: mid,
      sender,
      text: m.text,
      time: timePart,
      date: datePart,
      status: "read",
      type: m.type ?? "text",
    };
  });

  return {
    id: thread.id,
    title: thread.title,
    caseId: CASE_ID,
    platform: thread.platform,
    participants: finalParticipants,
    messages,
    meta: {
      forensicNote: `Telefon incelemesi · ${thread.docCode ?? thread.id}`,
    },
  };
});

const timeline = raw.timeline.map((ev, i) => ({
  id: `tl${CASE_ID}-${i}`,
  time: ev.time,
  event: ev.event,
  source: ev.source,
  critical: ev.isCritical === true,
}));

const timelineInitialOrder = [
  "tl027-8",
  "tl027-2",
  "tl027-10",
  "tl027-0",
  "tl027-11",
  "tl027-4",
  "tl027-9",
  "tl027-1",
  "tl027-6",
  "tl027-3",
  "tl027-7",
  "tl027-5",
  "tl027-12",
];

const contradictionTexts = raw.board.contradictions.map(boardLineToDeductionHtml);
const eliminationTexts = raw.board.eliminations.map(boardLineToDeductionHtml);

const deduction = {
  contradictions: contradictionTexts.map((text) => ({ pin: true, text })),
  elimination: eliminationTexts.map((text) => ({ pin: true, text })),
};

const sol = raw.solution;
const victimLabel = `${raw.victim.name} (62, erkek)`;

const verdict = {
  perpetratorId: sol.fail.suspectId,
  perpetratorName: sol.fail.name,
  murderTime: aut.timeOfDeath,
  murderLocation: raw.location,
  murderWeapon: "Zolpidex (yüksek sedatif intravenöz) ve jakuzi ortamında mekanik asfiksi",
  motivation:
    "Rıza Tunalı üzerinden maddi çıkar ve sağlık erişimi; ilaç/şanter senaryosuyla ölümün ‘doğal’ görünmesi.",
  evidenceList: [
    "Kan toksikolojisi — damar içi fatal Zolpidex",
    ...(sol.keyEvidence ?? []),
    "VIP koridor elektrik kesintisi (manuel şalter)",
  ],
  conclusion: sol.conclusion,
  wrongAnswerMessage:
    "Bu şüpheli fail değil. Otopsi ile dijital kilit kayıtlarını, kamera kesinti zamanını ve VIP personel çıkış rotasını tekrar eşleyin.",
  solutionDocLabel: "027-Z2 · Resmi Çözüm Belgesi",
  solutionHtml: buildSolutionHtml(raw),
};

const briefSections = [];
const summaryParas = raw.brief.summary.split(/\n\n+/).filter(Boolean);
summaryParas.forEach((chunk, i) => {
  briefSections.push({
    title: i === 0 ? "Olay" : `Özet (${i})`,
    body: `<p>${chunk.replace(/\n/g, "<br/>")}</p>`,
  });
});

briefSections.push({
  title: "Mağdur profili",
  body: `<p>${raw.brief.victimProfile}</p>`,
});

briefSections.push({
  title: "Kayıt / kamera",
  body: `<p>${raw.brief.streamRecord}</p>`,
});

briefSections.push({
  title: "Görev",
  body: `<p>${raw.brief.mission}</p>`,
});

briefSections.push({
  title: "Uyarı",
  body: `<p style="background:rgba(107,22,32,0.1);padding:12px 16px;border-left:3px solid var(--bordeaux);">${raw.brief.warning}</p>`,
});

const merged = {
  id: CASE_ID,
  codename: raw.codename,
  fullTitle: `Vaka № ${CASE_ID} — ${raw.fullTitle}`,
  status: "active",
  difficulty: "Zor",
  recommendedPlayers: "2–4 analist",
  location: raw.location,
  victim: victimLabel,
  date: raw.dateRange,
  shortSummary:
    "Antalya açıklarında kruvaziyerde VIP jakuzi cinayeti. Kameraları sahte kesinti süresi bağladı.",
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
    subtitle: "MV Poseidon · VIP Güverte · 15 Ağustos 2025",
    metaPairs: [
      { label: "Vaka No", value: CASE_ID },
      {
        label: "Dosya Tipi",
        value: "Cinayet — Mekanik asfiksi / sedatif — Yüksek öncelik",
      },
      { label: "Olay tarihi (aralık)", value: raw.dateRange },
      { label: "Konum", value: raw.location },
      { label: "Kurban", value: victimLabel },
      { label: "Olay zamanı (tahmin)", value: raw.brief.timeOfIncident ?? "—" },
    ],
    sections: briefSections,
    signature: {
      role: "Düzenleyen\nDeniz Güvenlik Koordinasyon Birimi",
      name: "Bşçvş. Ö. Erdem",
    },
  },
  suspects,
  testimonies,
  forensics,
  evidence,
  documents,
  messageThreads,
  technical,
  timeline,
  timelineInitialOrder,
  deduction,
  verdict,
  tabSectionSub: {
    brief: "027 · Gemi özet",
    "adli-tip": "027-B · Otopsi",
    deliller: "Fiziksel deliller",
    belgeler: "027-C · Ek belgeler",
    teknik: "027-T1 · Elektrik",
    cozum: "027-Z2 · Sınırlı erişim",
  },
};

fs.writeFileSync(tamPath, JSON.stringify(merged, null, 2), "utf8");
console.log("✓ 4-tam.json CaseData olarak birleştirildi (027)");
