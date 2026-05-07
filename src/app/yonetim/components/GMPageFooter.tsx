interface GMPageFooterProps {
  section: string;
  page: string;
}

function barcodeSerial(page: string, section: string): number {
  const p = parseInt(page, 10);
  const pagePart = Number.isFinite(p) ? p : 0;
  let h = 0;
  for (let i = 0; i < section.length; i++) {
    h = (h * 31 + section.charCodeAt(i)) >>> 0;
  }
  return (pagePart * 1009 + h) % 9000 + 1000;
}

export default function GMPageFooter({ section, page }: GMPageFooterProps) {
  const today = new Date();
  const dateStr = today
    .toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    })
    .replace(/\./g, "/");
  const serial = barcodeSerial(page, section);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 60,
          paddingTop: 20,
        }}
      >
        <div>
          <span className="gm-barcode" />
          <span className="gm-barcode-label">
            DAKT — 2026 — X — {page} — {serial}
          </span>
        </div>
        <div className="gm-filed-stamp gm-filed-stamp-large">
          FILED
          <br />
          {dateStr}
        </div>
      </div>

      <footer className="gm-page-footer">
        <span>ARCHIVE_DIV // {section}_REGISTRY</span>
        <span className="gm-page-footer-center">PAGE {page} / 06</span>
        <span className="gm-page-footer-right">SUBSCRIPTION ACTIVE</span>
      </footer>
    </>
  );
}
