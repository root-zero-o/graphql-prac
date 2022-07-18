import { gql, useApolloClient, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";

interface IsLiked {
  isLiked: boolean;
}

const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
      medium_cover_image
      rating
      isLiked @client
    }
  }
`;

const Movie = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    data,
    loading,
    client: { cache },
  } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  });
  console.log(data, loading);
  if (loading) {
    return <h1>Fetching..</h1>;
  }

  const onClick = () => {
    // cache에 있는 것 수정하기
    // <TData, TVariables>
    cache.writeFragment<IsLiked, string>({
      // 1. 어떤 것을 수정할까
      id: `Movie:${id}`,
      // 2. 어떤 field를 수정할건지 Apollo에게 알려준다.
      fragment: gql`
        fragment MovieFragment on Movie {
          isLiked
        }
      `,
      // 3. 어떻게 수정할건지 알려준다.
      data: {
        isLiked: !data?.movie.isLiked,
      },
    });
  };
  return (
    <div className="flex flex-col items-center p-20 w-screen h-screen bg-slate-500 space-y-4">
      <img
        src={data?.movie.medium_cover_image}
        className="rounded-lg shadow-md"
      ></img>
      <h1 className="font-serif text-5xl text-white">{data?.movie.title}</h1>
      <h2 className="text-3xl text-white font-serif">
        ⭐ {data?.movie.rating}
      </h2>
      <button
        className="w-12 h-8 bg-slate-200 rounded-lg font-derif shadow-md"
        onClick={onClick}
      >
        {data?.movie?.isLiked ? "Unlike" : "Like"}
      </button>
    </div>
  );
};

export default Movie;
