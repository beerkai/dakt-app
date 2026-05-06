import type { MessageThread } from "@/lib/case-types";

import payload from "./114-payload.json";

const raw = payload.emailThread as MessageThread;

/** 114-L — e-posta; meta.forensicNote kullanıcı spesifikasyonuna göre. */
export const messageThreads114: MessageThread[] = [
  {
    ...raw,
    meta: {
      ...raw.meta,
      forensicNote:
        "Vedat Kaplan'ın iş hesabından mahkeme kararıyla çıkarılan giden kutusu. Son 7 günü kapsar.",
    },
  },
];
