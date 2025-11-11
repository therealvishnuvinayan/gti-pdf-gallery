"use client";

export default function PdfPage({ params }) {
  // support /foo, /a/b/foo -> last segment = "foo"
  const slug = Array.isArray(params?.slug) ? params.slug.at(-1) : params?.slug || "";
  const file = slug.toLowerCase().endsWith(".pdf") ? slug : `${slug}.pdf`;

  // IMPORTANT: set this in Vercel project settings (not just .env.local)
  // Example: https://l1yoomy3tqguuerl.public.blob.vercel-storage.com
  const base = process.env.NEXT_PUBLIC_PDF_BASE_URL || "";

  // Use encodeURIComponent to survive spaces/special chars in filenames
  const href = base
    ? `${base}/${encodeURIComponent(file)}`
    : `/${encodeURIComponent(file)}`; // falls back to /public if you ever add local files

  // Mobile full-screen: use 100dvh and fallbacks; allow scrolling
  const style = {
    width: "100vw",
    height: "100dvh",          // modern viewport unit (fixes mobile 100vh bugs)
    border: "none",
    display: "block",
  };

  return (
    <>
      <iframe
        src={href}
        title={file}
        style={style}
        // these help some in-app browsers
        allow="fullscreen"
        // on iOS/Safari, PDF viewer is the browser’s native renderer inside the iframe
      />
      {/* Fallback link (useful if an in-app browser blocks inline PDFs) */}
      <noscript>
        <a href={href}>{file}</a>
      </noscript>
    </>
  );
}
