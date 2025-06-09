import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { MovieListCategory, MovieFilters as MovieFiltersType } from '../api/tmdb.types';

interface MovieFiltersProps {
  filters: MovieFiltersType;
  onFiltersChange: (newFilters: Partial<MovieFiltersType>) => void;
}

const categories: { value: MovieListCategory; label: string }[] = [
  { value: 'popular', label: 'Populares' },
  { value: 'top_rated', label: 'Mejor Valoradas' },
  { value: 'upcoming', label: 'Próximamente' },
  { value: 'now_playing', label: 'En Cines' },
];

export const MovieFilters = ({ filters, onFiltersChange }: MovieFiltersProps) => {
  return (
    <div className="mb-6 flex items-center gap-4">
      <Select
        value={filters.category}
        onValueChange={(value) => onFiltersChange({ category: value as MovieListCategory })}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Selecciona categoría" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat.value} value={cat.value}>
              {cat.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
