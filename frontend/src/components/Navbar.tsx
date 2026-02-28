import { Link, useNavigate } from '@tanstack/react-router';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

export default function Navbar() {
  const { totalCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Shop', to: '/products' },
    { label: 'Sneakers', to: '/products?category=Sneakers' },
    { label: 'Boots', to: '/products?category=Boots' },
    { label: 'Sandals', to: '/products?category=Sandals' },
    { label: 'Formal', to: '/products?category=Formal' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-charcoal border-b border-charcoal-border shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/assets/generated/sole-street-logo.dim_320x80.png"
              alt="Sole Street"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.label}
                to={link.to}
                className="text-offwhite-muted hover:text-amber font-sans font-600 text-sm uppercase tracking-widest transition-colors duration-200"
                activeProps={{ className: 'text-amber' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Cart + Mobile Menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate({ to: '/cart' })}
              className="relative p-2 text-offwhite hover:text-amber transition-colors duration-200"
              aria-label="Shopping cart"
            >
              <ShoppingBag size={22} />
              {totalCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-amber text-charcoal text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center leading-none">
                  {totalCount > 99 ? '99+' : totalCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-offwhite hover:text-amber transition-colors"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-charcoal-light border-t border-charcoal-border px-4 py-4 flex flex-col gap-3">
          {navLinks.map(link => (
            <Link
              key={link.label}
              to={link.to}
              className="text-offwhite-muted hover:text-amber font-sans font-600 text-sm uppercase tracking-widest py-2 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
