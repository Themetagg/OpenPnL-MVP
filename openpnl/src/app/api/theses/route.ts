import { NextResponse } from "next/server";

// MVP stub: disable Prisma-backed theses API to avoid engine config issues.
// The live app uses client-side session state + static seeds instead.

export async function GET() {
  return NextResponse.json({ theses: [] });
}

export async function POST(req: Request) {
  // Accept payload but do nothing server-side for this MVP.
  return NextResponse.json({ ok: true });
}
