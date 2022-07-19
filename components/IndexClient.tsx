import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const GET_MOVIES = gql`
  query getMovies {
    allMovies {
      title
      id
      medium_cover_image
    }
  }
`;

interface Movie {
  id?: number;
  title: string;
  medium_cover_image: string;
}

const IndexClient = () => {
  const { data, loading, error } = useQuery(GET_MOVIES);
  const movies: Movie[] = data?.allMovies;
  const router = useRouter();
  if (loading) {
    return <h1>loading</h1>;
  }
  if (error) {
    return <h1>Could not fetch :(</h1>;
  }
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-serif text-5xl my-10 font-bold">Movies🎬</h1>
      <div className="grid grid-cols-4">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => router.push(`/movie/${movie.id}`)}
            src={movie.medium_cover_image}
            className="w-40 m-4 rounded-lg hover:cursor-pointer hover:translate-y-2 transition-all shadow-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default IndexClient;
