import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "../api/client";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default App;
