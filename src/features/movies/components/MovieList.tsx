import { useRef, useEffect, useMemo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useInfiniteMovies } from '../hooks/useMovies';
import { MovieCard } from './MovieCard';
import type { Movie, MovieListCategory } from '../api/tmdb.types';
import { MovieCardSkeleton } from './MovieCardSkeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Loader2 } from 'lucide-react';

interface MovieListProps {
  category: MovieListCategory;
}

export const MovieList = ({ category }: MovieListProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
    useInfiniteMovies(category);

  const parentRef = useRef<HTMLDivElement>(null);

  const allMovies = useMemo(() => {
    if (!data?.pages) return [];
    const rawMovies = data.pages.flatMap((page) => page.results);
    const uniqueMoviesMap = new Map<number, Movie>();
    rawMovies.forEach((movie) => {
      if (!uniqueMoviesMap.has(movie.id)) {
        uniqueMoviesMap.set(movie.id, movie);
      }
    });
    return Array.from(uniqueMoviesMap.values());
  }, [data]);

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allMovies.length + 1 : allMovies.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 470,
    overscan: 5,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    if (!virtualItems.length) return;
    const lastItem = virtualItems[virtualItems.length - 1];
    if (!lastItem) return;

    if (lastItem.index >= allMovies.length - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, allMovies.length, isFetchingNextPage, virtualItems]);

  if (isLoading && !allMovies.length) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <MovieCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  if (isError && error && !allMovies.length) {
    let errorMessage = 'Ocurrió un problema al intentar obtener los datos.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return (
      <Alert variant="destructive" className="mt-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error al cargar películas</AlertTitle>
        <AlertDescription>{errorMessage}</AlertDescription>
      </Alert>
    );
  }

  if (!isLoading && !allMovies.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground mt-8">
        No se encontraron películas para esta categoría.
      </p>
    );
  }

  return (
    <div ref={parentRef} className="overflow-auto" style={{ height: 'calc(100vh - 200px)' }}>
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-1"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: `translateY(${virtualItems[0]?.start ?? 0}px)`,
          }}
        >
          {virtualItems.map((virtualRow) => {
            const isLoaderRow = virtualRow.index >= allMovies.length;
            const movie = allMovies[virtualRow.index];

            if (isLoaderRow) {
              return (
                <div
                  key="loader-item"
                  className="col-span-full flex justify-center items-center py-8 h-[470px]"
                >
                  {hasNextPage && <Loader2 className="h-8 w-8 animate-spin text-primary" />}
                </div>
              );
            }

            if (!movie) {
              return null;
            }

            return (
              <div
                key={movie.id}
                data-index={virtualRow.index}
                ref={rowVirtualizer.measureElement}
                className="w-full"
              >
                <MovieCard movie={movie} />
              </div>
            );
          })}
        </div>
      </div>
      {isError && error && allMovies.length > 0 && (
        <Alert variant="destructive" className="mt-4 mx-auto max-w-md">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error al cargar más películas</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : 'Ocurrió un error.'}
          </AlertDescription>
        </Alert>
      )}
      {!hasNextPage && allMovies.length > 0 && !isFetchingNextPage && (
        <p className="text-center text-muted-foreground py-8">Has llegado al final de la lista.</p>
      )}
    </div>
  );
};
