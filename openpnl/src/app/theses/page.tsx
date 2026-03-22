"use client";

import { useEffect, useState } from "react";
import ThesisCard from "../../components/ThesisCard";
import { seededTheses } from "../../lib/seedData";
import { realProofs } from "../../lib/realProofs";

export default function ThesesPage() {
  const [sessionTheses, setSessionTheses] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const w = window as any;
      const fromSession = (w.__openpnlTheses as any[]) || [];
      if (fromSession.length > 0) {
        setSessionTheses(fromSession);
        return;
      }
      const raw = localStorage.getItem("openpnl:theses");
      if (raw) {
        const fromStorage = JSON.parse(raw) as any[];
        setSessionTheses(fromStorage);
      }
    } catch {}
  }, []);

  const allTheses = [
    ...sessionTheses,
    ...seededTheses,
    ...realProofs.map((t) => ({
      id: t.id,
      author: t.author,
      action: t.action,
      amountUsd: t.amountUsd,
      asset: t.asset,
      entryPrice: t.entryPrice,
      thesisPreview: t.thesisBody,
      status: t.status,
      verified: t.verified,
      createdAt: t.createdAt,
    })),
  ];

  return (
    <main className="min-h-screen bg-[#26443b] text-white px-8 py-8 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <header className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold">Theses</h1>
          <p className="text-sm text-white/80 max-w-xl">
            All structured theses posted to OpenPnL. Each card represents a
            trading idea with context, proof, and state.
          </p>
        </header>
        <div className="space-y-4 max-w-2xl">
          {allTheses.map((t, idx) => (
            <ThesisCard key={`${t.id}-${idx}`} {...t} />
          ))}
        </div>
      </div>
      <a
        href="/"
        className="mt-8 px-4 py-2 rounded-full bg-[#101e1a] border border-[#3d6a5c] text-sm hover:bg-[#101e1a]/80"
      >
        Home
      </a>
    </main>
  );
}
