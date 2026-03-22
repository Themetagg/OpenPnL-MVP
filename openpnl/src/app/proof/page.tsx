import ThesisCard, { ThesisAction, ThesisStatus } from "../../components/ThesisCard";
import { seededTheses } from "../../lib/seedData";
import { realProofs } from "../../lib/realProofs";

export default function ProofPage() {
  const proofTheses = [
    ...seededTheses.filter((t) => t.verified),
    ...realProofs.map((t) => ({
      id: t.id,
      author: t.author,
      action: t.action as ThesisAction,
      amountUsd: t.amountUsd,
      asset: t.asset,
      entryPrice: t.entryPrice,
      thesisPreview: t.thesisBody,
      status: t.status as ThesisStatus,
      verified: t.verified,
      createdAt: t.createdAt,
    })),
  ];

  return (
    <main className="min-h-screen bg-[#26443b] text-white px-8 py-8 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Proof</h1>
          <p className="text-sm text-white/80 max-w-xl">
            Theses with attached proof. In the MVP, verification means a proof
            object exists (tx hash, explorer link, external URL, or a
            Fomolt-style reference), not deep audited parsing.
          </p>
        </header>
        <div className="space-y-4 max-w-2xl">
          {proofTheses.map((t) => (
            <ThesisCard key={t.id} {...t} />
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
