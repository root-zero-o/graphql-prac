import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";

const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
    }
  }
`;

const Movie = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  });
  console.log(data, loading);
  if (loading) {
    return <h1>Fetching..</h1>;
  }
  return <div>{data.movie.title}</div>;
};

export default Movie;
