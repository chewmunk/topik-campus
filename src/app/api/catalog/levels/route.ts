import { NextResponse } from "next/server";
import { getTopikLevels } from "@/lib/catalog";

export function GET() {
  return NextResponse.json(getTopikLevels());
}
