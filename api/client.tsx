import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  // Apollo cache
  // 쿼리 결과가 브라우저 메모리에 있는 cache에 저장된다.
  cache: new InMemoryCache(),
});

export default client;
