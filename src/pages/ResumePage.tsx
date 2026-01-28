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
        <a className="button" href="/matthew-cue_resume.pdf" download>
        <a className="button" href={profile.resumeUrl} download>
          Download PDF
        </a>
        <a className="button ghost" href="/matthew-cue_resume.pdf" target="_blank" rel="noreferrer">
          Open in new tab
        </a>
      </div>
      <div className="resume-preview">
        <iframe title="Resume preview" src="/matthew-cue_resume.pdf" />
      </div>
    </Section>
  </PageTransition>
);

export default ResumePage;
