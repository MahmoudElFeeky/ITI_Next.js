import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 py-24 text-center dark:bg-zinc-950 transition-colors">
      <div className="relative">
        {/* Subtle background glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-rose-500/10 blur-3xl" />
        
        <div className="relative z-10 flex flex-col items-center">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-rose-500">
            Error 404
          </span>
          <h1 className="mt-4 text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
            Lost in Space
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back on track.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="rounded-full bg-zinc-950 px-8 py-3.5 text-sm font-bold text-white transition-all hover:scale-105 hover:bg-zinc-900 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
            >
              Back to Storefront
            </Link>
            <Link
              href="#"
              className="rounded-full border border-zinc-200 bg-white px-8 py-3.5 text-sm font-bold text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-850"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
