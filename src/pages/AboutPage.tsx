import PageTransition from "../components/PageTransition";
import Section from "../components/Section";
import profile from "../content/profile";

const AboutPage = () => (
  <PageTransition>
    <Section title="About" description="A short background and what I am looking for.">
      <div className="about-layout">
        <div>
          <p>{profile.shortBio}</p>
          <p>
            I am looking for entry-level IT support or junior sysadmin roles where
            I can keep learning, documenting, and helping end users.
          </p>
        </div>
        <div className="about-card">
          <h3>Quick facts</h3>
          <ul>
            <li><strong>Location:</strong> {profile.location}</li>
            <li><strong>Email:</strong> {profile.email}</li>
            {profile.interests?.map((interest) => (
              <li key={interest}>{interest}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  </PageTransition>
);

export default AboutPage;
