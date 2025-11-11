// src/components/PdfViewer.jsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Use CDN worker (works reliably with Next.js)
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfViewer({ pdfUrl }) {
  const wrapRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [numPages, setNumPages] = useState(null);

  // ResizeObserver to make pages adapt to container width (mobile-friendly)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const update = () => setWidth(el.clientWidth);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'fixed',
        inset: 0,                // full screen
        width: '100vw',
        height: '100dvh',        // mobile viewport safe
        overflow: 'auto',
        background: '#111',      // neutral backdrop
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '12px' }}>
        <Document
          file={pdfUrl}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={<div style={{ color: '#fff', padding: 16 }}>Loading PDF…</div>}
          error={<div style={{ color: '#fff', padding: 16 }}>Failed to load PDF.</div>}
        >
          {Array.from(new Array(numPages || 0), (_, i) => (
            <div key={i} style={{ margin: '0 auto 16px' }}>
              <Page
                pageNumber={i + 1}
                width={Math.max(320, Math.min(width - 16, 1400))} // responsive width
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
}
