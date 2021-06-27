import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { SidebarContextProvider } from "../contexts/SidebarDrawerContext";
import { makeServer } from "../services/mirage";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
function MyApp({ Component, pageProps }: AppProps) {
  if (process.env.NODE_ENV === "development") {
    makeServer();
  }
  // O next ja possui configurado uma variável de ambiente NODE_ENV para dev, prod..
  // Nesse caso, quando estivermos em dev, utilizaremos o mirage como banco de dados.

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarContextProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </SidebarContextProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
