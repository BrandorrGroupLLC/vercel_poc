"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { PostRecord } from "@/lib/db";

const Post = ({
  post,
  onDelete,
}: {
  post: PostRecord;
  onDelete: (id: string) => void | Promise<void>;
}) => {
  const router = useRouter();
  const onDetail = () => {
    router.push(`posts/${post.id}`);
  };
  return (
    <div className="border bg-gray-100 w-full p-4 rounded flex justify-between ">
      <button type="button" onClick={onDetail}>
        <div className="flex gap-2">
          <div>Title:</div>
          <div>{post.title}</div>
        </div>
      </button>
      <button
        type="button"
        className="text-red-500 cursor-pointer"
        onClick={() => onDelete(post.id)}
        aria-label="Delete post"
      >
        X
      </button>
    </div>
  );
};

export default Post;
