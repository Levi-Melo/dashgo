import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import React from "react";
import { SidebarProvider } from "../contexts/SidebarDrawerContext";
import { server } from "../services/mirage/index";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'

if (process.env.NODE_ENV === "development") {
  server();
}

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools/>
      <ChakraProvider theme={theme}>
        <SidebarProvider>
          <Component {...pageProps} />
        </SidebarProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
