import { Link } from "react-router-dom";
import Card from "./Card";
import Badge from "./Badge";
import { Post } from "../content/posts";

const PostList = ({ posts }: { posts: Post[] }) => (
  <div className="grid">
    {posts.map((post) => (
      <Card key={post.slug}>
        <Badge label={post.category} tone="accent" />
        <h3>{post.title}</h3>
        <p className="muted">{new Date(post.date).toLocaleDateString()}</p>
        <p>{post.summary}</p>
        <Link className="text-link" to={`/writing/${post.slug}`}>
          Read post →
        </Link>
      </Card>
    ))}
  </div>
);

export default PostList;
