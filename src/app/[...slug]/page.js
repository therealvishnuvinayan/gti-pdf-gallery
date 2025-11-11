export const dynamic = 'force-static';

export default function PdfPage({ params }) {
  const slug = Array.isArray(params.slug) ? params.slug.at(-1) : params.slug;

  // append .pdf if missing
  const file = slug.toLowerCase().endsWith('.pdf') ? slug : `${slug}.pdf`;

  // your blob base URL
  const base = (process.env.NEXT_PUBLIC_PDF_BASE_URL || '').replace(/\/$/, '');

  // final PDF URL
  const href = `${base}/${encodeURIComponent(file)}`;

  return (
    <iframe
      src={href}
      style={{
        width: "100vw",
        height: "100vh",
        border: "none"
      }}
    />
  );
}
