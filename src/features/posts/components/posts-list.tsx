import * as React from "react";

import { useGetPosts } from "../api/get-posts";
import { PostResponse } from "../types";
import { MAX_POSTS_PER_PAGE } from "../utils/constants";
import { PostDetail } from "./post-detail";

export const PostsList = () => {
  const [selectedPost, setSelectedPost] = React.useState<PostResponse>();

  const { error, isLoading, isError, posts, page, setPage } = useGetPosts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        Error!
        {error?.toString()}
      </div>
    );
  }

  return (
    <div>
      <h1>Blog'em Ipsum</h1>
      <ul>
        {posts?.map((post) => (
          <li key={post.id} onClick={() => setSelectedPost(post)}>
            {post.title}
          </li>
        ))}
      </ul>
      <button disabled={page <= 1} onClick={() => setPage((prev) => prev - 1)}>
        prev
      </button>
      <span>Page {page}</span>
      <button
        onClick={() => setPage((prev) => prev + 1)}
        disabled={page >= MAX_POSTS_PER_PAGE}
      >
        next
      </button>
      {selectedPost && <PostDetail post={selectedPost} />}
    </div>
  );
};
