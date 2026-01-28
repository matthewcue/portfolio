import PageTransition from "../components/PageTransition";
import Section from "../components/Section";
import PostList from "../components/PostList";
import posts from "../content/posts";

const WritingPage = () => (
  <PageTransition>
    <Section
      title="Writing"
      description="Short troubleshooting notes, lab reflections, and how-to guides."
    >
      <PostList posts={posts} />
    </Section>
  </PageTransition>
);

export default WritingPage;
