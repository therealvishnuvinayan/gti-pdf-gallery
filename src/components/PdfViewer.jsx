// src/components/PdfViewer.jsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Use a stable worker URL (don’t rely on pdfjs.version/CDN guessing)
pdfjs.GlobalWorkerOptions.workerSrc =
  'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js';

export default function PdfViewer({ pdfUrl }) {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(1024);
  const [numPages, setNumPages] = useState(null);

  // Make it responsive
  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      setWidth(Math.max(320, Math.min(w, 1400))); // cap so it doesn’t explode on desktop
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        overflowY: 'auto',
        margin: 0,
        padding: 0,
        background: '#111', // dark backdrop looks nicer
      }}
    >
      <Document
        file={pdfUrl}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        onLoadError={(e) => console.error('PDF load error:', e)}
        loading={<div style={{ color: '#fff', padding: 16 }}>Loading PDF…</div>}
        error={<div style={{ color: '#fff', padding: 16 }}>Failed to load PDF.</div>}
      >
        {Array.from({ length: numPages || 0 }, (_, i) => (
          <Page
            key={i + 1}
            pageNumber={i + 1}
            width={width}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            loading=""
          />
        ))}
      </Document>
    </div>
  );
}
