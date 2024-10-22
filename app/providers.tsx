'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

export const queryClient = new QueryClient();

type ProvidersProps = Readonly<{ children: ReactNode }>;

export const Providers = ({ children }: ProvidersProps) => {
  let mutableChildren = children;

  mutableChildren = (
    <QueryClientProvider client={queryClient}>
      {mutableChildren}
    </QueryClientProvider>
  );

  return mutableChildren;
};
