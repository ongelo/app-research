import queryClient from "@/services/queryClient";
import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          primaryColor: "blue",
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </QueryClientProvider>
  );
}
