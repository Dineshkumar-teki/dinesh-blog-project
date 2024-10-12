import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      const fetchPosts = async () => {
        const res = await fetch(`/api/post/getPosts`);
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
        }
      };
      fetchPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-start gap-6 px-3 p-28 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold">
          Welcome to <span className="text-4xl text-teal-400">Dinesh's Blog</span>! I'm glad you're here.
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm lg:w-[50vw]">
          This blog covers a variety of topics, from technology and web
          development to personal growth and productivity. My goal is to share
          valuable insights and spark meaningful conversations. Feel free to
          explore, engage, and be part of the journey!
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          <p className="">View all posts</p>
        </Link>
      </div>
      <div className="max-w-6xl mx-auto p-3 flex gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6 w-full">
            <h2 className="text-center text-2xl">Recent Posts</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to="/search"
              className="text-lg text-teal-500 text-center hover:underline"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
