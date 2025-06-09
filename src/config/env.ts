const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_API_BASE_URL = import.meta.env.VITE_TMDB_API_BASE_URL;
const TMDB_IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

if (!TMDB_API_KEY) {
  console.error('VITE_TMDB_API_KEY is not defined in .env file');
  throw new Error('VITE_TMDB_API_KEY is not defined');
}
if (!TMDB_API_BASE_URL) {
  console.error('VITE_TMDB_API_BASE_URL is not defined in .env file');
  throw new Error('VITE_TMDB_API_BASE_URL is not defined');
}
if (!TMDB_IMAGE_BASE_URL) {
  console.error('VITE_TMDB_IMAGE_BASE_URL is not defined in .env file');
  throw new Error('VITE_TMDB_IMAGE_BASE_URL is not defined');
}

export const env = {
  TMDB_API_KEY,
  TMDB_API_BASE_URL,
  TMDB_IMAGE_BASE_URL,
};
