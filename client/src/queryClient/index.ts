import { QueryClient } from "react-query";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      retryOnMount: false,
      refetchOnReconnect: false,
    },
  },
});
export default client;
