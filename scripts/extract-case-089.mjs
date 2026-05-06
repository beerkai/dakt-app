/**
 * One-off: dakt-vaka-089.html → src/data/cases/089-payload.json
 * Run: node scripts/extract-case-089.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const htmlPath = path.join(root, "dakt-vaka-089.html");
const html = fs.readFileSync(htmlPath, "utf8");

function sliceBetween(src, startMarker, endMarker) {
  const a = src.indexOf(startMarker);
  const b = src.indexOf(endMarker, a + startMarker.length);
  if (a === -1 || b === -1) throw new Error(`Missing ${startMarker}`);
  return src.slice(a + startMarker.length, b).trim();
}

function stripArticleOuter(inner) {
  const m = inner.match(
    /<article class="doc"[^>]*>([\s\S]*)<\/article>/i,
  );
  return m ? m[1].trim() : inner;
}

function extractArticleInnerByDataDoc(dataDoc) {
  const re = new RegExp(
    `<article class="doc" data-doc="${dataDoc}"[^>]*>([\\s\\S]*?)</article>`,
    "i",
  );
  const m = html.match(re);
  if (!m) throw new Error(`article data-doc=${dataDoc} not found`);
  return m[1].trim();
}

function innerFromDocHeaderToSignature(fullInner) {
  const hs = fullInner.indexOf("</div></div>");
  const headerEnd =
    fullInner.indexOf("</div>", fullInner.indexOf("doc-header")) + 6;
  const afterHeader =
    fullInner.indexOf("</div>", fullInner.indexOf("doc-stamp-area")) + 6;
  const start = fullInner.indexOf("<dl", afterHeader);
  if (start === -1) {
    const h3 = fullInner.indexOf("<h3");
    return fullInner.slice(h3).replace(/<div class="doc-signature">[\s\S]*$/, "").trim();
  }
  return fullInner
    .slice(start)
    .replace(/<div class="doc-signature">[\s\S]*$/, "")
    .trim();
}

function parseMetaDl(dlHtml) {
  const pairs = [];
  const dtRe = /<dt>([^<]*)<\/dt>\s*<dd>([\s\S]*?)<\/dd>/gi;
  let m;
  while ((m = dtRe.exec(dlHtml))) {
    pairs.push({ label: m[1].trim(), value: m[2].trim() });
  }
  return pairs;
}

function testimonyFromArticle(
  dataDoc,
  id,
  suspectName,
  title,
  headerDocId,
  signature,
  signatureRole,
  session,
) {
  const inner = extractArticleInnerByDataDoc(dataDoc);
  const metaStart = inner.indexOf("<dl class=\"doc-meta\"");
  const metaEnd = inner.indexOf("</dl>", metaStart) + 5;
  const dl = inner.slice(metaStart, metaEnd);
  const metaRows = parseMetaDl(dl);
  const bodyRest = inner.slice(metaEnd).replace(/<div class="doc-signature">[\s\S]*$/, "").trim();
  const paraParts = [];
  let i = 0;
  const rePara = /<p[\s\S]*?<\/p>/g;
  let pm;
  while ((pm = rePara.exec(bodyRest))) {
    paraParts.push(pm[0]);
  }
  if (paraParts.length === 0 && bodyRest.includes("<ul")) {
    paraParts.push(bodyRest);
  } else if (paraParts.length === 0 && bodyRest.includes("<table")) {
    paraParts.push(bodyRest);
  }
  const paragraphs = paraParts.length ? paraParts : [bodyRest];

  const legacy = {
    date: metaRows.find((r) => r.label === "Tarih")?.value ?? "",
    birth: metaRows.find((r) => r.label === "Doğum")?.value ?? "—",
    occupation: metaRows.find((r) => r.label === "Meslek")?.value ?? "—",
    address:
      metaRows.find((r) => r.label === "Konaklama" || r.label === "Adres")
        ?.value ?? "—",
  };

  return {
    id,
    suspectName,
    date: legacy.date,
    birth: legacy.birth,
    occupation: legacy.occupation,
    address: legacy.address,
    paragraphs,
    signature,
    signatureRole,
    headerDocId,
    title,
    session,
    metaRows:
      metaRows.filter((r) => r.label === "Not").length &&
      metaRows.every((r) => !["Doğum", "Meslek"].includes(r.label))
        ? metaRows
        : undefined,
  };
}

const testimonies = [
  testimonyFromArticle(
    "ipek1",
    "089-C",
    "İpek Sarıhan",
    "İfade — İpek Sarıhan (1. Oturum)",
    "089-C · Nevşehir İl Jandarma Komutanlığı",
    "İ. Sarıhan",
    "İfade Sahibi · Baskısız",
    1,
  ),
  testimonyFromArticle(
    "ipek2",
    "089-C2",
    "İpek Sarıhan",
    "İfade — İpek Sarıhan (2. Oturum)",
    "089-C2 · Nevşehir İl Jandarma Komutanlığı",
    "İ. Sarıhan",
    "İfade Sahibi · Avukat talep etti",
    2,
  ),
  testimonyFromArticle(
    "ceren1",
    "089-D",
    "Ceren Aksoy",
    "İfade — Ceren Aksoy",
    "089-D · Nevşehir İl Jandarma Komutanlığı",
    "C. Aksoy",
    "İfade Sahibi · Baskısız",
    undefined,
  ),
  testimonyFromArticle(
    "ceren2",
    "089-D2",
    "Ceren Aksoy",
    "İfade — Ceren Aksoy (2. Oturum)",
    "089-D2 · Nevşehir İl Jandarma Komutanlığı",
    "C. Aksoy",
    "İfade Sahibi · Baskısız",
    2,
  ),
  testimonyFromArticle(
    "tolga",
    "089-E",
    "Tolga Kıvanç",
    "İfade — Tolga Kıvanç",
    "089-E · Nevşehir İl Jandarma Komutanlığı",
    "T. Kıvanç",
    "İfade Sahibi · Baskısız",
    undefined,
  ),
  testimonyFromArticle(
    "alp1",
    "089-F",
    "Alp Erdoğan",
    "İfade — Alp Erdoğan (1. Oturum)",
    "089-F · Nevşehir İl Jandarma Komutanlığı",
    "A. Erdoğan",
    "İfade Sahibi · Baskısız",
    1,
  ),
  testimonyFromArticle(
    "alp2",
    "089-F2",
    "Alp Erdoğan",
    "İfade — Alp Erdoğan (2. Oturum)",
    "089-F2 · Nevşehir İl Jandarma Komutanlığı",
    "A. Erdoğan",
    "İfade Sahibi · Avukat talep etti",
    2,
  ),
  testimonyFromArticle(
    "hakan",
    "089-G",
    "Hakan Orbay",
    "İfade — Hakan Orbay",
    "089-G · Nevşehir İl Jandarma Komutanlığı",
    "H. Orbay",
    "İfade Sahibi · Avukat huzurunda",
    undefined,
  ),
  testimonyFromArticle(
    "elif",
    "089-H",
    "Elif Mertoğlu",
    "İfade — Elif Mertoğlu",
    "089-H · Nevşehir İl Jandarma Komutanlığı",
    "E. Mertoğlu",
    "İfade Sahibi · Baskısız",
    undefined,
  ),
];

function docFromDataDoc(id, docId, dataDoc, titleHeader, headerDocId) {
  const inner = extractArticleInnerByDataDoc(dataDoc);
  const sigMatch = inner.match(
    /<div class="doc-signature">([\s\S]*?)<\/div>\s*<\/article>/,
  );
  let body = inner;
  let signature;
  if (sigMatch) {
    body = inner.slice(0, inner.indexOf('<div class="doc-signature">')).trim();
    const sigLine = inner.match(
      /<div class="sig-line">([\s\S]*?)<\/div>/,
    );
    const sigName = inner.match(
      /<div class="sig-name">([^<]*)<\/div>/,
    );
    signature = {
      role: sigLine ? sigLine[1].replace(/<br\s*\/?>/g, "\n").trim() : "",
      name: sigName ? sigName[1].trim() : "",
    };
  }
  const metaStart = body.indexOf("<dl class=\"doc-meta\"");
  let meta = [];
  let rest = body;
  if (metaStart !== -1) {
    const metaEnd = body.indexOf("</dl>", metaStart) + 5;
    meta = parseMetaDl(body.slice(metaStart, metaEnd));
    rest = body.slice(metaEnd).trim();
  }
  const h3start = rest.indexOf("<h3");
  let main = rest;
  if (h3start === -1 && rest.includes("<div style=")) main = rest;
  return {
    id,
    docId,
    title: titleHeader,
    meta,
    body: main,
    signature,
  };
}

const forensicsInnerAutopsy = extractArticleInnerByDataDoc("autopsy");
const forensicsInnerScene = extractArticleInnerByDataDoc("scene");

function forensicDoc(dataDoc, id, title, docIdLine) {
  const inner = extractArticleInnerByDataDoc(dataDoc);
  const body = innerFromDocHeaderToSignature(inner);
  const sigLine = inner.match(/<div class="sig-line">([\s\S]*?)<\/div>/);
  const sigName = inner.match(/<div class="sig-name">([^<]*)<\/div>/);
  const metaStart = inner.indexOf("<dl class=\"doc-meta\"");
  let meta = [];
  let rest = body;
  if (metaStart !== -1) {
    const metaEnd = inner.indexOf("</dl>", metaStart) + 5;
    meta = parseMetaDl(inner.slice(metaStart, metaEnd));
    rest = inner.slice(metaEnd).replace(/<div class="doc-signature">[\s\S]*$/, "").trim();
  }
  return {
    id,
    docId: docIdLine,
    title,
    meta,
    body: rest,
    signature: {
      role: sigLine ? sigLine[1].replace(/<br\s*\/?>/g, "\n").trim() : "",
      name: sigName ? sigName[1].trim() : "",
    },
  };
}

const forensics = [
  forensicDoc("autopsy", "089-B", "Otopsi Raporu", "089-B · Nevşehir Devlet Hastanesi — Adli Tıp"),
  forensicDoc("scene", "089-A", "Olay Yeri Raporu", "089-A · Olay Yeri İnceleme"),
];

function documentFromDoc(dataDoc, id, fileTitle, docIdLine) {
  const inner = extractArticleInnerByDataDoc(dataDoc);
  const metaStart = inner.indexOf("<dl class=\"doc-meta\"");
  let meta = [];
  let rest = inner;
  if (metaStart !== -1) {
    const metaEnd = inner.indexOf("</dl>", metaStart) + 5;
    meta = parseMetaDl(inner.slice(metaStart, metaEnd));
    rest = inner.slice(metaEnd).replace(/<div class="doc-signature">[\s\S]*$/, "").trim();
  } else {
    rest = inner.replace(/<div class="doc-signature">[\s\S]*$/, "").trim();
    rest = rest.replace(/^[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/m, "").trim();
    const afterHeader = rest.indexOf("</div></div>");
  }
  const sigBlock = inner.match(/<div class="doc-signature">([\s\S]*?)<\/div>\s*<\/article>/);
  let signature;
  if (sigBlock) {
    const sigLine = sigBlock[0].match(/<div class="sig-line">([\s\S]*?)<\/div>/);
    const sigName = sigBlock[0].match(/<div class="sig-name">([^<]*)<\/div>/);
    signature = {
      role: sigLine ? sigLine[1].replace(/<br\s*\/?>/g, "\n").trim() : "",
      name: sigName ? sigName[1].trim() : "",
    };
  }
  const headerCut = inner.indexOf("</div></div></div>");
  let bodyOnly = inner;
  if (headerCut !== -1) {
    const afterHeader = inner.indexOf(">", inner.indexOf("doc-stamp-area")) + 1;
    const endStamp = inner.indexOf("</div></div>", inner.indexOf("doc-stamp-area")) + 12;
    bodyOnly = inner.slice(endStamp).replace(/<div class="doc-signature">[\s\S]*$/, "").trim();
  }
  if (metaStart !== -1) {
    const metaEnd = inner.indexOf("</dl>", metaStart) + 5;
    bodyOnly = inner.slice(metaEnd).replace(/<div class="doc-signature">[\s\S]*$/, "").trim();
  } else {
    const hs = inner.indexOf("</div></div>", inner.indexOf("doc-header"));
    const he = inner.indexOf("</div>", inner.indexOf("doc-stamp-area"));
    const endHead = inner.indexOf("</div></div>", inner.indexOf("doc-header")) + 14;
    bodyOnly = inner.slice(endHead).replace(/<div class="doc-signature">[\s\S]*$/, "").trim();
  }
  return {
    id,
    docId: docIdLine,
    title: fileTitle,
    meta,
    body: bodyOnly,
    signature,
  };
}

// Simpler doc extractor: everything after closing doc-header second column through signature
function extractDocBody(dataDoc) {
  const inner = extractArticleInnerByDataDoc(dataDoc);
  const sigIdx = inner.indexOf('<div class="doc-signature">');
  const main = sigIdx === -1 ? inner : inner.slice(0, sigIdx).trim();
  const m = main.match(/doc-stamp-area[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/);
  if (m && m.index !== undefined) {
    return main.slice(m.index + m[0].length).trim();
  }
  const dlStart = main.indexOf('<dl class="doc-meta"');
  if (dlStart !== -1) {
    const dlEnd = main.indexOf("</dl>", dlStart) + 5;
    return main.slice(dlEnd).trim();
  }
  return main;
}

function extractDocSig(dataDoc) {
  const inner = extractArticleInnerByDataDoc(dataDoc);
  const sigLine = inner.match(/<div class="sig-line">([\s\S]*?)<\/div>/);
  const sigName = inner.match(/<div class="sig-name">([^<]*)<\/div>/);
  if (!sigLine || !sigName) return undefined;
  return {
    role: sigLine[1].replace(/<br\s*\/?>/g, "\n").trim(),
    name: sigName[1].trim(),
  };
}

function extractDocMeta(dataDoc) {
  const inner = extractArticleInnerByDataDoc(dataDoc);
  const metaStart = inner.indexOf('<dl class="doc-meta"');
  if (metaStart === -1) return [];
  const metaEnd = inner.indexOf("</dl>", metaStart) + 5;
  return parseMetaDl(inner.slice(metaStart, metaEnd));
}

// Rebuild documents with clean extractDocBody
const documents = [
  {
    id: "089-K",
    docId: "089-K · Dijital Adli İnceleme",
    title: "WhatsApp Yazışmaları — İpek ↔ Alp",
    meta: [],
    body: extractDocBody("whatsapp1"),
    signature: extractDocSig("whatsapp1"),
  },
  {
    id: "089-L",
    docId: "089-L · Dijital Adli İnceleme",
    title: "WhatsApp — Defne → Ceren (6 Haziran)",
    meta: [],
    body: extractDocBody("whatsapp2"),
    signature: extractDocSig("whatsapp2"),
  },
  {
    id: "089-M",
    docId: "089-M · GBT & Sabıka Sorgusu",
    title: "Arkaplan Kontrolü — Hakan Orbay",
    meta: extractDocMeta("hakancheck"),
    body: extractDocBody("hakancheck").replace(/^[\s\S]*?<\/dl>\s*/m, ""),
    signature: extractDocSig("hakancheck"),
  },
  {
    id: "089-N",
    docId: "089-N · GBT & Sabıka Sorgusu",
    title: "Arkaplan Kontrolü — Tolga Kıvanç",
    meta: extractDocMeta("tolgacheck"),
    body: extractDocBody("tolgacheck").replace(/^[\s\S]*?<\/dl>\s*/m, ""),
    signature: extractDocSig("tolgacheck"),
  },
  {
    id: "089-O",
    docId: "089-O · Kelebek Cave Otel — CCTV",
    title: "Güvenlik Kamerası Tam Dökümü",
    meta: [],
    body: extractDocBody("hotelcam"),
    signature: extractDocSig("hotelcam"),
  },
  {
    id: "089-P",
    docId: "089-P · Dijital Adli — Instagram DM",
    title: "Defne'nin Instagram DM Geçmişi (Son 7 Gün)",
    meta: [],
    body: extractDocBody("instagram"),
    signature: extractDocSig("instagram"),
  },
  {
    id: "089-Q",
    docId: "089-Q · Otel Kart Okuyucu Logları",
    title: "Oda Kart Hareketleri — 6-7 Haziran",
    meta: [],
    body: extractDocBody("keycards"),
    signature: extractDocSig("keycards"),
  },
  {
    id: "089-R",
    docId: "089-R · Meteoroloji Genel Müdürlüğü",
    title: "Hava Durumu — 6-7 Haziran 2024, Göreme",
    meta: [],
    body: extractDocBody("weather"),
    signature: extractDocSig("weather"),
  },
];

