/**
 * dakt-vaka-114.html → 114-payload.json (tek seferlik çıkarım)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const htmlPath = path.join(root, "dakt-vaka-114.html");
const outPath = path.join(root, "src/data/cases/114-payload.json");

const html = fs.readFileSync(htmlPath, "utf8");

function sliceArticle(startMarker, endMarker) {
  const a = html.indexOf(startMarker);
  if (a === -1) throw new Error("Missing: " + startMarker.slice(0, 40));
  const b = html.indexOf(endMarker, a + 10);
  if (b === -1) throw new Error("End missing after " + startMarker.slice(0, 40));
  return html.slice(a, b);
}

function extractDocBody(articleHtml) {
  const sigIdx = articleHtml.indexOf('<div class="doc-signature">');
  const chunk = sigIdx === -1 ? articleHtml : articleHtml.slice(0, sigIdx);
  const dlEnd = chunk.indexOf("</dl>");
  if (dlEnd !== -1) {
    return chunk.slice(dlEnd + "</dl>".length).trim();
  }
  const hm = chunk.match(
    /<div class="doc-header">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*/,
  );
  if (hm) {
    return chunk.slice(hm.index + hm[0].length).trim();
  }
  return chunk.trim();
}

function extractSignature(articleHtml) {
  const m = articleHtml.match(
    /<div class="doc-signature">[\s\S]*?<div class="sig-line">([\s\S]*?)<\/div>[\s\S]*?<div class="sig-name">([^<]+)<\/div>/,
  );
  if (!m) return undefined;
  return { role: m[1].replace(/<br\s*\/?>/gi, "\n").trim(), name: m[2].trim() };
}

function extractDocMeta(articleHtml) {
  const rows = [];
  const re = /<dt>([^<]+)<\/dt>\s*<dd>([\s\S]*?)<\/dd>/g;
  let m;
  while ((m = re.exec(articleHtml))) {
    rows.push({ label: m[1].trim(), value: m[2].replace(/\s+/g, " ").trim() });
  }
  return rows;
}

function extractDocIdTitle(articleHtml) {
  const idM = articleHtml.match(/<div class="doc-id">([^<]+)<\/div>/);
  const tM = articleHtml.match(/<h2 class="doc-title">([^<]+)<\/h2>/);
  return { docId: idM?.[1]?.trim() ?? "", title: tM?.[1]?.trim() ?? "" };
}

// Brief
const briefArt = sliceArticle(
  '<article class="doc" data-doc="brief">',
  "</article>",
);
const briefMetaPairs = extractDocMeta(briefArt);
const briefBodyAfterDl = briefArt.slice(briefArt.indexOf("</dl>") + "</dl>".length);
const briefSig = extractSignature(briefArt);
const briefSections = [];
const h3split = briefBodyAfterDl.split(/(?=<h3>)/);
for (const chunk of h3split) {
  const hm = chunk.match(/^<h3>([^<]+)<\/h3>([\s\S]*)$/);
  if (!hm) continue;
  let body = hm[2].trim();
  const sigInBody = body.indexOf('<div class="doc-signature">');
  if (sigInBody !== -1) body = body.slice(0, sigInBody).trim();
  briefSections.push({ title: hm[1].trim(), body });
}
const briefSectionsClean = briefSections;

// Testimonies — split Vedat
const vedatArt = sliceArticle(
  '<article class="doc" data-doc="vedat">',
  "</article>",
);
const vedatMeta = extractDocMeta(vedatArt);
const vedatSig = extractSignature(vedatArt);
const vedatAfterDl = vedatArt.slice(vedatArt.indexOf("</dl>") + "</dl>".length);
const vedatSigIdx = vedatAfterDl.indexOf('<div class="doc-signature">');
const vedatMain = vedatAfterDl.slice(0, vedatSigIdx).trim();

const session2Idx = vedatMain.indexOf('<p style="background:rgba(107,22,32,.1)');
const vedatP1 = vedatMain.slice(0, session2Idx).trim();
const vedatP2 = vedatMain.slice(session2Idx).trim();

