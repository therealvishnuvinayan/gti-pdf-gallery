// src/components/PdfViewer.jsx
"use client";

import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Styles for toolbar/zoom, etc.
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function PdfViewer({ url }) {
  const layoutPlugin = defaultLayoutPlugin();

  // Pin the worker to the same version we installed
  const workerUrl = 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js';

  // Full-viewport container (mobile friendly)
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Worker workerUrl={workerUrl}>
        <Viewer fileUrl={url} plugins={[layoutPlugin]} />
      </Worker>
    </div>
  );
}
