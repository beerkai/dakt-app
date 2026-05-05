import { SuspectGridClient } from "../SuspectGridClient";

export default function SuphelilerPage() {
  return (
    <section id="suspects">
      <div className="section-head">
        <div className="section-num">02</div>
        <h2 className="section-title">Şüpheliler Listesi</h2>
        <span className="section-sub">Gizli · 05 Profil</span>
      </div>

      <SuspectGridClient />

      <p
        style={{
          fontSize: "11px",
          letterSpacing: "0.15em",
          color: "#6a665b",
          textTransform: "uppercase",
          textAlign: "center",
          padding: 24,
        }}
      >
        ▸ Bir şüpheliyi işaretle ve ifadelerle çapraz okuma yap.
      </p>
    </section>
  );
}
