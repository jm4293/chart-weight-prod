'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

interface IProps {
  children: React.ReactNode;
}

export default function QueryProvider(props: IProps) {
  const { children } = props;

  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          throwOnError: false,
          retry: 0,
        },
        mutations: {
          throwOnError: false,
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
