import { useNavigate } from '@tanstack/react-router';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: '520px' }}>
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/generated/hero-banner.dim_1440x600.png')" }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/70 to-charcoal/20" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full py-24 md:py-32">
        <div className="max-w-xl">
          <p className="text-amber font-condensed font-700 text-sm uppercase tracking-[0.3em] mb-3">
            New Season — 2026
          </p>
          <h1 className="font-condensed text-5xl sm:text-6xl md:text-7xl text-offwhite leading-none mb-4">
            Walk Your
            <br />
            <span className="text-amber">Own Street</span>
          </h1>
          <p className="text-offwhite-muted font-sans text-base md:text-lg mb-8 leading-relaxed max-w-md">
            Premium footwear for every occasion. From street-ready sneakers to polished formals — find your perfect pair.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate({ to: '/products', search: { category: undefined } })}
              className="bg-amber text-charcoal font-condensed font-800 text-sm uppercase tracking-widest px-8 py-3 hover:bg-amber-light transition-colors duration-200 shadow-amber"
            >
              Shop Now
            </button>
            <button
              onClick={() => navigate({ to: '/products', search: { category: 'Sneakers' } })}
              className="border border-offwhite/40 text-offwhite font-condensed font-700 text-sm uppercase tracking-widest px-8 py-3 hover:border-amber hover:text-amber transition-colors duration-200"
            >
              New Arrivals
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
