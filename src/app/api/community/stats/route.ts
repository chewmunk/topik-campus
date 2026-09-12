import { NextResponse } from "next/server";
import { getCommunityStats } from "@/lib/catalog";

export function GET() {
  return NextResponse.json(getCommunityStats());
}
