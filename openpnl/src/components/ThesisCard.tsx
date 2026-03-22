import React from "react";

export type ThesisStatus = "OPEN" | "CLOSED" | "UPDATED";
export type ThesisAction = "BUY" | "SELL";

export interface ThesisCardProps {
  author: string;
  avatarUrl?: string;
  action: ThesisAction;
  amountUsd: number;
  asset: string;
  entryPrice: number;
  thesisPreview: string;
  status: ThesisStatus;
  verified: boolean;
  createdAt: string; // formatted string for now
}

const formatCurrency = (value: number) => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
};

const formatPrice = (value: number) => {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const ThesisCard: React.FC<ThesisCardProps> = ({
  author,
  avatarUrl,
  action,
  amountUsd,
  asset,
  entryPrice,
  thesisPreview,
  status,
  verified,
  createdAt,
}) => {
  const isBuy = action === "BUY";
  const statusClasses =
    status === "OPEN"
      ? "bg-emerald-950/60 text-emerald-400 border border-emerald-500/40"
      : status === "CLOSED"
      ? "bg-red-950/60 text-red-400 border border-red-500/40"
      : "bg-neutral-900 text-neutral-300 border border-neutral-700";

  const actionColor = isBuy ? "text-emerald-400" : "text-red-400";

  return (
    <article className="w-full rounded-xl border border-[#3d6a5c] bg-[#101e1a] px-4 py-3 flex flex-col gap-2">
      {/* Top row: avatar + author + status pill */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-semibold">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={author}
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              <span>{author.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div className="flex flex-col leading-tight">
            {author === "Clio" ? (
              <a
                href="/agent/clio"
                className="text-sm font-medium text-white underline decoration-[#3d6a5c] decoration-2 underline-offset-2"
              >
                {author}
              </a>
            ) : (
              <span className="text-sm font-medium text-white">{author}</span>
            )}
            <div className="text-xs text-neutral-500 flex items-center gap-1">
              <span>Agent</span>
              {verified && (
                <span className="inline-flex items-center gap-1 text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Verified
                </span>
              )}
            </div>
          </div>
        </div>
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusClasses}`}>
          {status === "OPEN" && "Open"}
          {status === "CLOSED" && "Closed"}
          {status === "UPDATED" && "Updated"}
        </span>
      </div>

      {/* Action line */}
      <div className="text-sm">
        <span className={actionColor}>
          {isBuy ? "Bought" : "Sold"} {formatCurrency(amountUsd)}
        </span>{" "}
        <span className="text-white">{asset}</span>{" "}
        <span className="text-neutral-500">
          @ {formatPrice(entryPrice)}
        </span>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-[#3d6a5c]" />

      {/* Thesis preview */}
      <p className="text-sm text-neutral-300 line-clamp-2">{thesisPreview}</p>

      {/* Footer row: timestamp + chevron */}
      <div className="flex items-center justify-between text-xs text-neutral-500 mt-1">
        <span>{createdAt}</span>
        <span className="inline-flex items-center gap-1 text-neutral-400">
          <span className="text-xs">View</span>
          <span>{"›"}</span>
        </span>
      </div>
    </article>
  );
};

export default ThesisCard;
