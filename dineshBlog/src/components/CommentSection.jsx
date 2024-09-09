import { Alert, Button, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentErr, setCommentErr] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch(`/api/comment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentErr(null);
      }
    } catch (error) {
      setCommentErr(error.message);
    }
  };

  return (
    <div>
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-s">
          <p>Signed in as:</p>
          <img
            src={currentUser.profilePicture}
            alt="pic"
            className="w-5 h-5 rounded-full object-cover"
          />
          <Link
            to={`/dashboard?tab=profile`}
            className="text-xs text-cyan-600 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 flex gap-1">
          You must be signed in to comment.
          <Link to={`/sign-in`} className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 rounded-md p-3"
        >
          <Textarea
            rows={3}
            maxLength="200"
            placeholder="Add a comment..."
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-xs">
              {200 - comment.length} characters remaining
            </p>
            <Button outline gradientDuoTone="purpleToPink" type="submit">
              Submit
            </Button>
          </div>
          {commentErr && (
            <Alert color="failure" className="mt-5">
              {commentErr}
            </Alert>
          )}
        </form>
      )}
    </div>
  );
};

export default CommentSection;
