import { sql } from "@vercel/postgres";

export type PostRecord = {
  id: string;
  title: string;
};

export type CommentRecord = {
  id: string;
  content: string;
  post_id: string;
};

const missingDbConnectionMessage =
  "Missing Postgres connection. Set the `POSTGRES_URL` env variable in Vercel.";

function assertDatabaseConfigured() {
  if (!process.env.POSTGRES_URL) {
    throw new Error(missingDbConnectionMessage);
  }
}

export async function listPosts(): Promise<PostRecord[]> {
  assertDatabaseConfigured();
  const result = await sql<PostRecord>`SELECT id, title FROM posts ORDER BY created_at DESC`;
  return result.rows;
}

export async function getPostById(id: string): Promise<PostRecord | null> {
  assertDatabaseConfigured();
  const result = await sql<PostRecord>`SELECT id, title FROM posts WHERE id = ${id} LIMIT 1`;
  return result.rows[0] ?? null;
}

export async function createPostRecord(title: string): Promise<PostRecord> {
  assertDatabaseConfigured();
  if (!title.trim()) {
    throw new Error("Title cannot be empty");
  }
  const result = await sql<PostRecord>`INSERT INTO posts (title) VALUES (${title}) RETURNING id, title`;
  return result.rows[0];
}

export async function deletePostById(id: string): Promise<void> {
  assertDatabaseConfigured();
  if (!id) return;
  await sql`DELETE FROM comments WHERE post_id = ${id}`;
  await sql`DELETE FROM posts WHERE id = ${id}`;
}

export async function listCommentsForPost(
  postId: string
): Promise<CommentRecord[]> {
  assertDatabaseConfigured();
  const result = await sql<CommentRecord>`
    SELECT id, content, post_id
    FROM comments
    WHERE post_id = ${postId}
    ORDER BY created_at DESC
  `;
  return result.rows;
}

export async function createCommentRecord({
  postId,
  content,
}: {
  postId: string;
  content: string;
}): Promise<CommentRecord> {
  assertDatabaseConfigured();
  if (!content.trim()) {
    throw new Error("Comment cannot be empty");
  }
  const result = await sql<CommentRecord>`
    INSERT INTO comments (post_id, content)
    VALUES (${postId}, ${content})
    RETURNING id, content, post_id
  `;
  return result.rows[0];
}

export async function deleteCommentById(id: string): Promise<void> {
  assertDatabaseConfigured();
  if (!id) return;
  await sql`DELETE FROM comments WHERE id = ${id}`;
}
