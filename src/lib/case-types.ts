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
  | "deduction"
  | "cozum";

export type PlayerStampKind = "supheli" | "ele-alindi" | "elendi";

export const PLAYER_STAMP_ORDER: PlayerStampKind[] = [
  "supheli",
  "ele-alindi",
  "elendi",
];

export const PLAYER_STAMP_BTN_LABEL: Record<PlayerStampKind, string> = {
  supheli: "● ŞÜPHELİ",
  "ele-alindi": "✓ ELE ALINDI",
  elendi: "× ELENDİ",
};

export const PLAYER_STAMP_OVERLAY: Record<PlayerStampKind, string> = {
  supheli: "● ŞÜPHELİ",
  "ele-alindi": "✓ ELE ALINDI",
  elendi: "× ELENDİ",
};

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
  /** Çift oturum ifadeleri — sıralama ve (isteğe bağlı) başlık için */
  session?: 1 | 2 | 3;
  /** 2. oturum gibi özel meta satırları (varsayılan Tarih/Doğum/Meslek/Adres yerine) */
  metaRows?: Array<{ label: string; value: string }>;
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

export type MessagePlatform =
  | "whatsapp"
  | "imessage"
  | "instagram"
  | "email"
  | "twitch";

export interface MessageParticipant {
  name: string;
  isVictim?: boolean;
  isPerpetrator?: boolean;
  avatar?: string;
  /** Balon sohbetlerde sağ taraf (“bu telefonun kullanıcısı”). Thread başına tam bir kişide true olmalı (whatsapp / imessage / instagram / twitch). */
  isUser?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  time: string;
  date?: string;
  status?: "sent" | "delivered" | "read";
  type?: "text" | "voice" | "image-placeholder" | "system";
  voiceDuration?: string;
  systemText?: string;
  emailSubject?: string;
  emailFrom?: string;
  emailTo?: string;
}

export interface MessageThread {
  id: string;
  title: string;
  caseId: string;
  platform: MessagePlatform;
  participants: MessageParticipant[];
  messages: ChatMessage[];
  meta?: {
    extractedDate?: string;
    deviceInfo?: string;
    /** HTML içerebilir (çıkarsama vurguları) */
    forensicNote?: string;
  };
  /** Belge imzası (dijital evrak altbilgisi) */
  footerSignature?: { role: string; name: string };
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
    signature?: { role: string; name: string };
  };
  suspects: Suspect[];
  testimonies: Testimony[];
  forensics: Document[];
  evidence: Evidence[];
  documents?: Document[];
  /** Sohbet / DM / e-posta — belgeler sekmesinde ayrı component ile */
  messageThreads?: MessageThread[];
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

/** İstemci bileşenlerine geçirilebilen, çözüm içermeyen vaka kimliği. */
export type CaseIdentity = Pick<CaseData, "id" | "codename">;

/** Katalog kartı için sunucuda hesaplanan özet. */
export interface CaseCatalogItem {
  id: string;
  codename: string;
  location: string;
  shortSummary: string;
  recommendedPlayers: string;
  difficulty: Difficulty;
  active: boolean;
  tabCount: number;
  docCount: number;
  suspectCount: number;
}
