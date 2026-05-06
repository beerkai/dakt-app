export type Difficulty = "Kolay" | "Orta" | "Zor";

export type CaseStatus = "active" | "coming-soon";

export type TabId =
  | "brief"
  | "supheliler"
  | "ifadeler"
  | "adli-tip"
  | "deliller"
  | "belgeler"
  | "teknik"
  | "zaman-cizelgesi"
  | "deduction"
  | "cozum";

export type StampKind = "approved" | "denied" | "classified" | "cross";

export interface Suspect {
  id: string;
  code: string;
  name: string;
  role: string;
  quote: string;
  alibi?: string;
  motive?: string;
  status?: string;
}

export interface Testimony {
  id: string;
  suspectName: string;
  date: string;
  birth: string;
  occupation: string;
  address: string;
  paragraphs: string[];
  callouts?: string[];
  signature: string;
  /** Varsayılan: "İfade Sahibi · Baskısız" */
  signatureRole?: string;
  headerDocId: string;
  title: string;
  stamps: StampKind[];
}

export interface Evidence {
  id: string;
  tag: string;
  title: string;
  description: string;
  details: Array<{ label: string; value: string }>;
}

export interface Document {
  id: string;
  docId?: string;
  title: string;
  meta: Array<{ label: string; value: string }>;
  body: string;
  signature?: { role: string; name: string };
  stamps: StampKind[];
}

export interface TimelineEvent {
  id: string;
  time: string;
  event: string;
  source: string;
  critical?: boolean;
}

export interface DeductionItem {
  pin: boolean;
  text: string;
}

export interface DeductionBoard {
  contradictions: DeductionItem[];
  elimination: DeductionItem[];
}

export interface VerdictData {
  perpetratorId: string;
  perpetratorName: string;
  murderTime: string;
  murderLocation: string;
  murderWeapon: string;
  motivation: string;
  evidenceList: string[];
  conclusion: string;
  wrongAnswerMessage: string;
  /** Tam çözüm zarfı belgesi (article içi HTML) */
  solutionHtml: string;
  solutionDocLabel?: string;
}

export interface CaseData {
  id: string;
  codename: string;
  fullTitle: string;
  status: CaseStatus;
  difficulty: Difficulty;
  recommendedPlayers: string;
  location: string;
  victim: string;
  date: string;
  shortSummary: string;
  enabledTabs: TabId[];
  brief: {
    subtitle: string;
    metaPairs: Array<{ label: string; value: string }>;
    sections: Array<{ title: string; body: string }>;
    stamps: StampKind[];
    signature?: { role: string; name: string };
  };
  suspects: Suspect[];
  testimonies: Testimony[];
  forensics: Document[];
  evidence: Evidence[];
  documents?: Document[];
  technical: Document[];
  /** 042/067 sesli mesaj bloğu (Waveform + transkript) */
  technicalAudio?: {
    label: string;
    durationLine: string;
    transcript: string[];
  };
  timeline: TimelineEvent[];
  /** Zaman çizelgesi kartlarının başlangıç sırası (id listesi) */
  timelineInitialOrder: string[];
  deduction: DeductionBoard;
  verdict: VerdictData;
  /** Sayfa başlığı sağ üst şerit (örn. 042-A · Olay Yeri) */
  tabSectionSub: Partial<Record<TabId, string>>;
}
