import { useNavigate } from '@tanstack/react-router';
import { ShoppingBag } from 'lucide-react';
import type { Product } from '@/backend';
import { formatPrice, getProductImage } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const imageUrl = getProductImage(product.image);
  const price = Number(product.price);
  const productId = Number(product.id);
  const defaultSize = product.availableSizes[0] ? Number(product.availableSizes[0]) : 9;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      productId,
      name: product.name,
      price,
      image: imageUrl,
      size: defaultSize,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article
      className="group bg-charcoal-light border border-charcoal-border hover:border-amber/40 transition-all duration-300 cursor-pointer overflow-hidden shadow-card hover:shadow-amber"
      onClick={() => navigate({ to: '/products/$id', params: { id: String(productId) } })}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-charcoal-medium aspect-square">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-amber text-charcoal font-condensed font-700 text-xs uppercase tracking-wider px-2 py-1">
            {product.category}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-condensed font-700 text-offwhite text-lg uppercase tracking-wide leading-tight mb-1 group-hover:text-amber transition-colors">
          {product.name}
        </h3>
        <p className="text-offwhite-dim text-sm font-sans line-clamp-2 mb-3 leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-amber font-condensed font-800 text-xl">
            {formatPrice(price)}
          </span>
          <button
            onClick={handleQuickAdd}
            className={`flex items-center gap-1.5 font-condensed font-700 text-xs uppercase tracking-wider px-3 py-2 transition-all duration-200 ${
              added
                ? 'bg-green-600 text-offwhite'
                : 'bg-amber text-charcoal hover:bg-amber-light'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag size={14} />
            {added ? 'Added!' : 'Add'}
          </button>
        </div>
      </div>
    </article>
  );
}
