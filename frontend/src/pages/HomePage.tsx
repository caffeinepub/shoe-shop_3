import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Footer from '@/components/Footer';
import { useAllProducts } from '@/hooks/useQueries';
import { useInitializeBackend } from '@/hooks/useQueries';
import { useEffect } from 'react';

export default function HomePage() {
  const { data: products, isLoading } = useAllProducts();
  const initMutation = useInitializeBackend();

  // Auto-initialize backend if empty
  useEffect(() => {
    if (!isLoading && products && products.length === 0 && !initMutation.isPending) {
      initMutation.mutate();
    }
  }, [isLoading, products]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />

        {/* Categories strip */}
        <section className="bg-charcoal-light border-y border-charcoal-border py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
              {['Sneakers', 'Boots', 'Sandals', 'Formal'].map(cat => (
                <a
                  key={cat}
                  href={`/products?category=${cat}`}
                  className="font-condensed font-700 text-xs uppercase tracking-[0.25em] text-offwhite-muted hover:text-amber transition-colors duration-200"
                >
                  {cat}
                </a>
              ))}
            </div>
          </div>
        </section>

        <FeaturedProducts />

        {/* Banner strip */}
        <section className="bg-amber py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-condensed font-900 text-charcoal text-3xl md:text-4xl uppercase tracking-wide">
              Free Shipping on Orders Over $100
            </p>
            <p className="text-charcoal/70 font-sans text-sm mt-2">
              Use code <strong>STREET100</strong> at checkout
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
