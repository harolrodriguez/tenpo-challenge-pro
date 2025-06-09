import { QueryClient, QueryClientProvider as RQProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      retry: (failureCount, error: any) => {
        if (error?.response?.status === 401 || error?.response?.status === 404) {
          return false;
        }
        return failureCount < 2;
      },
    },
  },
});

export const TanstackQueryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <RQProvider client={queryClient}>
    {children}
    <ReactQueryDevtools initialIsOpen={false} />
  </RQProvider>
);
