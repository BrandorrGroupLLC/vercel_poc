import { PrismaClient, Comment, Post } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export type PostRecord = Pick<Post, "id" | "title">;
export type CommentRecord = Pick<Comment, "id" | "content" | "postId">;

export async function listPosts(): Promise<PostRecord[]> {
  return prisma.post.findMany({
    select: { id: true, title: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPostById(id: string): Promise<PostRecord | null> {
  return prisma.post.findUnique({
    where: { id },
    select: { id: true, title: true },
  });
}

export async function createPostRecord(title: string): Promise<PostRecord> {
  if (!title.trim()) {
    throw new Error("Title cannot be empty");
  }
  return prisma.post.create({
    data: { title: title.trim() },
    select: { id: true, title: true },
  });
}

export async function deletePostById(id: string): Promise<void> {
  if (!id) return;
  await prisma.comment.deleteMany({ where: { postId: id } });
  await prisma.post.deleteMany({ where: { id } });
}

export async function listCommentsForPost(
  postId: string
): Promise<CommentRecord[]> {
  return prisma.comment.findMany({
    where: { postId },
    select: { id: true, content: true, postId: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function createCommentRecord({
  postId,
  content,
}: {
  postId: string;
  content: string;
}): Promise<CommentRecord> {
  if (!content.trim()) {
    throw new Error("Comment cannot be empty");
  }
  return prisma.comment.create({
    data: { postId, content: content.trim() },
    select: { id: true, content: true, postId: true },
  });
}

export async function deleteCommentById(id: string): Promise<void> {
  if (!id) return;
  await prisma.comment.deleteMany({ where: { id } });
}
