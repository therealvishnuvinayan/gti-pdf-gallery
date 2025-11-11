// src/app/[...slug]/page.js
export const dynamic = 'force-static'; // fine for a simple viewer

import NextDynamic from 'next/dynamic';

// Load the client viewer only on the client (no SSR)
const PdfViewer = NextDynamic(() => import('../../components/PdfViewer'), {
  ssr: false,
});

function buildPdfUrl(slugParts) {
  const slug = Array.isArray(slugParts) ? slugParts.at(-1) : slugParts;
  const name = String(slug || '').toLowerCase().endsWith('.pdf')
    ? slug
    : `${slug}.pdf`;

  const base = process.env.NEXT_PUBLIC_PDF_BASE_URL || '';
  const url = base ? `${base}/${encodeURIComponent(name)}` : `/${encodeURIComponent(name)}`;
  return url;
}

export default function Page({ params }) {
  const pdfUrl = buildPdfUrl(params?.slug);

  // Optional: quick check to help debug 404s
  // console.log('Attempting to open:', pdfUrl);

  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <PdfViewer pdfUrl={pdfUrl} />
      </body>
    </html>
  );
}
