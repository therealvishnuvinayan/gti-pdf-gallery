export const metadata = {
  title: "GTI PDF Gallery",
  description: "Open PDFs by URL slug that matches the PDF name",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Ensure proper mobile viewport + safe areas */}
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      {/* No margins so the iframe can truly be edge-to-edge */}
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
