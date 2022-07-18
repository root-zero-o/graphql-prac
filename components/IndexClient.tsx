import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";

const GET_MOVIES = gql`
  query getMovies {
    allMovies {
      title
      id
    }
    allTweets {
      id
      text
      author {
        fullName
      }
    }
  }
`;

interface Movie {
  id?: number;
  title: string;
}

interface Author {
  fullName: string;
}

interface Tweet {
  id?: number;
  text: string;
  author: Author;
}

const IndexClient = () => {
  const { data, loading, error } = useQuery(GET_MOVIES);
  const movies: Movie[] = data?.allMovies;
  const tweets: Tweet[] = data?.allTweets;
  const router = useRouter();
  if (loading) {
    return <h1>loading</h1>;
  }
  if (error) {
    return <h1>Could not fetch :(</h1>;
  }
  return (
    <ul>
      <h1>Movies</h1>
      {movies.map((movie) => (
        <li key={movie.id} onClick={() => router.push(`/movie/${movie.id}`)}>
          {movie.title}
        </li>
      ))}
      <h1>Tweets</h1>
      {tweets.map((tweet) => (
        <li key={tweet.id}>
          {tweet.text}/ by: {tweet.author.fullName}
        </li>
      ))}
    </ul>
  );
};

export default IndexClient;