function fullTestimony(dataDoc, id, headerDocId, title, session, suspectName) {
  const art = sliceArticle(
    `<article class="doc" data-doc="${dataDoc}">`,
    "</article>",
  );
  const meta = extractDocMeta(art);
  const afterDl = art.slice(art.indexOf("</dl>") + "</dl>".length);
  const sigIdx = afterDl.indexOf('<div class="doc-signature">');
  const bodyHtml = afterDl.slice(0, sigIdx).trim();
  const paras = bodyHtml
    .split(/(?=<p[\s>])/)
    .map((s) => s.trim())
    .filter(Boolean);
  const sig = extractSignature(art);
  const sigNameLine = art.match(
    /<div class="sig-name">([^<]+)<\/div>/,
  );
  const sigLine = art.match(/<div class="sig-line">([\s\S]*?)<\/div>/);
  return {
    id,
    suspectName,
    date: meta.find((m) => m.label === "Tarih")?.value ?? "",
    birth: meta.find((m) => m.label === "Doğum")?.value ?? "",
    occupation: meta.find((m) => m.label === "Meslek")?.value ?? "",
    address: meta.find((m) => m.label === "Adres")?.value ?? "",
    paragraphs: bodyHtml.includes("<p") ? paras : [bodyHtml],
    signature: sigNameLine?.[1]?.trim() ?? "?",
    signatureRole: sigLine?.[1]?.replace(/<br\s*\/?>/gi, " · ").replace(/\s+/g, " ").trim() ?? "",
    headerDocId,
    title,
    session,
    metaRows:
      session === 2
        ? [{ label: "Tarih", value: "20.10.2024 · akşam" }, { label: "Not", value: "1. oturum sonrası" }]
        : undefined,
  };
}

const testimonies = [
  {
    id: "114-C",
    suspectName: "Vedat Kaplan",
    date: "19.10.2024 — iki oturum",
    birth: "03.04.1972",
    occupation: "Avukat · Vega Hukuk kurucu ortak",
    address: "Etiler · Nisbetiye Cad.",
    paragraphs: vedatP1
      .split(/(?=<p[\s>])/)
      .map((s) => s.trim())
      .filter(Boolean),
    signature: "V. Kaplan",
    signatureRole: "İfade Sahibi · Avukat talep etti",
    headerDocId: "114-C · Levent Polis Merkezi",
    title: "İfade — Vedat Kaplan (1. Oturum)",
    session: 1,
  },
  {
    id: "114-C2",
    suspectName: "Vedat Kaplan",
    date: "20.10.2024 · akşam",
    birth: "—",
    occupation: "—",
    address: "—",
    paragraphs: vedatP2
      .split(/(?=<p[\s>])/)
      .map((s) => s.trim())
      .filter(Boolean),
    signature: "V. Kaplan",
    signatureRole: "İfade Sahibi · Avukat talep etti",
    headerDocId: "114-C2 · Levent Polis Merkezi",
    title: "İfade — Vedat Kaplan (2. Oturum)",
    session: 2,
    metaRows: [
      { label: "Tarih", value: "20.10.2024 · akşam" },
      { label: "Not", value: "1. oturum sonrası" },
    ],
  },
];

for (const { doc, id, hid, title, name } of [
  { doc: "dilan", id: "114-D", hid: "114-D · Levent Polis Merkezi", title: "İfade — Dilan Arslan", name: "Dilan Arslan" },
  { doc: "nuri", id: "114-E", hid: "114-E · Levent Polis Merkezi", title: "İfade — Nuri Çakır", name: "Nuri Çakır" },
  { doc: "songul", id: "114-F", hid: "114-F · Levent Polis Merkezi", title: "İfade — Songül Yıldız", name: "Songül Yıldız" },
  { doc: "cem", id: "114-G", hid: "114-G · Levent Polis Merkezi", title: "İfade — Cem Balcı", name: "Cem Balcı" },
]) {
  testimonies.push(fullTestimony(doc, id, hid, title, undefined, name));
}

function forensicsDoc(dataDoc, shortId) {
  const art = sliceArticle(
    `<article class="doc" data-doc="${dataDoc}">`,
    "</article>",
  );
  const { docId, title } = extractDocIdTitle(art);
  return {
    id: shortId,
    docId,
    title,
    meta: extractDocMeta(art),
    body: extractDocBody(art),
    signature: extractSignature(art),
  };
}

const forensics = [
  forensicsDoc("scene", "114-A"),
  forensicsDoc("autopsy", "114-B"),
];

function standardDoc(dataDoc, id) {
  const art = sliceArticle(
    `<article class="doc" data-doc="${dataDoc}">`,
    "</article>",
  );
  const { docId, title } = extractDocIdTitle(art);
  return {
    id,
    docId,
    title,
    meta: extractDocMeta(art),
    body: extractDocBody(art),
    signature: extractSignature(art),
  };
}

const documents = [
  standardDoc("notes", "114-K"),
  standardDoc("banka", "114-M"),
  standardDoc("asansor", "114-N"),
];

const technical = [
  standardDoc("cctv", "114-O"),
  standardDoc("dna", "114-P"),
  standardDoc("selim", "114-Q"),
];

