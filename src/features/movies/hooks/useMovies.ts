// src/features/movies/hooks/useMovies.ts
import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query'; // Importar InfiniteData
import { fetchMovies } from '../api/tmdb.api';
import type { MovieListCategory, PaginatedResponse, Movie } from '../api/tmdb.types';

export const MOVIES_QUERY_KEY_PREFIX = 'movies';

export const useInfiniteMovies = (category: MovieListCategory) => {
  return useInfiniteQuery<
    PaginatedResponse<Movie>,
    Error,
    InfiniteData<PaginatedResponse<Movie>>,
    [string, MovieListCategory],
    number
  >({
    queryKey: [MOVIES_QUERY_KEY_PREFIX, category],
    queryFn: ({ pageParam = 1 }) => fetchMovies(category, pageParam),
    initialPageParam: 1,
    getNextPageParam: (
      lastPage // lastPage es PaginatedResponse<Movie>
    ) => (lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined),
  });
};
