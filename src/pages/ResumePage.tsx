import PageTransition from "../components/PageTransition";
import Section from "../components/Section";
import profile from "../content/profile";

const ResumePage = () => (
  <PageTransition>
    <Section title="Resume" description="Download or view the latest resume PDF.">
      <p>
        Download my resume as a PDF. An ATS-friendly version is available upon request.
      </p>
      <div className="button-row">
        <a className="button" href={profile.resumeUrl} target="_blank" rel="noreferrer">
          Download PDF
        </a>
        <a className="button ghost" href={profile.resumeUrl} target="_blank" rel="noreferrer">
          Open in new tab
        </a>
      </div>
      <div className="resume-preview">
        <iframe title="Resume preview" src={profile.resumeUrl} />
      </div>
    </Section>
  </PageTransition>
);

export default ResumePage;
