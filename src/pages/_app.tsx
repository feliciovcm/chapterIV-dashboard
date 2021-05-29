import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { SidebarContextProvider } from "../contexts/SidebarDrawerContext";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SidebarContextProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SidebarContextProvider>
  );
}

export default MyApp;
