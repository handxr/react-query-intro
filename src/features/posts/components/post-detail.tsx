import { useGetComments } from "../../comments/api/get-comments";
import { useDeletePost } from "../api/delete-post";
import { PostResponse } from "../types";

export function PostDetail({ post }: { post: PostResponse }) {
  const { comments, isLoading, isError, error } = useGetComments({
    post,
  });

  const deleteMutation = useDeletePost({
    postId: String(post.id),
  });

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
    <>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <h2>Comments</h2>
      <button onClick={() => deleteMutation.mutateAsync(post)}>Delete</button>
      {deleteMutation.isLoading && <div>Deleting...</div>}
      {deleteMutation.isError && (
        <div>
          Error!
          {deleteMutation.error?.toString()}
        </div>
      )}
      {deleteMutation.isSuccess && (
        <div style={{ color: "green" }}>Deleted!</div>
      )}
      <ul>
        {comments?.map((comment: any) => (
          <li key={comment.id}>{comment.body}</li>
        ))}
      </ul>
    </>
  );
}
