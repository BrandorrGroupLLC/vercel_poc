"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  createCommentRecord,
  createPostRecord,
  deleteCommentById,
  deletePostById,
} from "@/lib/db";

export async function deleteComment(formData: FormData) {
  const id = formData.get("id")?.toString();
  const postId = formData.get("postId")?.toString();
  if (!id) return;
  await deleteCommentById(id);
  if (postId) {
    revalidatePath(`/posts/${postId}`);
  }
}

export async function addComment(
  content: string,
  postId: string
) {
  if (content.trim().length === 0) return;
  await createCommentRecord({ postId, content });
  revalidatePath(`/posts/${postId}`);
}

export async function onDeletePost(id: string) {
  if (!id) return;
  await deletePostById(id);
  revalidatePath("/");
}

export async function createPost(formData: FormData) {
  const title = formData.get("title")?.toString().trim();
  if (!title) return;
  await createPostRecord(title);
  revalidatePath("/");
  redirect("/");
}
