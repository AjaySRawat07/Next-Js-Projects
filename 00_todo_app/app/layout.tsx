import "./globals.css";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full w-full font-semibold`}
    >
      <body className="min-h-full flex flex-col justify-center items-center">{children}</body>
    </html>
  );
}
