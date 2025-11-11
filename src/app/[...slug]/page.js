// Server Component (no styled-jsx, no client-only imports)
export const dynamic = "force-static"; // works fine for a simple viewer

export default function PdfPage({ params }) {
  const slug = Array.isArray(params.slug) ? params.slug.at(-1) : params.slug;
  const file = slug.endsWith(".pdf") ? slug : `${slug}.pdf`;

  // MUST be a full origin, no trailing slash, e.g.
  // https://l1yoomy3tqguuerl.public.blob.vercel-storage.com
  const base = process.env.NEXT_PUBLIC_PDF_BASE_URL || "";
  const href = base
    ? `${base}/${encodeURIComponent(file)}`
    : `/${encodeURIComponent(file)}`; // fallback to /public if you add files later

  // On iOS Safari/Chrome, 100vh can be unreliable.
  // Use modern viewport units and fixed positioning to truly fill the screen.
  const style = {
    position: "fixed",
    inset: 0,                 // top:0,right:0,bottom:0,left:0
    width: "100%",
    height: "100dvh",         // dynamic viewport height (iOS-friendly)
    minHeight: "100svh",      // small-viewport fallback
    border: "none",
    display: "block",
    background: "#000",       // avoids white gaps during render
  };

  return (
    <>
      <iframe
        src={href}
        title={file}
        style={style}
        // helps some mobile viewers
        allow="fullscreen"
        loading="eager"
      />
      {/* Fallback link: if a browser refuses inline PDF, user can open externally */}
      <noscript>
        <a href={href} target="_blank" rel="noopener noreferrer">
          Open PDF
        </a>
      </noscript>
    </>
  );
}
