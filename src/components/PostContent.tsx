import { Post } from "../content/posts";
import Badge from "./Badge";

const PostContent = ({ post }: { post: Post }) => (
  <article className="post-content">
    <Badge label={post.category} tone="accent" />
    <h1>{post.title}</h1>
    <p className="muted">{new Date(post.date).toLocaleDateString()}</p>
    {post.body.map((paragraph) => (
      <p key={paragraph}>{paragraph}</p>
    ))}
  </article>
);

export default PostContent;
