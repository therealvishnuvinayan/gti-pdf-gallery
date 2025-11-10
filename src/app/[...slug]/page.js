export default function PdfPage({ params }) {
  const slug = Array.isArray(params.slug)
    ? params.slug.at(-1)
    : params.slug;

  const file = slug.endsWith(".pdf") ? slug : `${slug}.pdf`;

  const base = process.env.NEXT_PUBLIC_PDF_BASE_URL;
  const fullUrl = `${base}/${file}`;

  return (
    <iframe
      src={fullUrl}
      title={file}
      style={{
        width: "100vw",
        height: "100vh",
        border: "none",
        display: "block",
      }}
    />
  );
}
