// src/app/layout.js
export const metadata = {
  title: "GTI PDF Gallery",
  description: "Open PDFs by URL slug that matches the PDF name in /public",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* use 100vh fallback + 100svh for iOS Safari address bar behavior */}
      <body style={{ margin: 0, height: "100svh" }}>{children}</body>
    </html>
  );
}
