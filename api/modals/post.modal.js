import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default: "https://img.freepik.com/free-vector/copywriting-concept-with-male-female-authors-writing-posts-laptop-creative-ideas-notepad-flat-vector-illustration_1284-84237.jpg?size=626&ext=jpg&uid=R136712360&ga=GA1.1.1914382452.1716092979&semt=ais_hybrid",
    },
    category: {
      type: String,
      default: "uncategorized",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post',postSchema)

export default Post;