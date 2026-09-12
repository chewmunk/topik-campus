import { NextResponse } from "next/server";
import { getCatalogFeatures } from "@/lib/catalog";

export function GET() {
  return NextResponse.json(getCatalogFeatures());
}
