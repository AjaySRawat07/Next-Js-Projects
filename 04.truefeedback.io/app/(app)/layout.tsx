import Navbar from "@/components/Navbar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-neutral-200 dark:border-neutral-800 p-4 text-center text-xs text-neutral-500 dark:text-neutral-400 md:p-6 transition-colors">
        © 2026 TrueFeedback. All rights reserved.
      </footer>
    </div>
  );
}
