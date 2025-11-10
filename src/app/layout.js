import './globals.css';

export const metadata = {
  title: 'PDF Viewer',
  description: 'Open PDFs by URL slug that matches the PDF name',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, height: '100%' }}>{children}</body>
    </html>
  );
}
