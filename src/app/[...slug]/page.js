export const dynamic = 'force-static'; // ok for simple viewer

export default function PdfPage({ params }) {
  const slug = Array.isArray(params.slug) ? params.slug.at(-1) : params.slug;
  const file = slug.toLowerCase().endsWith('.pdf') ? slug : `${slug}.pdf`;

  // Prefer Blob base if provided; otherwise fall back to /public
  const base = process.env.NEXT_PUBLIC_PDF_BASE_URL || '';
  const href = base
    ? `${base}/${encodeURIComponent(file)}`
    : `/${encodeURIComponent(file)}`; // serves from /public

  return (
    <iframe
      src={href}
      title={file}
      style={{ width: '100vw', height: '100vh', border: 'none', display: 'block' }}
    />
  );
}
