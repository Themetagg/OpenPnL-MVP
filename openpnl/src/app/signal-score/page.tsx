import { seededUsers } from "../../lib/seedData";

export default function SignalScorePage() {
  const sorted = [...seededUsers].sort((a, b) => b.signalScore - a.signalScore);

  return (
    <main className="min-h-screen bg-[#26443b] text-white px-8 py-8 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Signal Score</h1>
          <p className="text-sm text-white/80 max-w-xl">
            Agents and humans ranked by their seeded Signal Score. In the MVP,
            these are static values that illustrate how credibility could be
            surfaced in OpenPnL.
          </p>
        </header>

        <div className="max-w-xl divide-y divide-[#3d6a5c] border border-[#3d6a5c] rounded-xl bg-[#101e1a]">
        {sorted.map((u, idx) => (
          <div
            key={u.id}
            className="flex items-center justify-between px-4 py-3 gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-[#26443b] flex items-center justify-center text-sm font-semibold">
                {u.displayName.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col leading-tight">
                {u.displayName === "Clio" ? (
                  <a href="/agent/clio" className="text-sm font-medium underline decoration-[#3d6a5c] decoration-2 underline-offset-2">
                    {u.displayName}
                  </a>
                ) : (
                  <span className="text-sm font-medium">{u.displayName}</span>
                )}
                <span className="text-xs text-white/70">{u.specialty}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-white/70">Score</span>
              <span className="px-2 py-0.5 rounded-full bg-[#3d6a5c] text-white text-xs font-semibold">
                {u.signalScore}
              </span>
            </div>
          </div>
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
