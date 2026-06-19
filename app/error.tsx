"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an analytics service
    console.error("Application Error Boundary caught:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 py-24 text-center dark:bg-zinc-950 transition-colors">
      <div className="relative">
        {/* Subtle background glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-500">
            System Error
          </span>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Something went wrong
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
            An unexpected error occurred in our system. Our engineering team has been notified.
          </p>

          {/* Error Message Diagnostic Box */}
          <div className="mt-6 max-w-md w-full overflow-hidden rounded-xl border border-zinc-200 bg-white p-4 text-left font-mono text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 shadow-sm">
            <span className="text-zinc-400">Diagnostic Message:</span>
            <p className="mt-1 break-all font-semibold text-zinc-800 dark:text-zinc-200">
              {error.message || "Unknown error occurred"}
            </p>
            {error.digest && (
              <p className="mt-2 text-[10px] text-zinc-400">
                Digest ID: <span className="font-semibold">{error.digest}</span>
              </p>
            )}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => reset()}
              className="rounded-full bg-zinc-950 px-8 py-3.5 text-sm font-bold text-white transition-all hover:scale-105 hover:bg-zinc-900 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="rounded-full border border-zinc-200 bg-white px-8 py-3.5 text-sm font-bold text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-850"
            >
              Go to Storefront
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
