import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { useAllProducts } from '@/hooks/useQueries';
import ProductCard from './ProductCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function FeaturedProducts() {
  const { data: products, isLoading, error } = useAllProducts();

  const featured = products?.slice(0, 4) ?? [];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-amber font-condensed font-700 text-xs uppercase tracking-[0.3em] mb-2">
              Handpicked for You
            </p>
            <h2 className="font-condensed text-4xl md:text-5xl text-offwhite">
              Featured Styles
            </h2>
          </div>
          <Link
            to="/products"
            search={{ category: undefined }}
            className="hidden sm:flex items-center gap-2 text-amber font-condensed font-700 text-sm uppercase tracking-widest hover:gap-3 transition-all duration-200"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square w-full bg-charcoal-medium" />
                <Skeleton className="h-5 w-3/4 bg-charcoal-medium" />
                <Skeleton className="h-4 w-1/2 bg-charcoal-medium" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 text-offwhite-dim">
            <p>Unable to load products. Please try again.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 animate-fade-in">
            {featured.map(product => (
              <ProductCard key={String(product.id)} product={product} />
            ))}
          </div>
        )}

        {/* Mobile view all */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/products"
            search={{ category: undefined }}
            className="inline-flex items-center gap-2 text-amber font-condensed font-700 text-sm uppercase tracking-widest"
          >
            View All Styles <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
