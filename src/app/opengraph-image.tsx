import { ImageResponse } from "next/og";
import { SITE_NAME, SLOGAN } from "@/lib/site";

export const alt = `${SITE_NAME} — ${SLOGAN}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#13294b",
          color: "#f4efe6",
          padding: 72,
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 4, textTransform: "uppercase" }}>
          {SITE_NAME}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 64, fontWeight: 600, lineHeight: 1.1, maxWidth: 900 }}>
            {SLOGAN}
          </div>
          <div style={{ fontSize: 28, color: "#d9d0c2" }}>
            The global learning community for TOPIK learners.
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#c45c26" }}>topikcampus.com</div>
      </div>
    ),
    { ...size },
  );
}
