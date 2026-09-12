import { SITE_NAME } from "@/lib/site";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          background: "#f4efe6",
          color: "#162033",
          padding: 48,
          textAlign: "center",
        }}
      >
        <h1>{SITE_NAME}</h1>
        <p>This page could not be found.</p>
        <a href="/en">Go home</a>
      </body>
    </html>
  );
}
