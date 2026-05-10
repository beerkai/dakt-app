/**
 * Birleştirir: 1-iskelet + 2-ifadeler + 3-belgeler + 4-tam (iskelet parçası)
 * Çıktı: vaka-kaynak/taslaklar/033/4-tam.json (CaseData uyumlu tam dosya)
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const tDir = path.join(root, "vaka-kaynak/taslaklar/033");

const iskelet = JSON.parse(fs.readFileSync(path.join(tDir, "1-iskelet.json"), "utf8"));
const ifadeler = JSON.parse(fs.readFileSync(path.join(tDir, "2-ifadeler.json"), "utf8"));
const belgeler = JSON.parse(fs.readFileSync(path.join(tDir, "3-belgeler.json"), "utf8"));
const tamPartial = JSON.parse(fs.readFileSync(path.join(tDir, "4-tam.json"), "utf8"));

const idToName = Object.fromEntries(iskelet.suspects.map((s) => [s.id, s.name]));

function suspectCode(idx, tag) {
  return `SUSP-0${idx} · ${tag}`;
}

const suspects = iskelet.suspects.map((s, i) => ({
  id: s.id,
  code: suspectCode(i + 1, s.tag),
  name: s.name,
  role: s.role,
  quote: `"${s.quote}"`,
}));

function metaGet(meta, label) {
  const m = meta?.find((x) => x.label === label);
  return m?.value ?? "—";
}

const testimonies = ifadeler.testimonies.map((t) => {
  const session = t.session ?? 1;
  const useMetaRows = session > 1;
  const out = {
    id: t.id,
    suspectName: idToName[t.suspectId],
    headerDocId: `${t.docCode} · Çaykara İlçe Jandarma`,
    title: t.title,
    date: t.date,
    birth: useMetaRows ? "—" : metaGet(t.meta, "Doğum"),
    occupation: useMetaRows ? "—" : metaGet(t.meta, "Meslek"),
    address: useMetaRows ? "—" : metaGet(t.meta, "Adres"),
    session,
    paragraphs: t.content
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean),
    signature: t.signature,
  };
  if (useMetaRows) out.metaRows = t.meta;
  if (t.signatureRole) out.signatureRole = t.signatureRole;
  return out;
});

const scene = belgeler.forensics.sceneReport;
const aut = belgeler.forensics.autopsy;

const sceneBody = `<h3>Bulgular</h3><ol>${scene.findings
  .map((f) => `<li>${f}</li>`)
  .join("")}</ol><p><strong>Ön değerlendirme:</strong> ${scene.preliminaryNote}</p>`;

const autBody = `<h3>Dış Muayene</h3><ul>${aut.externalExam
  .map((x) => `<li>${x}</li>`)
  .join("")}</ul><h3>İç Muayene</h3><ul>${aut.internalExam
  .map((x) => `<li>${x}</li>`)
  .join("")}</ul><p><strong>Ölüm nedeni:</strong> ${aut.causeOfDeath}</p><p><strong>Ölüm zamanı (tahmini):</strong> ${aut.timeOfDeath}</p><h3>Kritik bulgular</h3><ul>${aut.criticalFindings
  .map((x) => `<li>${x}</li>`)
  .join("")}</ul>`;

const forensics = [
  {
    id: "033-A",
    docId: "033-A · Olay Yeri İnceleme",
    title: scene.title,
    meta: [
      { label: "Olay Tarihi", value: "14.03.2025" },
      { label: "Hazırlayan", value: scene.author },
    ],
    body: sceneBody,
    signature: { role: "Olay Yeri İnceleme", name: "Bşçvş. M. Kılıç" },
  },
  {
    id: "033-B",
    docId: "033-B · Trabzon Adli Tıp Kurumu",
    title: aut.title,
    meta: [
      { label: "Rapor Tarihi", value: aut.date },
      { label: "Hazırlayan", value: aut.author },
    ],
    body: autBody,
    signature: { role: "Uzm. Dr.", name: "K. Aydın" },
  },
];

const evidence = belgeler.evidence.map((e) => ({
  id: e.code,
  tag: e.tag,
  title: e.title,
  description: e.description,
  details: e.details,
}));

const coopRaw = belgeler.documents[0];
const coopBody = (() => {
  let s = coopRaw.content
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/\*\*([^*]+):\*\*/g, "<strong>$1:</strong>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  return s
    .split(/\n\n+/)
    .map((b) => b.trim())
    .filter(Boolean)
    .map((b) => {
      if (b.startsWith("<h3")) return b;
      if (b.startsWith("<p")) return b;
      return `<p>${b.replace(/\n/g, "<br/>")}</p>`;
    })
    .join("");
})();

const technical = [
  {
    id: "033-I",
    docId: "033-I · Kooperatif Mali",
    title: coopRaw.title,
    meta: [{ label: "Belge tipi", value: coopRaw.type ?? "Mali Belge" }],
    body: coopBody,
  },
];

const senderIdToName = { firat: "Fırat Çoruh", salih: "Salih Çoruh" };
const thread = belgeler.messageThreads[0];
const messageThreads = [
  {
    id: thread.id,
    title: thread.title,
    caseId: "033",
    platform: thread.platform,
    participants: [
      { name: "Fırat Çoruh", isPerpetrator: true },
      { name: "Salih Çoruh" },
    ],
    messages: thread.messages.map((m) => {
      const [datePart, ...timeParts] = m.timestamp.split(" ");
      const timePart = timeParts.join(" ");
      if (m.type === "system") {
        return {
          id: `${thread.id}-${m.id}`,
          sender: senderIdToName[m.senderId] ?? "Sistem",
          text: m.text,
          time: timePart,
          date: datePart,
          type: "system",
          systemText: m.text,
        };
      }
      return {
        id: `${thread.id}-${m.id}`,
        sender: senderIdToName[m.senderId],
        text: m.text,
        time: timePart,
        date: datePart,
        status: "read",
      };
    }),
    meta: {
      forensicNote: thread.meta.forensicNote,
    },
  },
];

// questions CaseData'da yok — build çıktısında tutma
const { questions: _omitQ, ...tamRest } = tamPartial;

const merged = {
  ...tamRest,
  suspects,
  testimonies,
  forensics,
  evidence,
  documents: [],
  messageThreads,
  technical,
};

fs.writeFileSync(path.join(tDir, "4-tam.json"), JSON.stringify(merged, null, 2), "utf8");
console.log("✓ 4-tam.json birleştirildi (033)");
