import type { ReactNode } from "react";
import type {
  ChatMessage,
  MessageParticipant,
  MessagePlatform,
  MessageThread as MessageThreadT,
} from "@/lib/case-types";

function PlatformBadge({ platform }: { platform: MessagePlatform }) {
  if (platform === "whatsapp") {
    return (
      <div
        className="flex size-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
        style={{ background: "#25D366" }}
        aria-hidden
      >
        W
      </div>
    );
  }
  if (platform === "instagram") {
    return (
      <div
        className="flex size-9 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
        style={{
          background: "linear-gradient(215deg, #cc2366 0%, #bc1888 35%, #5851db 100%)",
        }}
        aria-hidden
      >
        IG
      </div>
    );
  }
  if (platform === "imessage") {
    return (
      <div
        className="flex size-9 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
        style={{ background: "#007AFF" }}
        aria-hidden
      >
        iM
      </div>
    );
  }
  if (platform === "twitch") {
    return (
      <div
        className="flex size-9 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
        style={{ background: "#9146FF" }}
        aria-hidden
      >
        TV
      </div>
    );
  }
  return (
    <div
      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#555] text-[14px] font-bold text-[var(--paper)]"
      aria-hidden
    >
      @
    </div>
  );
}

function participantBySender(
  participants: MessageParticipant[],
  sender: string,
): MessageParticipant | undefined {
  return participants.find((p) => p.name === sender);
}

function isFromUserPerspective(
  participants: MessageParticipant[],
  sender: string,
): boolean {
  const u = participants.find((p) => p.isUser);
  return u != null && sender === u.name;
}

function WhatsAppTicks({ status }: { status?: ChatMessage["status"] }) {
  if (status === "read") {
    return <span className="text-[#53bdeb]">✓✓</span>;
  }
  if (status === "delivered") {
    return <span className="text-[rgba(255,255,255,0.45)]">✓✓</span>;
  }
  return <span className="text-[rgba(255,255,255,0.45)]">✓</span>;
}