const technical = [
  {
    id: "089-S",
    docId: "089-S · GSM Baz İstasyonu Verileri",
    title: "Sinyal Geçmişi — Tüm Şüpheliler",
    meta: [],
    body: extractDocBody("gsm"),
    signature: extractDocSig("gsm"),
  },
  {
    id: "089-T",
    docId: "089-T · Araç GPS Kaydı",
    title: "Alp Erdoğan — ATV Firması Araç Takip",
    meta: [],
    body: extractDocBody("gps"),
    signature: extractDocSig("gps"),
  },
  {
    id: "089-U",
    docId: "089-U · Adli Genetik Laboratuvarı",
    title: "DNA Eşleşme Raporu — Nihai",
    meta: extractDocMeta("dna"),
    body: extractDocBody("dna").replace(/^[\s\S]*?<\/dl>\s*/m, ""),
    signature: extractDocSig("dna"),
  },
];

// timeline
const timelineSection = sliceBetween(html, 'id="timeline">', "</section>");
const tlItems = [...timelineSection.matchAll(/<div class="tl-item([^"]*)">[\s\S]*?<div class="tl-time">([^<]*)<\/div><div class="tl-event">([^<]*)<\/div><div class="tl-source">([^<]*)<\/div><\/div>/g)];
const timeline = tlItems.map((m, i) => ({
  id: `tl089-${i}`,
  time: m[2].trim(),
  event: m[3].trim(),
  source: m[4].trim(),
  critical: m[1].includes("critical"),
}));

