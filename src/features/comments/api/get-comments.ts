import { useQuery } from "react-query";
import { PostResponse } from "../../posts/types";
import { CommentResponse } from "../types";

export async function fetchCommentsApi(
  postId: string
): Promise<CommentResponse[]> {
  return fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  ).then((res) => res.json());
}

export function useGetComments({ post }: { post: PostResponse }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => fetchCommentsApi(String(post.id)),
  });

  return {
    comments: data,
    isLoading,
    isError,
    error,
  };
}
