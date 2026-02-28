import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type SortOption = 'default' | 'price-asc' | 'price-desc';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <Select value={value} onValueChange={v => onChange(v as SortOption)}>
      <SelectTrigger className="w-48 bg-charcoal-light border-charcoal-border text-offwhite font-condensed font-600 text-xs uppercase tracking-wider">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent className="bg-charcoal-light border-charcoal-border text-offwhite">
        <SelectItem value="default" className="font-condensed font-600 text-xs uppercase tracking-wider hover:text-amber focus:text-amber">
          Newest
        </SelectItem>
        <SelectItem value="price-asc" className="font-condensed font-600 text-xs uppercase tracking-wider hover:text-amber focus:text-amber">
          Price: Low to High
        </SelectItem>
        <SelectItem value="price-desc" className="font-condensed font-600 text-xs uppercase tracking-wider hover:text-amber focus:text-amber">
          Price: High to Low
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
