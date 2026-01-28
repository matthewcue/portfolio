import PageTransition from "../components/PageTransition";
import Section from "../components/Section";
import PostList from "../components/PostList";
import posts from "../content/posts";

const WritingPage = () => (
  <PageTransition>
    <div className="writing-page">
      <Section
        title="Writing"
        description="Short troubleshooting notes, lab reflections, and how-to guides."
      >
        <div className="writing-list">
          <PostList posts={posts} />
        </div>
      </Section>
    </div>
  </PageTransition>
);

export default WritingPage;
