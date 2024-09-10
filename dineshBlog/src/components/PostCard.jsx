import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div className="group relative h-[340px] w-full lg:w-[350px] border border-teal-500 hover:border-2 overflow-hidden rounded-lg sm:w-[430px] transition-all">
      <Link to={`/api/post/${post.slug}`}>
        <img
          src={post.image}
          alt="post img"
          className="h-[240px] w-full object-contain group-hover:h-[200px] transition-all duration-300 z-20 "
        />
      </Link>
      <div className="p-3 flex flex-col gap-2">
        <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
        <span className="italic text-sm">{post.category}</span>
        <Link
          className="z-10 group-hover:bottom-0 absolute bottom-[-100px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-lg !rounded-tl-none m-2"
          to={`/api/post/${post.slug}`}
        >
          Read article
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
