import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartItem from '@/components/CartItem';
import CartSummary from '@/components/CartSummary';
import { useCart } from '@/contexts/CartContext';

export default function CartPage() {
  const { items } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="bg-charcoal-light border-b border-charcoal-border py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-amber font-condensed font-700 text-xs uppercase tracking-[0.3em] mb-2">
              Your Selection
            </p>
            <h1 className="font-condensed text-4xl md:text-5xl text-offwhite">
              Shopping Cart
            </h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <ShoppingBag size={56} className="text-offwhite-dim opacity-30 mb-6" />
              <h2 className="font-condensed font-800 text-2xl text-offwhite uppercase tracking-wide mb-2">
                Your cart is empty
              </h2>
              <p className="text-offwhite-dim font-sans text-sm mb-8">
                Looks like you haven't added anything yet.
              </p>
              <button
                onClick={() => navigate({ to: '/products', search: { category: undefined } })}
                className="bg-amber text-charcoal font-condensed font-800 text-sm uppercase tracking-widest px-8 py-3 hover:bg-amber-light transition-colors shadow-amber"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart items */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => navigate({ to: '/products', search: { category: undefined } })}
                    className="flex items-center gap-2 text-offwhite-muted hover:text-amber font-condensed font-700 text-xs uppercase tracking-widest transition-colors"
                  >
                    <ArrowLeft size={14} />
                    Continue Shopping
                  </button>
                  <span className="text-offwhite-dim font-sans text-xs">
                    {items.length} item{items.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="bg-charcoal-light border border-charcoal-border px-4">
                  {items.map(item => (
                    <CartItem key={`${item.productId}-${item.size}`} item={item} />
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="lg:col-span-1">
                <CartSummary />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
