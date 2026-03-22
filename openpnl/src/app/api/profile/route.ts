import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// MVP profile endpoint: no server-side persistence
// GET /api/profile?wallet=0x...
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get("wallet");

  if (!wallet) {
    return NextResponse.json({ error: "wallet is required" }, { status: 400 });
  }

  // For this MVP, always return null so client falls back to localStorage
  return NextResponse.json({ profile: null });
}

// POST /api/profile
export async function POST(req: NextRequest) {
  // Accept payload but do nothing server-side.
  // Profile data is stored locally in the browser for this MVP.
  return NextResponse.json({ ok: true });
}
