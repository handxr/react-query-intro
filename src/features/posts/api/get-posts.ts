import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { PostResponse } from "../types";
import { MAX_POSTS_PER_PAGE } from "../utils/constants";

export async function fetchPostsApi(page: number): Promise<PostResponse[]> {
  return fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${MAX_POSTS_PER_PAGE}&_page=${page}`
  ).then((res) => res.json());
}

export function useGetPosts() {
  const [page, setPage] = React.useState<number>(1);

  const queryClient = useQueryClient();

  React.useEffect(() => {
    if (page < MAX_POSTS_PER_PAGE) {
      const nextPage = page + 1;
      queryClient.prefetchQuery(["posts", nextPage], () =>
        fetchPostsApi(nextPage)
      );
    }
  }, [page, queryClient]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => fetchPostsApi(page),
    keepPreviousData: true,
  });

  return {
    posts: data,
    isLoading,
    isError,
    error,
    page,
    setPage,
  };
}
