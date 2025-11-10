export const dynamic = 'force-static';

export default function PdfPage({ params }) {
  const slug = Array.isArray(params.slug) ? params.slug.at(-1) : params.slug;
  const file = slug.toLowerCase().endsWith('.pdf') ? slug : `${slug}.pdf`;

  const base = process.env.NEXT_PUBLIC_PDF_BASE_URL || '';
  const href = base
    ? `${base}/${encodeURIComponent(file)}`
    : `/${encodeURIComponent(file)}`;

  return (
    <iframe
      src={href}
      title={file}
      style={{ width: '100vw', height: '100vh', border: 'none', display: 'block' }}
    />
  );
}
