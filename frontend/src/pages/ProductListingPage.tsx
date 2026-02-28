import { useState, useMemo } from 'react';
import { useSearch } from '@tanstack/react-router';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryFilter from '@/components/CategoryFilter';
import SortDropdown, { type SortOption } from '@/components/SortDropdown';
import ProductGrid from '@/components/ProductGrid';
import { useAllProducts } from '@/hooks/useQueries';
import type { Product } from '@/backend';

export default function ProductListingPage() {
  const search = useSearch({ from: '/products' });
  const initialCategory = (search as { category?: string }).category ?? 'All';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortOption, setSortOption] = useState<SortOption>('default');

  const { data: allProducts = [], isLoading } = useAllProducts();

  const filteredAndSorted = useMemo<Product[]>(() => {
    let result = [...allProducts];

    // Filter
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Sort
    if (sortOption === 'price-asc') {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return result;
  }, [allProducts, selectedCategory, sortOption]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Page header */}
        <div className="bg-charcoal-light border-b border-charcoal-border py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-amber font-condensed font-700 text-xs uppercase tracking-[0.3em] mb-2">
              Sole Street Collection
            </p>
            <h1 className="font-condensed text-4xl md:text-5xl text-offwhite">
              {selectedCategory === 'All' ? 'All Styles' : selectedCategory}
            </h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />
            <div className="flex items-center gap-3">
              <span className="text-offwhite-dim font-sans text-xs">
                {isLoading ? '...' : `${filteredAndSorted.length} products`}
              </span>
              <SortDropdown value={sortOption} onChange={setSortOption} />
            </div>
          </div>

          <ProductGrid products={filteredAndSorted} isLoading={isLoading} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
