interface SizeSelectorProps {
  sizes: number[];
  selected: number | null;
  onSelect: (size: number) => void;
}

export default function SizeSelector({ sizes, selected, onSelect }: SizeSelectorProps) {
  return (
    <div>
      <p className="font-condensed font-700 text-xs uppercase tracking-widest text-offwhite-muted mb-3">
        Select Size (US)
      </p>
      <div className="flex flex-wrap gap-2">
        {sizes.map(size => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className={`w-12 h-12 font-condensed font-700 text-sm border transition-all duration-200 ${
              selected === size
                ? 'bg-amber text-charcoal border-amber shadow-amber'
                : 'bg-transparent text-offwhite border-charcoal-border hover:border-amber hover:text-amber'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