export function MessageThread({ thread }: { thread: MessageThreadT }) {
  const { platform, participants, messages, meta, title, caseId } = thread;
  const isEmail = platform === "email";
  const counterparts = participants.filter((p) => !p.isUser);
  const counterpartLine =
    counterparts.length > 0
      ? counterparts.map((p) => p.name).join(" · ")
      : participants.map((p) => p.name).join(" · ");
  const showSenderAboveBubble = participants.length > 2;
  const headerTitle = isEmail ? "E-posta Yazışması" : counterpartLine;

  let prevDate: string | undefined;

  return (
    <article
      className="message-thread-outer border border-[var(--bordeaux)] bg-[var(--paper)]/5"
      aria-label={title}
    >
      <div
        className="border-b border-[var(--bordeaux)] px-3 py-2 md:px-4 md:py-2"
        style={{ boxSizing: "border-box" }}
      >
        <p
          className="m-0 text-[11px] font-medium uppercase leading-snug tracking-[0.28em] text-[var(--kraft)] [font-family:var(--font-jetbrains-mono),ui-monospace,monospace]"
        >
          📋 ADLİ TIP DİJİTAL EVİDANS · {title}
        </p>
      </div>

      <div className="border-b border-[rgba(255,255,255,0.08)] bg-[var(--anthracite)] px-3 py-2 md:px-4 md:py-3">
        <div className="mx-auto flex max-w-[600px] items-center gap-3">
          <PlatformBadge platform={platform} />
          <div className="min-w-0 flex-1">
            <p className="m-0 truncate text-base font-semibold leading-tight text-[var(--paper)] [font-family:var(--font-cormorant),serif] md:text-[17px]">
              {headerTitle}
            </p>
            {!isEmail ? (
              <p
                className="mt-1 text-[11px] leading-snug tracking-[0.04em] text-[var(--kraft-dark)] [font-family:var(--font-special-elite),monospace]"
              >
                son görülme: dün 23:42
              </p>
            ) : null}
          </div>
          {!isEmail ? (
            <div
              className="hidden shrink-0 gap-2 text-[15px] text-[var(--kraft-dark)] opacity-60 sm:flex"
              aria-hidden
            >
              <span>📞</span>
              <span>🎥</span>
            </div>
          ) : null}
        </div>
      </div>

      {meta?.forensicNote ? (
        <div
          className="border-b border-[rgba(255,255,255,0.08)] border-l-[3px] border-l-[var(--bordeaux)] bg-[var(--anthracite-2)] px-3.5 py-2.5 md:px-[14px] md:py-2.5"
        >
          <p
            className={`m-0 text-xs leading-relaxed tracking-[0.06em] text-[var(--body-text)] [font-family:var(--font-special-elite),monospace]`}
          >
            📋{" "}
            <span
              dangerouslySetInnerHTML={{ __html: meta.forensicNote }}
            />
          </p>
        </div>
      ) : null}

      <div
        className="message-thread-chat-bg px-3 py-4 md:px-4 md:py-4"
        style={{
          backgroundColor: "var(--ink)",
          backgroundImage: `
            radial-gradient(ellipse 120% 80% at 50% -20%, rgba(201, 180, 138, 0.06), transparent 55%),
            repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 4px)
          `,
        }}
      >
        <div className="mx-auto w-full max-w-[600px] space-y-2">
          {messages.map((msg, idx) => {
            if (msg.type === "system") {
              return (
                <p
                  key={msg.id}
                  className="py-2 text-center text-[13px] italic text-[var(--subtitle-text)] [font-family:var(--font-special-elite),monospace]"
                >
                  {msg.systemText ?? msg.text}
                </p>
              );
            }

            if (isEmail) {
              const prevMsg = idx > 0 ? messages[idx - 1] : undefined;
              const emailDayDivider =
                msg.date != null && msg.date !== prevMsg?.date ? msg.date : null;
              return (
                <div key={msg.id} className="space-y-2">
                  {emailDayDivider ? (
                    <div
                      className="flex items-center justify-center gap-2 py-2 text-[11px] italic text-[var(--meta-label)] [font-family:var(--font-cormorant),serif]"
                      aria-hidden
                    >
                      <span className="opacity-50">───</span>
                      {emailDayDivider}
                      <span className="opacity-50">───</span>
                    </div>
                  ) : null}
                  <div className="border-b border-[rgba(255,255,255,0.1)] px-3 py-3.5 md:px-4 md:py-3.5">
                    <p
                      className={`mb-2 text-[12px] uppercase tracking-[0.12em] text-[var(--kraft-dark)] [font-family:var(--font-jetbrains-mono),ui-monospace,monospace]`}
                    >
                      Kimden: {msg.emailFrom ?? msg.sender} · {msg.date} ·{" "}
                      {msg.time}
                    </p>
                  {msg.emailTo ? (
                    <p className="mb-2 text-[11px] text-[var(--meta-label)] [font-family:var(--font-jetbrains-mono),monospace]">
                      Kime: {msg.emailTo}
                    </p>
                  ) : null}
                  {msg.emailSubject ? (
                    <p className="mb-2 text-sm font-bold leading-snug text-[var(--paper)]">
                      {msg.emailSubject}
                    </p>
                  ) : null}
                  <div
                    className="text-[13px] leading-[1.7] text-[var(--body-text)] [font-family:var(--font-jetbrains-mono),ui-monospace,monospace]"
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {msg.text}
                  </div>
                </div>
                </div>
              );
            }

            const dayChanged =
              msg.date != null && msg.date !== prevDate
                ? msg.date
                : null;
            if (msg.date != null) prevDate = msg.date;

            const fromUser = isFromUserPerspective(participants, msg.sender);
            const pMeta = participantBySender(participants, msg.sender);
            const victim = pMeta?.isVictim === true;

            let bubble: ReactNode = null;

            if (msg.type === "voice") {
              bubble = (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="flex h-8 items-end gap-0.5" aria-hidden>
                    {[40, 65, 35, 80, 45].map((h, i) => (
                      <span
                        key={i}
                        className="w-0.5 rounded-sm bg-[var(--kraft)]"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </span>
                  <span className="text-[var(--kraft-light)]">
                    ▶ {msg.voiceDuration ?? "0:00"}
                  </span>
                  {msg.text ? (
                    <p className="w-full text-[13px] italic leading-snug text-[var(--subtitle-text)]">
                      Transkript: {msg.text}
                    </p>
                  ) : null}
                </div>
              );
            } else if (msg.type === "image-placeholder") {
              bubble = (
                <div>
                  <div className="mb-2 rounded border border-[rgba(255,255,255,0.12)] bg-[rgba(0,0,0,0.35)] px-4 py-8 text-center text-[var(--subtitle-text)]">
                    📷 [Fotoğraf eki]
                  </div>
                  {msg.text ? (
                    <p className="text-[14px] text-[var(--body-text)]">
                      {msg.text}
                    </p>
                  ) : null}
                </div>
              );
            } else {
              bubble = (
                <p className="m-0 whitespace-pre-wrap text-[14px] leading-relaxed text-[var(--paper)]">
                  {msg.text}
                </p>
              );
            }

            const alignRight = fromUser;
            const bubbleRadius =
              platform === "whatsapp"
                ? alignRight
                  ? "rounded-[12px_0_12px_12px]"
                  : "rounded-[0_12px_12px_12px]"
                : "rounded-[18px]";

            const bubbleBg =
              platform === "instagram"
                ? alignRight
                  ? {
                      background:
                        "linear-gradient(135deg, #cc2366 0%, #5851db 100%)",
                    }
                  : { background: "#262626" }
                : platform === "imessage"
                  ? alignRight
                    ? { background: "#007aff" }
                    : { background: "#3b3b3d" }
                  : platform === "twitch"
                    ? alignRight
                      ? { background: "#9146FF" }
                      : { background: "#18181B" }
                    : alignRight
                      ? { background: "#005c4b" }
                      : { background: "#1f2c33" };

            return (
              <div key={msg.id} className="space-y-2">
                {dayChanged ? (
                  <div
                    className="flex items-center justify-center gap-2 py-2 text-[11px] italic text-[var(--meta-label)] [font-family:var(--font-cormorant),serif]"
                    aria-hidden
                  >
                    <span className="opacity-50">───</span>
                    {dayChanged}
                    <span className="opacity-50">───</span>
                  </div>
                ) : null}
                <div
                  className={`flex ${alignRight ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`w-full max-w-[85%] md:max-w-[75%] ${alignRight ? "items-end" : "items-start"}`}
                  >
                    {showSenderAboveBubble ? (
                      <div className="mb-1 flex items-center gap-1.5 px-1">
                        {victim ? (
                          <span
                            className="inline-block size-1.5 shrink-0 rounded-full bg-[var(--bordeaux-bright)]"
                            title="Kurban"
                            aria-hidden
                          />
                        ) : null}
                        <span className="text-[11px] text-[var(--kraft-dark)] [font-family:var(--font-jetbrains-mono),monospace]">
                          {msg.sender}
                        </span>
                      </div>
                    ) : victim ? (
                      <div className="mb-0.5 flex items-center gap-1 px-1">
                        <span
                          className="inline-block size-1.5 shrink-0 rounded-full bg-[var(--bordeaux-bright)]"
                          title="Kurban"
                          aria-hidden
                        />
                      </div>
                    ) : null}
                    <div
                      className={`inline-block min-w-0 px-3 py-2 shadow-sm ${bubbleRadius}`}
                      style={bubbleBg}
                    >
                      {bubble}
                      <div
                        className={`mt-1 flex items-center justify-end gap-1 text-[11px] opacity-60`}
                      >
                        <span className="tabular-nums">{msg.time}</span>
                        {platform === "whatsapp" && alignRight ? (
                          <WhatsAppTicks status={msg.status} />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {thread.footerSignature ? (
        <div className="border-t border-[rgba(255,255,255,0.08)] bg-[var(--anthracite)] px-4 py-3">
          <div className="mx-auto max-w-[600px] text-[10px] text-[var(--meta-label)] [font-family:var(--font-jetbrains-mono),monospace]">
            <div className="opacity-90">{thread.footerSignature.role}</div>
            <div className="text-[var(--kraft-dark)]">
              {thread.footerSignature.name}
            </div>
          </div>
        </div>
      ) : null}

      {meta?.deviceInfo ? (
        <p className="m-0 border-t border-[var(--rule)] px-3 py-2 text-[9px] uppercase tracking-[0.14em] text-[var(--meta-label)] [font-family:var(--font-jetbrains-mono),monospace]">
          {meta.deviceInfo}
        </p>
      ) : null}

      <span className="sr-only">Vaka {caseId}</span>
    </article>
  );
}
