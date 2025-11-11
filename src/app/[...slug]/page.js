export const dynamic = 'force-static'; // ok for static viewer routes

const BASE = (process.env.NEXT_PUBLIC_PDF_BASE_URL || '').replace(/\/+$/, '');

function filenameFromSlug(slugParam) {
  const slug = Array.isArray(slugParam) ? slugParam.at(-1) : slugParam;
  // handle '+' from URL encoding representing spaces sometimes
  const clean = String(slug).replace(/\+/g, ' ');
  return /\.pdf$/i.test(clean) ? clean : `${clean}.pdf`;
}

export default function PdfPage({ params }) {
  const file = filenameFromSlug(params.slug);
  const href = `${BASE}/${encodeURIComponent(file)}`;

  return (
    <>
      <iframe
        src={`${href}#zoom=page-width`}
        title={file}
        className="pdfFrame"
      />
      {/* Fallback open link (useful on iOS if inline viewer is limited) */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="openLink"
      >
        Open in new tab
      </a>

      <style jsx global>{`
        html, body { margin: 0; height: 100%; }
        .pdfFrame {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
          display: block;
        }
        /* Better on mobile address-bar collapse */
        @supports (height: 100svh) {
          .pdfFrame { height: 100svh; }
        }
        .openLink {
          position: fixed;
          right: 12px;
          bottom: 12px;
          padding: 8px 12px;
          background: rgba(0,0,0,.6);
          color: #fff;
          text-decoration: none;
          border-radius: 8px;
          font: 14px system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif;
        }
      `}</style>
    </>
  );
}
  