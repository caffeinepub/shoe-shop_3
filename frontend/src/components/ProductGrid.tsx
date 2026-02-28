import type { Product } from '@/backend';
import ProductCard from './ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { PackageSearch } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
}

export default function ProductGrid({ products, isLoading }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-square w-full bg-charcoal-medium" />
            <Skeleton className="h-5 w-3/4 bg-charcoal-medium" />
            <Skeleton className="h-4 w-1/2 bg-charcoal-medium" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-offwhite-dim">
        <PackageSearch size={48} className="mb-4 opacity-40" />
        <p className="font-condensed font-700 text-xl uppercase tracking-wide">No products found</p>
        <p className="text-sm mt-1">Try a different category or filter</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 animate-fade-in">
      {products.map(product => (
        <ProductCard key={String(product.id)} product={product} />
      ))}
    </div>
  );
}
