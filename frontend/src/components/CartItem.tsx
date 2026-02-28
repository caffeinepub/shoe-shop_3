import { Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '@/contexts/CartContext';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 py-5 border-b border-charcoal-border last:border-0">
      {/* Image */}
      <div className="w-20 h-20 shrink-0 bg-charcoal-medium overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h4 className="font-condensed font-700 text-offwhite text-base uppercase tracking-wide leading-tight mb-1">
          {item.name}
        </h4>
        <p className="text-offwhite-dim text-xs font-sans mb-3">
          Size: US {item.size}
        </p>

        <div className="flex items-center justify-between">
          {/* Quantity controls */}
          <div className="flex items-center border border-charcoal-border">
            <button
              onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-offwhite-muted hover:text-amber hover:bg-charcoal-medium transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 h-8 flex items-center justify-center text-offwhite font-condensed font-700 text-sm border-x border-charcoal-border">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-offwhite-muted hover:text-amber hover:bg-charcoal-medium transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Line total + remove */}
          <div className="flex items-center gap-3">
            <span className="font-condensed font-800 text-amber text-lg">
              {formatPrice(item.price * item.quantity)}
            </span>
            <button
              onClick={() => removeItem(item.productId, item.size)}
              className="text-offwhite-dim hover:text-destructive transition-colors p-1"
              aria-label="Remove item"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
