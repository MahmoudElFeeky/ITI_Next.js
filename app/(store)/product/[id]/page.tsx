import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  // Retrieve the product by ID from the SQLite DB
  const product = await prisma.product.findUnique({
    where: { id },
  });

  // If the product doesn't exist, trigger notFound
  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:py-16">
      {/* Breadcrumbs and Back Link */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          <svg
            xmlns="http://www.w3.org/2055/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to Catalog
        </Link>
        <nav className="mt-4 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:underline">Catalog</Link>
          <span>/</span>
          <span className="text-zinc-400 dark:text-zinc-500">{product.category}</span>
          <span>/</span>
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">{product.name}</span>
        </nav>
      </div>

      {/* Main product view split grid */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Left Column: Product Image Card */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-lg dark:border-zinc-850 dark:bg-zinc-900 lg:sticky lg:top-24">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover object-center p-2 rounded-3xl"
            priority
            sizes="(max-w-768px) 100vw, 50vw"
          />
        </div>

        {/* Right Column: Product Detail Info */}
        <div className="flex flex-col justify-between">
          <div>
            {/* Category tag and Rating */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
                {product.category}
              </span>
              <div className="flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 text-amber-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.6 3.1-.214 4.707c-.037.82.843 1.46 1.547 1.01l4.053-2.58 4.053 2.58c.704.45 1.584-.19 1.547-1.01l-.214-4.707 3.6-3.1c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-55">
                  {product.rating.toFixed(1)} / 5.0
                </span>
                <span className="text-xs text-zinc-500">(Customer Review)</span>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
              {product.name}
            </h1>

            {/* Price Badge */}
            <div className="mt-4 flex items-baseline gap-4">
              <span className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                Free Worldwide Shipping
              </span>
            </div>

            {/* Stock status indicator */}
            <div className="mt-6 flex items-center gap-2">
              <div className={`h-2.5 w-2.5 rounded-full ${product.stock > 0 ? "bg-emerald-500" : "bg-rose-500"}`} />
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {product.stock > 0 ? `In Stock (${product.stock} units available)` : "Out of Stock"}
              </span>
            </div>

            {/* Description */}
            <div className="mt-8 border-t border-zinc-200 pt-8 dark:border-zinc-800">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Overview</h3>
              <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                {product.description}
              </p>
            </div>

            {/* Specifications Section */}
            <div className="mt-8 border-t border-zinc-200 pt-8 dark:border-zinc-800">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Specifications</h3>
              <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                <div className="border-b border-zinc-100 pb-2 dark:border-zinc-800">
                  <dt className="text-xs text-zinc-500 dark:text-zinc-400">Category</dt>
                  <dd className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-50">{product.category}</dd>
                </div>
                <div className="border-b border-zinc-100 pb-2 dark:border-zinc-800">
                  <dt className="text-xs text-zinc-500 dark:text-zinc-400">Condition</dt>
                  <dd className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-50">Brand New</dd>
                </div>
                <div className="border-b border-zinc-100 pb-2 dark:border-zinc-800">
                  <dt className="text-xs text-zinc-500 dark:text-zinc-400">Warranty</dt>
                  <dd className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-50">2 Year Warranty</dd>
                </div>
                <div className="border-b border-zinc-100 pb-2 dark:border-zinc-800">
                  <dt className="text-xs text-zinc-500 dark:text-zinc-400">Box Contents</dt>
                  <dd className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-50">Device, Charging Cable, Manual</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-12 gap-4 flex flex-col sm:flex-row">
            <button className="flex-1 rounded-full bg-zinc-950 px-8 py-4 text-center text-sm font-bold text-white transition-transform hover:scale-102 hover:bg-zinc-850 active:scale-98 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100">
              Add to Cart
            </button>
            <button className="flex-1 rounded-full border border-zinc-300 bg-transparent px-8 py-4 text-center text-sm font-bold text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-50">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
