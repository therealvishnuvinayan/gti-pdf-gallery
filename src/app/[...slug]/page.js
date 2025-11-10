// src/app/[...slug]/page.js
import fs from "node:fs/promises";
import path from "node:path";

// Turn "My Report 2025.pdf" into "my-report-2025"
function toSlugBase(name) {
  const base = name.replace(/\.pdf$/i, "");
  return decodeURIComponent(base)
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[ _]+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
}

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch (e) {
    return false; // non-empty catch: explicitly handled
  }
}

async function resolvePdfFilenameFromSlug(slugParam) {
  const slugJoined = Array.isArray(slugParam) ? slugParam.join("/") : String(slugParam || "");
  const wanted = toSlugBase(slugJoined);

  const publicDir = path.join(process.cwd(), "public");
  const files = await fs.readdir(publicDir, { withFileTypes: true });

  const pdfs = files
    .filter((f) => f.isFile() && /\.pdf$/i.test(f.name))
    .map((f) => f.name);

  // Direct matches
  const candidates = [
    `${wanted}.pdf`,
    `${wanted.toUpperCase()}.pdf`,
    `${wanted}.PDF`,
  ];

  for (const f of candidates) {
    if (await exists(path.join(publicDir, f))) return f;
  }

  // Slug-equivalent search
  for (const f of pdfs) {
    const base = f.replace(/\.pdf$/i, "");
    if (toSlugBase(base) === wanted) return f;
  }

  // Extra fallback (user typed actual filename without extension)
  const rawVariants = [
    `${decodeURIComponent(slugJoined)}.pdf`,
    `${slugJoined}.pdf`,
  ];

  for (const f of rawVariants) {
    if (await exists(path.join(publicDir, f))) return f;
  }

  return null;
}

export default async function PdfViewerPage({ params }) {
  const filename = await resolvePdfFilenameFromSlug(params.slug);

  if (!filename) {
    const { notFound } = await import("next/navigation");
    notFound();
  }

  const src = `/${encodeURIComponent(filename)}#view=FitH`;

  return (
    <main
      style={{
        margin: 0,
        padding: 0,
        height: "100vh",
        width: "100vw",
        background: "#0b0c0f",
      }}
    >
      <iframe
        title={filename}
        src={src}
        style={{
          border: "none",
          width: "100vw",
          height: "100vh",
          display: "block",
          background: "#0b0c0f",
        }}
        allow="fullscreen; clipboard-read; clipboard-write"
      />

      {/* Hidden direct link as a fallback for browsers that block iframe viewers */}
      <a
        href={`/${encodeURIComponent(filename)}`}
        style={{ position: "absolute", left: -9999, top: -9999 }}
      >
        {filename}
      </a>
    </main>
  );
}
