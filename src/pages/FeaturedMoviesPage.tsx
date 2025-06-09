import { useState } from 'react';
import { MovieList } from '@/features/movies/components/MovieList';
import { MovieFilters } from '@/features/movies/components/MovieFilters';
import type { MovieFilters as MovieFiltersType } from '@/features/movies/api/tmdb.types';

const FeaturedMoviesPage = () => {
  const [filters, setFilters] = useState<MovieFiltersType>({
    category: 'popular',
  });

  const handleFiltersChange = (newFilters: Partial<MovieFiltersType>) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Películas Destacadas</h1>
        <MovieFilters filters={filters} onFiltersChange={handleFiltersChange} />
      </div>
      <MovieList category={filters.category} />
    </div>
  );
};

export default FeaturedMoviesPage;
