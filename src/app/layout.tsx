import type { Metadata, Viewport } from "next";
import { rootMetadata } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = rootMetadata();

export const viewport: Viewport = {
  themeColor: "#13294b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return children;
}
