import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import client from "./queryClient";
import Header from "./components/common/Header";

const App = () => {
  const elem = useRoutes(routes);
  return (
    <QueryClientProvider client={client}>
      <Header />
      {elem}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
