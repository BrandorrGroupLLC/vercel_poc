import Post from "@/components/Post";
import { listPosts } from "@/lib/db";
import { onDeletePost } from "./_actions/actions";

export default async function Home() {
  const posts = await listPosts();

  return (
    <main className="flex flex-col items-center justify-between p-24 w-1/2 m-auto gap-4">
      <h1 className="text-2xl pb-10">List Of All Titles</h1>
      {posts.map((post) => (
        <Post onDelete={onDeletePost} post={post} key={post.id} />
      ))}
    </main>
  );
}
