import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import React from "react";
import { SidebarProvider } from "../contexts/SidebarDrawerContext";
import { server } from "../services/mirage/index";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { client } from "../services/queryClient";

if (process.env.NODE_ENV === "development") {
  server();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools />
      <ChakraProvider theme={theme}>
        <SidebarProvider>
          <Component {...pageProps} />
        </SidebarProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
