// src/features/movies/components/MovieList.tsx
import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useInfiniteMovies } from '../hooks/useMovies';
import { MovieCard } from './MovieCard';
import type { Movie, MovieListCategory } from '../api/tmdb.types';
import { MovieCardSkeleton } from './MovieCardSkeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Loader2, ArrowUp } from 'lucide-react';

interface MovieListProps {
  category: MovieListCategory;
}

const getVisualColumnCount = () => {
  if (typeof window === 'undefined') return 1;
  if (window.innerWidth >= 1280) return 5;
  if (window.innerWidth >= 1024) return 4;
  if (window.innerWidth >= 768) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
};

export const MovieList = ({ category }: MovieListProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
    useInfiniteMovies(category);

  const parentRef = useRef<HTMLDivElement>(null);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const [columns, setColumns] = useState(getVisualColumnCount());

  useEffect(() => {
    const handleResize = () => setColumns(getVisualColumnCount());
    const currentWindow = window;
    currentWindow.addEventListener('resize', handleResize);
    handleResize();
    return () => currentWindow.removeEventListener('resize', handleResize);
  }, []);

  const allMovies = useMemo<Movie[]>(() => {
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

  const rows = useMemo<Movie[][]>(() => {
    const temp: Movie[][] = [];
    if (columns === 0) return temp;
    for (let i = 0; i < allMovies.length; i += columns) {
      temp.push(allMovies.slice(i, i + columns));
    }
    if (hasNextPage) temp.push([]);
    return temp;
  }, [allMovies, columns, hasNextPage]);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 470,
    overscan: getVisualColumnCount() * 2,
  });

  useEffect(() => {
    const virtualItems = rowVirtualizer.getVirtualItems();
    if (virtualItems.length === 0) return;
    const lastRow = virtualItems[virtualItems.length - 1];
    if (lastRow.index >= rows.length - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    rowVirtualizer.getVirtualItems(),
    rows.length,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  useEffect(() => {
    const parentElement = parentRef.current;
    if (!parentElement) return;
    const handleScroll = () => {
      setShowScrollTopButton(parentElement.scrollTop > 300);
    };
    parentElement.addEventListener('scroll', handleScroll);
    return () => parentElement.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    parentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const rowGridClasses = useMemo(() => {
    switch (columns) {
      case 5:
        return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-1';
      case 4:
        return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 p-1';
      case 3:
        return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 p-1';
      case 2:
        return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 p-1';
      default:
        return 'grid grid-cols-1 gap-6 p-1';
    }
  }, [columns]);

  if (isLoading && !allMovies.length) {
    const visualCols = getVisualColumnCount();
    const skeletonCardsNeeded = visualCols * 3;
    return (
      <div className={rowGridClasses}>
        {Array.from({ length: skeletonCardsNeeded }).map((_, index) => (
          <MovieCardSkeleton key={`skeleton-initial-${index}`} />
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
    <div
      ref={parentRef}
      className="overflow-auto relative"
      style={{ height: 'calc(100vh - 200px)' }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        <div
          className={''}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: `translateY(${rowVirtualizer.getVirtualItems()[0]?.start || 0}px)`,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const rowIndex = virtualRow.index;
            const moviesInRow = rows[rowIndex];
            const isLoaderRow = !moviesInRow || moviesInRow.length === 0;

            return (
              <div
                key={virtualRow.key}
                data-index={rowIndex}
                ref={rowVirtualizer.measureElement}
                // style={{ height: `${virtualRow.size}px` }}
                className={rowGridClasses}
              >
                {isLoaderRow ? (
                  <div className={`col-span-${columns} flex justify-center items-center h-full`}>
                    {hasNextPage && <Loader2 className="h-8 w-8 animate-spin text-primary" />}
                  </div>
                ) : (
                  moviesInRow.map((movie) => <MovieCard key={movie.id} movie={movie} />)
                )}
              </div>
            );
          })}
        </div>
      </div>

      {showScrollTopButton && (
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-8 right-8 h-12 w-12 rounded-full shadow-lg z-50"
          onClick={scrollToTop}
          aria-label="Volver arriba"
        >
          <ArrowUp className="h-6 w-6" />
        </Button>
      )}

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
