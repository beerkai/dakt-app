"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { setCaseStatus } from "../actions";

interface Props {
  caseId: string;
  currentStatus: string;
}

const statusOptions = [
  { value: "missing", label: "KAYIT YOK", color: "var(--gm-warn)" },
  { value: "draft", label: "TASLAK", color: "var(--gm-meta)" },
  { value: "test", label: "TEST", color: "var(--gm-stamp-blue)" },
  { value: "published", label: "YAYINDA", color: "var(--gm-stamp-green)" },
  { value: "archived", label: "ARŞİV", color: "var(--gm-meta-light)" },
];

export default function CaseStatusControl({ caseId, currentStatus }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(currentStatus);

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value;
    if (newStatus === status || newStatus === "missing") return;

    if (
      !confirm(
        `Vaka ${caseId} durumunu "${statusOptions.find((o) => o.value === newStatus)?.label}" yapmak istiyor musun?`,
      )
    ) {
      e.target.value = status;
      return;
    }

    setLoading(true);
    const result = await setCaseStatus(caseId, newStatus);
    if (result?.error) {
      alert("Hata: " + result.error);
      e.target.value = status;
    } else {
      setStatus(newStatus);
      router.refresh();
    }
    setLoading(false);
  }

  const current = statusOptions.find((o) => o.value === status);

  return (
    <select
      className="gm-select"
      value={status}
      onChange={handleChange}
      disabled={loading}
      style={{
        borderColor: current?.color ?? "var(--gm-line)",
        color: current?.color ?? "var(--gm-text)",
        cursor: loading ? "wait" : "pointer",
        opacity: loading ? 0.5 : 1,
      }}
    >
      {statusOptions.map((opt) => (
        <option key={opt.value} value={opt.value} disabled={opt.value === "missing"}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
