import axiosInstance from '@/api/axiosInstance';
import type { PaginatedResponse, Movie, MovieListCategory } from './tmdb.types';

export const fetchMovies = async (
  category: MovieListCategory,
  page: number = 1
): Promise<PaginatedResponse<Movie>> => {
  const { data } = await axiosInstance.get<PaginatedResponse<Movie>>(`/movie/${category}`, {
    params: { page },
  });
  return data;
};
