'use client'

import { QueryClient, QueryClientProvider as ReactQueryProvider } from '@tanstack/react-query'
import { useState } from 'react'

const QueryClientProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient())

  return <ReactQueryProvider client={queryClient}>{children}</ReactQueryProvider>
}

export default QueryClientProvider
