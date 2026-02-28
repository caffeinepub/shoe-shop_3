import { useNavigate } from '@tanstack/react-router';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';
import { ShoppingBag } from 'lucide-react';

export default function CartSummary() {
  const { subtotal, totalCount, clearCart } = useCart();
  const navigate = useNavigate();

  const shipping = subtotal > 0 ? 999 : 0; // $9.99 shipping
  const total = subtotal + shipping;

  return (
    <div className="bg-charcoal-light border border-charcoal-border p-6 sticky top-24">
      <h3 className="font-condensed font-800 text-offwhite text-xl uppercase tracking-wide mb-6">
        Order Summary
      </h3>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm font-sans">
          <span className="text-offwhite-muted">Subtotal ({totalCount} item{totalCount !== 1 ? 's' : ''})</span>
          <span className="text-offwhite font-600">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm font-sans">
          <span className="text-offwhite-muted">Shipping</span>
          <span className="text-offwhite font-600">{subtotal > 0 ? formatPrice(shipping) : '—'}</span>
        </div>
        <div className="border-t border-charcoal-border pt-3 flex justify-between">
          <span className="font-condensed font-700 text-offwhite uppercase tracking-wide">Total</span>
          <span className="font-condensed font-800 text-amber text-xl">{formatPrice(total)}</span>
        </div>
      </div>

      <button
        className="w-full bg-amber text-charcoal font-condensed font-800 text-sm uppercase tracking-widest py-4 hover:bg-amber-light transition-colors duration-200 shadow-amber mb-3 flex items-center justify-center gap-2"
        onClick={() => alert('Checkout coming soon!')}
      >
        <ShoppingBag size={16} />
        Proceed to Checkout
      </button>

      <button
        onClick={() => navigate({ to: '/products', search: { category: undefined } })}
        className="w-full border border-charcoal-border text-offwhite-muted font-condensed font-700 text-xs uppercase tracking-widest py-3 hover:border-amber hover:text-amber transition-colors duration-200"
      >
        Continue Shopping
      </button>

      {totalCount > 0 && (
        <button
          onClick={clearCart}
          className="w-full mt-2 text-offwhite-dim font-sans text-xs hover:text-destructive transition-colors py-2"
        >
          Clear cart
        </button>
      )}
    </div>
  );
}
