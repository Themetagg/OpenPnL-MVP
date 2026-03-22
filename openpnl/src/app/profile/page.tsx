"use client";

import { useEffect, useState } from "react";
import ThesisCard from "../../components/ThesisCard";
import { seededTheses } from "../../lib/seedData";

export default function ProfilePage() {
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [twitter, setTwitter] = useState("");
  const [discord, setDiscord] = useState("");
  const [telegram, setTelegram] = useState("");
  const [linkedAgentWallet, setLinkedAgentWallet] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Local-only theses created by this wallet during the current session
  const [myTheses, setMyTheses] = useState<any[]>([]);

  const loadThesesFromStorage = (wallet: string) => {
    try {
      const raw = localStorage.getItem("openpnl:theses");
      if (!raw) return [];
      const all = JSON.parse(raw) as any[];
      const lower = wallet.toLowerCase();
      return all.filter((t) => (t.wallet || "").toLowerCase() === lower);
    } catch {
      return [];
    }
  };

  const saveThesesToStorage = (all: any[]) => {
    try {
      localStorage.setItem("openpnl:theses", JSON.stringify(all));
    } catch {}
  };
  const [newAsset, setNewAsset] = useState("");
  const [newAction, setNewAction] = useState<"BUY" | "SELL">("BUY");
  const [newAmountUsd, setNewAmountUsd] = useState("");
  const [newEntryPrice, setNewEntryPrice] = useState("");
  const [newThesisBody, setNewThesisBody] = useState("");
  const [newProof, setNewProof] = useState("");

  const loadProfileFromStorage = (wallet: string) => {
    try {
      const raw = localStorage.getItem(`profile:${wallet.toLowerCase()}`);
      if (!raw) return;
      const p = JSON.parse(raw);
      setDisplayName(p.displayName ?? "");
      setTwitter(p.twitter ?? "");
      setDiscord(p.discord ?? "");
      setTelegram(p.telegram ?? "");
      setLinkedAgentWallet(p.linkedAgentWallet ?? "");
    } catch {}
  };

  useEffect(() => {
    // Optionally, try to read already-connected accounts on mount
    if (typeof window === "undefined") return;

    const eth = (window as any).ethereum;
    if (!eth) return;

    eth
      .request({ method: "eth_accounts" })
      .then((accounts: string[]) => {
        if (accounts && accounts.length > 0) {
          const addr = accounts[0];
          setAddress(addr);
          loadProfileFromStorage(addr);
          const theses = loadThesesFromStorage(addr);
          setMyTheses(theses);
        }
      })
      .catch(() => {});
  }, []);

  const saveProfileToStorage = (wallet: string) => {
    const payload = {
      displayName,
      twitter,
      discord,
      telegram,
      linkedAgentWallet,
    };
    localStorage.setItem(
      `profile:${wallet.toLowerCase()}`,
      JSON.stringify(payload)
    );
  };

  const handleConnect = async () => {
    setError(null);
    try {
      const eth = (window as any).ethereum;
      if (!eth) {
        setError("No Ethereum provider found. Please install MetaMask or a compatible wallet.");
        return;
      }
      const accounts = await eth.request({ method: "eth_requestAccounts" });
      if (accounts && accounts.length > 0) {
        const addr = accounts[0];
        setAddress(addr);
        loadProfileFromStorage(addr);
        const theses = loadThesesFromStorage(addr);
        setMyTheses(theses);
      }
    } catch (e: any) {
      setError(e?.message || "Failed to connect wallet.");
    }
  };

  const userTheses = address ? myTheses : [];

  return (
    <main className="min-h-screen bg-[#26443b] text-white px-8 py-8 flex flex-col items-center">
      <div className="w-full max-w-3xl space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Profile</h1>
          {address ? (
            <div className="text-xs text-white/80 max-w-xs text-right break-all">
              Connected wallet:
              <br />
              <span className="font-mono">
                {address}
              </span>
            </div>
          ) : (
            <button
              onClick={handleConnect}
              className="px-4 py-2 rounded-full bg-[#101e1a] border border-[#3d6a5c] text-sm hover:bg-[#101e1a]/80"
            >
              Connect Wallet
            </button>
          )}
        </header>

        {address && (
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Finish your profile</h2>
            <p className="text-sm text-white/80">
              Optionally add a display name and social links. By default your
              profile is keyed to your wallet address.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="space-y-1">
                <label className="block text-xs uppercase text-white/70">
                  Display name (optional)
                </label>
                <input
                  className="w-full rounded-md bg-[#101e1a] border border-[#3d6a5c] px-2 py-1 text-sm text-white placeholder:text-white/40"
                  placeholder="e.g. Matt / Clio-Agent / handle"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs uppercase text-white/70">
                  X / Twitter (optional)
                </label>
                <input
                  className="w-full rounded-md bg-[#101e1a] border border-[#3d6a5c] px-2 py-1 text-sm text-white placeholder:text-white/40"
                  placeholder="@handle"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs uppercase text-white/70">
                  Discord (optional)
                </label>
                <input
                  className="w-full rounded-md bg-[#101e1a] border border-[#3d6a5c] px-2 py-1 text-sm text-white placeholder:text-white/40"
                  placeholder="user#1234"
                  value={discord}
                  onChange={(e) => setDiscord(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs uppercase text-white/70">
                  Telegram (optional)
                </label>
                <input
                  className="w-full rounded-md bg-[#101e1a] border border-[#3d6a5c] px-2 py-1 text-sm text-white placeholder:text-white/40"
                  placeholder="@username"
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs uppercase text-white/70">
                  Linked agent wallet (optional)
                </label>
                <input
                  className="w-full rounded-md bg-[#101e1a] border border-[#3d6a5c] px-2 py-1 text-sm text-white placeholder:text-white/40"
                  placeholder="0x..."
                  value={linkedAgentWallet}
                  onChange={(e) => setLinkedAgentWallet(e.target.value)}
                />
              </div>
            </div>
          </section>
        )}

        {error && (
          <div className="text-sm text-red-300 border border-red-500/60 bg-red-950/60 rounded-md px-3 py-2">
            {error}
          </div>
        )}

        {address && (
          <div className="flex items-center justify-between text-sm">
            <button
              disabled={saving}
              onClick={async () => {
                if (!address) return;
                setSaving(true);
                setSaveMessage(null);
                setError(null);
                try {
                  saveProfileToStorage(address);
                  setSaveMessage("Profile saved locally.");
                } catch (e: any) {
                  setError(e?.message || "Failed to save profile.");
                } finally {
                  setSaving(false);
                }
              }}
              className="px-4 py-2 rounded-full bg-[#101e1a] border border-[#3d6a5c] text-sm hover:bg-[#101e1a]/80 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save profile"}
            </button>
            {saveMessage && (
              <span className="text-xs text-emerald-300">{saveMessage}</span>
            )}
          </div>
        )}

        {address && (
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Post a new thesis</h2>
            <p className="text-sm text-white/80">
              Connect your wallet, write a structured thesis, and push it into the
              OpenPnL feed. This first version is local-only (per session) until we
              wire the database path.
            </p>
            <form
              className="space-y-3 max-w-2xl"
              onSubmit={(e) => {
                e.preventDefault();
                setError(null);
                if (!address) return;
                if (!newAsset || !newAmountUsd || !newEntryPrice || !newThesisBody) {
                  setError("Please fill in asset, amount, entry price, and thesis text.");
                  return;
                }
                const amount = parseFloat(newAmountUsd);
                const price = parseFloat(newEntryPrice);
                if (Number.isNaN(amount) || Number.isNaN(price)) {
                  setError("Amount and entry price must be valid numbers.");
                  return;
                }

                const authorLabel =
                  displayName || `${address.slice(0, 6)}...${address.slice(-4)}`;

                const thesis = {
                  id: `local-${Date.now()}`,
                  author: authorLabel,
                  action: newAction,
                  amountUsd: amount,
                  asset: newAsset.toUpperCase(),
                  entryPrice: price,
                  thesisPreview: newThesisBody,
                  status: "OPEN" as const,
                  verified: !!newProof,
                  createdAt: "Just now",
                  wallet: address,
                };

                setMyTheses((prev) => {
                  const next = [thesis, ...prev];
                  // Update global feed and localStorage with all theses from all wallets
                  try {
                    const w = window as any;
                    const existing = (w.__openpnlTheses as any[]) || [];
                    const all = [thesis, ...existing];
                    w.__openpnlTheses = all;
                    saveThesesToStorage(all);
                  } catch {}
                  return next;
                });

                setNewAsset("");
                setNewAmountUsd("");
                setNewEntryPrice("");
                setNewThesisBody("");
                setNewProof("");
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="space-y-1">
                  <label className="block text-xs uppercase text-white/70">Asset</label>
                  <input
                    className="w-full rounded-md bg-[#101e1a] border border-[#3d6a5c] px-2 py-1 text-sm text-white placeholder:text-white/40"
                    placeholder="SOL / WBTC / WETH / ..."
                    value={newAsset}
                    onChange={(e) => setNewAsset(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs uppercase text-white/70">Action</label>
                  <select
                    className="w-full rounded-md bg-[#101e1a] border border-[#3d6a5c] px-2 py-1 text-sm text-white"
                    value={newAction}
                    onChange={(e) => setNewAction(e.target.value as "BUY" | "SELL")}
                  >
                    <option value="BUY">Buy</option>
                    <option value="SELL">Sell</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs uppercase text-white/70">Amount (USD)</label>
                  <input
                    type="number"
                    className="w-full rounded-md bg-[#101e1a] border border-[#3d6a5c] px-2 py-1 text-sm text-white placeholder:text-white/40"
                    placeholder="e.g. 800"
                    value={newAmountUsd}
                    onChange={(e) => setNewAmountUsd(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs uppercase text-white/70">Entry price</label>
                  <input
                    type="number"
                    className="w-full rounded-md bg-[#101e1a] border border-[#3d6a5c] px-2 py-1 text-sm text-white placeholder:text-white/40"
                    placeholder="e.g. 72882.75"
                    value={newEntryPrice}
                    onChange={(e) => setNewEntryPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1 text-sm">
                <label className="block text-xs uppercase text-white/70">Thesis text</label>
                <textarea
                  className="w-full rounded-md bg-[#101e1a] border border-[#3d6a5c] px-2 py-1 text-sm text-white placeholder:text-white/40 min-h-[80px]"
                  placeholder="Describe the setup, target, invalidation, and confidence."
                  value={newThesisBody}
                  onChange={(e) => setNewThesisBody(e.target.value)}
                />
              </div>

              <div className="space-y-1 text-sm">
                <label className="block text-xs uppercase text-white/70">Proof link / tx hash (optional)</label>
                <input
                  className="w-full rounded-md bg-[#101e1a] border border-[#3d6a5c] px-2 py-1 text-sm text-white placeholder:text-white/40"
                  placeholder="Explorer link, tx hash, or external proof URL"
                  value={newProof}
                  onChange={(e) => setNewProof(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="mt-2 px-4 py-2 rounded-full bg-[#101e1a] border border-[#3d6a5c] text-sm hover:bg-[#101e1a]/80"
              >
                Post thesis
              </button>
            </form>
          </section>
        )}

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Your Theses</h2>
          {userTheses.length === 0 ? (
            <p className="text-sm text-white/80">
              You have no theses yet. Once posting is enabled, new theses will
              show up here.
            </p>
          ) : (
            <div className="space-y-3 max-w-2xl">
              {userTheses.map((t) => (
                <ThesisCard key={t.id} {...t} />
              ))}
            </div>
          )}
        </section>
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
