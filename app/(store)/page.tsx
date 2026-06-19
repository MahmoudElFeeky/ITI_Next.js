import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";

// Ensure this route is dynamically rendered to fetch fresh DB data
export const dynamic = "force-dynamic";

export default async function StorePage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:py-16">
      {/* Hero Banner Section */}
      <div className="relative overflow-hidden rounded-3xl bg-zinc-950 px-8 py-16 text-white shadow-2xl dark:bg-zinc-900 sm:px-16 sm:py-24">
        {/* Decorative subtle background gradients */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-zinc-200 backdrop-blur-md">
            Introducing Mahmoud Premium
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Sleek hardware for <br />
            <span className="bg-gradient-to-r from-zinc-200 via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
              modern workspace
            </span>
          </h1>
          <p className="mt-6 text-base leading-8 text-zinc-300 sm:text-lg">
            Carefully curated, high-end mechanical peripherals, studio grade audio gear, and sleek wearable devices to elevate your daily workflow.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <a
              href="#catalog"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 shadow-sm transition-transform hover:scale-105 dark:bg-white dark:text-zinc-950"
            >
              Browse Catalog
            </a>
            <Link
              href="#"
              className="text-sm font-semibold leading-6 text-white transition-colors hover:text-zinc-200"
            >
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Catalog Grid Section */}
      <div id="catalog" className="mt-20 scroll-mt-24">
        <div className="flex flex-col gap-4 border-b border-zinc-200 pb-8 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
              Featured Peripherals
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Hand-picked devices selected for their premium build quality and exceptional design.
            </p>
          </div>
          <div className="flex gap-2">
            <span className="inline-flex items-center rounded-md bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              {products.length} Products Available
            </span>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="mt-16 text-center py-20 bg-white rounded-2xl border border-dashed border-zinc-300 dark:bg-zinc-950 dark:border-zinc-800">
            <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">No products found</h3>
            <p className="mt-2 text-sm text-zinc-500">Seed the database or add products manually.</p>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-900"
              >
                {/* Product Image Wrapper */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-850">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-w-768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center rounded-full bg-white/95 px-2.5 py-0.5 text-xs font-semibold text-zinc-800 shadow-sm dark:bg-zinc-900/95 dark:text-zinc-200">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Product Content */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4 text-amber-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.6 3.1-.214 4.707c-.037.82.843 1.46 1.547 1.01l4.053-2.58 4.053 2.58c.704.45 1.584-.19 1.547-1.01l-.214-4.707 3.6-3.1c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                        {product.rating.toFixed(1)}
                      </span>
                    </div>
                    {product.stock <= 5 && (
                      <span className="text-[10px] font-semibold text-rose-600 dark:text-rose-400">
                        Only {product.stock} left
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-zinc-950 dark:text-zinc-50">
                    <Link href={`/product/${product.id}`} className="hover:underline">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {product.description}
                  </p>

                  <div className="mt-auto pt-6 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800">
                    <span className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="inline-flex h-9 items-center justify-center rounded-lg bg-zinc-900 px-4 text-xs font-semibold text-white transition-colors group-hover:bg-zinc-800 dark:bg-white dark:text-black dark:group-hover:bg-zinc-100">
                      View Details
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