// Fix testimonies: use metaRows when only Tarih+Not
for (const t of testimonies) {
  if (t.id === "089-C2" || t.id === "089-D2" || t.id === "089-F2") {
    const inner = extractArticleInnerByDataDoc(
      t.id === "089-C2" ? "ipek2" : t.id === "089-D2" ? "ceren2" : "alp2",
    );
    const metaStart = inner.indexOf('<dl class="doc-meta"');
    const metaEnd = inner.indexOf("</dl>", metaStart) + 5;
    t.metaRows = parseMetaDl(inner.slice(metaStart, metaEnd));
  } else {
    delete t.metaRows;
  }
}

const solutionHtml = (
  html.match(/<div class="solution-content"[^>]*>[\s\S]*?<article class="verdict">([\s\S]*?)<\/article>/)?.[1] ?? ""
).trim();

const briefArticle = extractArticleInnerByDataDoc("brief");
const briefMeta = parseMetaDl(
  briefArticle.slice(
    briefArticle.indexOf('<dl class="doc-meta"'),
    briefArticle.indexOf("</dl>") + 5,
  ),
);
const briefAfterDl = briefArticle
  .slice(briefArticle.indexOf("</dl>") + 5)
  .replace(/<div class="doc-signature">[\s\S]*$/, "")
  .trim();
const briefSections = [];
for (const chunk of briefAfterDl.split(/(?=<h3>)/)) {
  if (!chunk.trim()) continue;
  const titleM = chunk.match(/^<h3>([^<]+)<\/h3>/);
  if (!titleM) continue;
  briefSections.push({
    title: titleM[1].trim(),
    body: chunk.slice(titleM[0].length).trim(),
  });
}

const payload = {
  briefMetaPairs: briefMeta.map(({ label, value }) => ({ label, value })),
  briefSections,
  testimonies,
  forensics,
  documents,
  technical,
  timeline,
  solutionHtml,
};

fs.writeFileSync(
  path.join(root, "src/data/cases/089-payload.json"),
  JSON.stringify(payload, null, 0),
  "utf8",
);
console.log("Wrote 089-payload.json", {
  testimonies: testimonies.length,
  documents: documents.length,
  timeline: timeline.length,
});
