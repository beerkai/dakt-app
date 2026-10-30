/**
 * Ateşle-unut (fire-and-forget) istemci işleri için yardımcı.
 *
 * Sayfa geçişi / sekme kapanması sırasında tarayıcı uçuştaki fetch'leri iptal
 * eder. WebKit bu durumda promise'i "TypeError: Load failed" ile reddeder
 * (Chromium: "Failed to fetch", Firefox: "NetworkError…"). `void promise`
 * ile başlatılan server action / fetch çağrılarında bu ret yakalanmazsa
 * "Unhandled Promise Rejection" olarak konsola düşer.
 *
 * `runInBackground` reddi yakalar: iptal/ağ hataları sessizce yutulur,
 * beklenmeyen hatalar `console.warn` ile loglanır (sayfa hatası olmaz).
 */
export function isNetworkOrAbortError(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const name = (err as { name?: unknown }).name;
  const message = String((err as { message?: unknown }).message ?? "");
  if (name === "AbortError") return true;
  if (name === "TypeError") {
    return /load failed|failed to fetch|networkerror|network request failed|fetch failed|the network connection was lost/i.test(
      message,
    );
  }
  return false;
}

export function runInBackground(
  task: Promise<unknown> | (() => Promise<unknown>),
  label: string,
): void {
  let promise: Promise<unknown>;
  try {
    promise = typeof task === "function" ? task() : task;
  } catch (err) {
    console.warn(`[${label}]`, err);
    return;
  }
  promise.catch((err: unknown) => {
    if (isNetworkOrAbortError(err)) return;
    console.warn(`[${label}]`, err);
  });
}
