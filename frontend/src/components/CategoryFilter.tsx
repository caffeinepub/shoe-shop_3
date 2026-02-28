interface CategoryFilterProps {
  selected: string;
  onChange: (category: string) => void;
}

const CATEGORIES = ['All', 'Sneakers', 'Boots', 'Sandals', 'Formal'];

export default function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`font-condensed font-700 text-xs uppercase tracking-widest px-4 py-2 border transition-all duration-200 ${
            selected === cat
              ? 'bg-amber text-charcoal border-amber'
              : 'bg-transparent text-offwhite-muted border-charcoal-border hover:border-amber hover:text-amber'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
