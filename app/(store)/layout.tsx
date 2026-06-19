import Navbar from "@/app/components/navbar";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-zinc-50 dark:bg-zinc-950 transition-colors">
        {children}
      </main>
      <footer className="border-t border-zinc-200/80 bg-white py-8 text-center text-sm text-zinc-500 dark:border-zinc-800/80 dark:bg-black dark:text-zinc-400">
        <div className="mx-auto max-w-7xl px-6">
          <p>© {new Date().getFullYear()} Mahmoud Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
