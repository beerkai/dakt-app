import type { ReactNode } from "react";
import "./vaka-042.css";
import { Vaka042Bar } from "./Vaka042Bar";
import { Vaka042Nav } from "./Vaka042Nav";
import { Vaka042SoloTease } from "./Vaka042SoloTease";

export const metadata = {
  title: "D.A.K.T. · Vaka 042",
  description:
    "Karaağaç dosyası — Division of Analytic Knowledge & Testimonies.",
};

export default function Vaka042Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-[1] flex min-h-full flex-1 flex-col">
      <Vaka042Bar />
      <Vaka042Nav />
      <main className="workspace flex-1">{children}</main>
      <footer className="foot">
        D.A.K.T. ·{" "}
        <em>Division of Analytic Knowledge & Testimonies</em> · dakt.app ·
        @dakt.app · jointhedakt@gmail.com
      </footer>
      <Vaka042SoloTease />
    </div>
  );
}
