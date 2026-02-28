import { useState } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { ArrowLeft, ShoppingBag, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SizeSelector from '@/components/SizeSelector';
import { useProductById } from '@/hooks/useQueries';
import { useCart } from '@/contexts/CartContext';
import { formatPrice, getProductImage } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetailPage() {
  const { id } = useParams({ from: '/products/$id' });
  const navigate = useNavigate();
  const { addItem } = useCart();

  const productId = BigInt(id);
  const { data: product, isLoading, error } = useProductById(productId);

  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    if (!product) return;

    setSizeError(false);
    addItem({
      productId: Number(product.id),
      name: product.name,
      price: Number(product.price),
      image: getProductImage(product.image),
      size: selectedSize,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back button */}
          <button
            onClick={() => navigate({ to: '/products', search: { category: undefined } })}
            className="flex items-center gap-2 text-offwhite-muted hover:text-amber font-condensed font-700 text-xs uppercase tracking-widest mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Shop
          </button>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
              <Skeleton className="aspect-square w-full bg-charcoal-medium" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4 bg-charcoal-medium" />
                <Skeleton className="h-6 w-1/4 bg-charcoal-medium" />
                <Skeleton className="h-20 w-full bg-charcoal-medium" />
                <Skeleton className="h-12 w-full bg-charcoal-medium" />
              </div>
            </div>
          ) : error || !product ? (
            <div className="text-center py-24">
              <p className="font-condensed font-700 text-xl text-offwhite uppercase">Product not found</p>
              <button
                onClick={() => navigate({ to: '/products', search: { category: undefined } })}
                className="mt-4 text-amber font-condensed font-700 text-sm uppercase tracking-widest hover:text-amber-light transition-colors"
              >
                Browse all products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 animate-fade-in">
              {/* Product image */}
              <div className="bg-charcoal-medium aspect-square overflow-hidden">
                <img
                  src={getProductImage(product.image)}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product info */}
              <div className="flex flex-col">
                <div className="mb-2">
                  <span className="bg-amber text-charcoal font-condensed font-700 text-xs uppercase tracking-wider px-2 py-1">
                    {product.category}
                  </span>
                </div>

                <h1 className="font-condensed text-4xl md:text-5xl text-offwhite mt-3 mb-2">
                  {product.name}
                </h1>

                <p className="font-condensed font-800 text-amber text-3xl mb-6">
                  {formatPrice(Number(product.price))}
                </p>

                <p className="text-offwhite-muted font-sans text-base leading-relaxed mb-8">
                  {product.description}
                </p>

                {/* Size selector */}
                <div className="mb-6">
                  <SizeSelector
                    sizes={product.availableSizes.map(s => Number(s))}
                    selected={selectedSize}
                    onSelect={size => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                  />
                  {sizeError && (
                    <p className="text-destructive font-sans text-xs mt-2">
                      Please select a size before adding to cart.
                    </p>
                  )}
                </div>

                {/* Add to cart */}
                <button
                  onClick={handleAddToCart}
                  className={`flex items-center justify-center gap-3 font-condensed font-800 text-sm uppercase tracking-widest py-4 px-8 transition-all duration-200 shadow-amber ${
                    added
                      ? 'bg-green-600 text-offwhite'
                      : 'bg-amber text-charcoal hover:bg-amber-light'
                  }`}
                >
                  {added ? (
                    <>
                      <Check size={18} />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} />
                      Add to Cart
                    </>
                  )}
                </button>

                {/* Product details */}
                <div className="mt-8 pt-8 border-t border-charcoal-border">
                  <h3 className="font-condensed font-700 text-offwhite text-sm uppercase tracking-widest mb-3">
                    Product Details
                  </h3>
                  <ul className="space-y-2 text-offwhite-dim font-sans text-sm">
                    <li>• Available in sizes: {product.availableSizes.map(s => `US ${s}`).join(', ')}</li>
                    <li>• Category: {product.category}</li>
                    <li>• Free returns within 30 days</li>
                    <li>• Ships in 2–5 business days</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
