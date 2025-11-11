// src/app/[...slug]/page.js
export const dynamic = 'force-static';

import NextDynamic from 'next/dynamic';

// Client-only PDF viewer (no SSR)
const PdfViewer = NextDynamic(() => import('../../components/PdfViewer'), { ssr: false });

function buildPdfUrl(slugParts) {
  const last = Array.isArray(slugParts) ? slugParts.at(-1) : slugParts;
  const base = (process.env.NEXT_PUBLIC_PDF_BASE_URL || '').replace(/\/$/, '');
  const file = String(last || '');
  const name = file.toLowerCase().endsWith('.pdf') ? file : `${file}.pdf`;
  return base ? `${base}/${encodeURIComponent(name)}` : `/${encodeURIComponent(name)}`;
}

export default function Page({ params }) {
  const pdfUrl = buildPdfUrl(params?.slug);
  return <PdfViewer pdfUrl={pdfUrl} />;
}
