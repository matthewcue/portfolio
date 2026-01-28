import { Link, useParams } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import PostContent from "../components/PostContent";
import posts from "../content/posts";

const PostDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <PageTransition>
        <h1>Post not found</h1>
        <p>We couldn’t find that entry. Try the writing index.</p>
        <Link className="text-link" to="/writing">
          Back to writing →
        </Link>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <PostContent post={post} />
      <Link className="text-link" to="/writing">
        Back to writing →
      </Link>
    </PageTransition>
  );
};

export default PostDetailPage;
