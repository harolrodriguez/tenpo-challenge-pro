import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Movie } from '../api/tmdb.types';
import { env } from '@/config/env';
import { Star, CalendarDays } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const posterUrl = `${env.TMDB_IMAGE_BASE_URL}w500${movie.poster_path}`;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02]">
      <CardHeader className="p-0">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-auto aspect-[2/3] object-cover"
          // onError={(e) => (e.currentTarget.src = '/placeholder-image.png')}
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold truncate mb-1" title={movie.title}>
          {movie.title}
        </CardTitle>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
          <span>{movie.vote_average.toFixed(1)}</span>
          <span className="mx-2">|</span>
          <CalendarDays className="h-4 w-4 mr-1" />
          <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}</span>
        </div>
        <CardDescription className="text-sm h-10 overflow-hidden text-ellipsis line-clamp-2">
          {movie.overview || 'No hay descripción disponible.'}
        </CardDescription>
      </CardContent>
    </Card>
  );
};
