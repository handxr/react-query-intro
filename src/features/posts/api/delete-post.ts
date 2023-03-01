import { useMutation } from "react-query";
import { queryClient } from "../../../lib/react-query";

import { PostResponse } from "../types";

export async function deletePost(postId: string): Promise<void> {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: "DELETE",
  }).then((res) => res.json());
}

type UseDeletePostProps = {
  postId: string;
};

export function useDeletePost({ postId }: UseDeletePostProps) {
  return useMutation({
    onMutate: async (deletedPost: PostResponse) => {
      await queryClient.cancelQueries(["posts", postId]);

      const previousPosts = queryClient.getQueryData<PostResponse[]>([
        "posts",
        postId,
      ]);

      queryClient.setQueryData(
        ["posts", postId],
        previousPosts?.filter((post) => post.id !== deletedPost.id)
      );

      return { previousPosts };
    },
    onError: (_, __, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts", postId], context.previousPosts);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts", postId]);
    },
    mutationFn: () => deletePost(postId),
  });
}
