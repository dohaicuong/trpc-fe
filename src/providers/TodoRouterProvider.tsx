import { QueryClient, QueryClientProvider } from 'react-query'
import { createReactQueryHooks } from '@trpc/react'
import type { TodoRouter } from 'go1-rpc_todo'

export const trpc = createReactQueryHooks<TodoRouter>()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    }
  }
})

const trpcClient = trpc.createClient({
  url: 'http://localhost:4000/trpc',
  // url: 'https://api.dev.go1.cloud/go1_rpc-todo/trpc',
})

type TodoRouterProviderProps = {
  children?: React.ReactNode
}
export const TodoRouterProvider: React.FC<TodoRouterProviderProps> = ({ children }) => (
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  </trpc.Provider>
)