// Email 114-L
const emailArt = sliceArticle(
  '<article class="doc" data-doc="emails">',
  "</article>",
);
const emailMsgs = [];
const emailInner = emailArt.slice(
  emailArt.indexOf('<div class="email-thread">'),
  emailArt.indexOf('<p style="margin-top:18px'),
);
let idx = 0;
const splits = emailInner.match(/<div class="email-msg">[\s\S]*?<\/div>/g) ?? [];
for (const block of splits) {
  const kimden = block.match(/<dt>Kimden<\/dt><dd>([^<]+)<\/dd>/);
  const kime = block.match(/<dt>Kime<\/dt><dd>([^<]+)<\/dd>/);
  const tarih = block.match(/<dt>Tarih<\/dt><dd>([^<]+)<\/dd>/);
  const konu = block.match(/<dt>Konu<\/dt><dd>([^<]+)<\/dd>/);
  const bodyM = block.match(/<div class="email-body">([\s\S]*?)<\/div>/);
  const dt = tarih?.[1]?.trim() ?? "";
  const [datePart, timePart] = dt.split("·").map((s) => s.trim());
  const text = bodyM?.[1]?.replace(/<\/p>\s*<p>/g, "\n\n").replace(/<\/?p>/g, "").replace(/\n\n+/g, "\n\n").trim() ?? "";
  const fromAddr = kimden?.[1]?.trim() ?? "";
  const isVedat = fromAddr.includes("vedat");
  emailMsgs.push({
    id: `114-l-${idx++}`,
    sender: isVedat ? "Vedat Kaplan" : "Selim Tür",
    text,
    time: timePart ?? dt,
    date: datePart ?? dt,
    emailFrom: fromAddr,
    emailTo: kime?.[1]?.trim() ?? "",
    emailSubject: konu?.[1]?.trim() ?? "",
    type: "text",
  });
}
// fix sender for second email
if (emailMsgs[1]) {
  emailMsgs[1].sender = "Selim Gür";
}

const emailCik = emailArt.match(
  /<p style="margin-top:18px[^"]*"><strong>Çıkarsama:<\/strong>([\s\S]*?)<\/p>/,
);

const emailThreadPayload = {
  id: "114-mt-l",
  caseId: "114",
  platform: "email",
  title: "Vedat Kaplan — Giden Kutusu (Son 7 Gün)",
  participants: [
    { name: "Vedat Kaplan", isUser: true, isPerpetrator: true },
    { name: "Selim Gür" },
  ],
  meta: {
    forensicNote: `<strong>Çıkarsama:</strong>${emailCik?.[1]?.trim() ?? ""}`,
    deviceInfo: "114-L · E-posta Sunucu Kayıtları",
  },
  footerSignature: extractSignature(emailArt),
  messages: emailMsgs,
};

// Timeline — tl-item içi düz (iç içe div yok)
const tlSecStart = html.indexOf('<section class="section" id="timeline">');
const tlSecEnd = tlSecStart === -1 ? -1 : html.indexOf("</section>", tlSecStart);
const tlChunk = tlSecStart === -1 ? "" : html.slice(tlSecStart, tlSecEnd);
const tlItems = [];
const tlItemRe =
  /<div class="tl-item([^>]*)>\s*<div class="tl-time">([^<]+)<\/div><div class="tl-event">([^<]+)<\/div><div class="tl-source">([^<]*)<\/div><\/div>/g;
let tlm;
let tix = 0;
while ((tlm = tlItemRe.exec(tlChunk))) {
  tlItems.push({
    id: `tl114-${tix++}`,
    time: tlm[2].trim(),
    event: tlm[3].trim(),
    source: tlm[4].trim(),
    critical: tlm[1].includes("critical"),
  });
}

// Deduction
const bgStart = html.indexOf('<div class="board-grid">');
const bgEnd = html.indexOf('<textarea class="note-pad"', bgStart);
const boardHtml = bgStart === -1 || bgEnd === -1 ? "" : html.slice(bgStart, bgEnd);
const contradictions = [];
const elim = [];
const colParts = boardHtml.split('<div class="board-col">');
for (const col of colParts.slice(1)) {
  const isElim = col.includes("Eleme Mantığı");
  const items = [...col.matchAll(/<div class="board-item">[\s\S]*?<span class="pin"><\/span>([\s\S]*?)<\/div>/g)].map(
    (m) => ({
      pin: true,
      text: m[1].replace(/<strong>/g, "<strong>").trim(),
    }),
  );
  if (isElim) elim.push(...items);
  else contradictions.push(...items);
}

// Solution HTML
const solStart = html.indexOf('<article class="verdict">');
const solEnd = html.indexOf("</article>", solStart);
const solutionHtml = html.slice(solStart + '<article class="verdict">'.length, solEnd).trim();

const payload = {
  briefMetaPairs,
  briefSections: briefSectionsClean,
  briefSignature: briefSig,
  testimonies,
  forensics,
  documents,
  technical,
  emailThread: emailThreadPayload,
  timeline: tlItems,
  deduction: { contradictions, elimination: elim },
  solutionHtml,
};

fs.writeFileSync(outPath, JSON.stringify(payload), "utf8");
console.log("Wrote", outPath, { testimonies: testimonies.length, timeline: tlItems.length });
