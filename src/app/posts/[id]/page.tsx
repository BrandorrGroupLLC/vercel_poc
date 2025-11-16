import { addComment, deleteComment } from "@/app/_actions/actions";
import AddComment from "@/components/AddComment";
import { getPostById, listCommentsForPost } from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";

const Posts = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return notFound();
  const post = await getPostById(params.id);
  if (!post) return notFound();
  const comments = await listCommentsForPost(params.id);

  return (
    <div className="flex flex-col items-center p-4 gap-4">
      <h1 className="text-2xl font-bold">Post Information:</h1>
      <div className="border rounded w-1/2 m-auto bg-gray-200 p-4 ">
        <h2>Title: {post.title}</h2>
      </div>

      <AddComment addComment={addComment} postId={params.id} />

      <h1 className="text-xl font-bold">Comments:</h1>
      {comments.map((comment) => (
        <div key={comment.id}>
          <div className="w-96 p-2 rounded border bg-yellow-100 flex justify-between">
            <div>{comment.content}</div>
            <form
              action={async (formData) => {
                "use server";
                await deleteComment(formData);
              }}
            >
              <input type="hidden" name="id" id="id" value={comment.id} />
              <input
                type="hidden"
                name="postId"
                id="postId"
                value={params.id}
              />
              <button type="submit" className="text-red-950">
                X
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
