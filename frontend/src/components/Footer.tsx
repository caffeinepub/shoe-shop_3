import { Link } from '@tanstack/react-router';
import { Heart } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'sole-street');

  return (
    <footer className="bg-charcoal-light border-t border-charcoal-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <img
              src="/assets/generated/sole-street-logo.dim_320x80.png"
              alt="Sole Street"
              className="h-10 w-auto object-contain mb-4"
            />
            <p className="text-offwhite-dim font-sans text-sm leading-relaxed max-w-xs">
              Premium footwear for every stride. Quality craftsmanship meets modern street style.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-condensed font-700 text-offwhite text-sm uppercase tracking-widest mb-4">
              Shop
            </h4>
            <ul className="space-y-2">
              {['Sneakers', 'Boots', 'Sandals', 'Formal'].map(cat => (
                <li key={cat}>
                  <Link
                    to="/products"
                    search={{ category: cat }}
                    className="text-offwhite-dim font-sans text-sm hover:text-amber transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-condensed font-700 text-offwhite text-sm uppercase tracking-widest mb-4">
              Info
            </h4>
            <ul className="space-y-2">
              {['About Us', 'Size Guide', 'Returns', 'Contact'].map(item => (
                <li key={item}>
                  <span className="text-offwhite-dim font-sans text-sm cursor-default">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-charcoal-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-offwhite-dim font-sans text-xs">
            © {year} Sole Street. All rights reserved.
          </p>
          <p className="text-offwhite-dim font-sans text-xs flex items-center gap-1">
            Built with{' '}
            <Heart size={12} className="text-amber fill-amber" />{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber hover:text-amber-light transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
