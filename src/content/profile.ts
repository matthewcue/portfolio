// Update this profile data to personalize the site.

export interface SocialLink {
  label: string;
  url: string;
  icon?: string;
}

export interface Profile {
  fullName: string; // "Matthew Cue"
  headline: string; // "Entry-Level IT Support / Sysadmin"
  location: string; // "California, USA"
  email: string;
  resumeUrl: string; // direct link to hosted PDF
  aboutShort?: string; // optional short intro
  social: SocialLink[];
}

export const profile: Profile = {
  fullName: "Matthew Cue",
  headline: "Entry-Level IT Support / Sysadmin · Cloud-In-Training",
  location: "California, USA",
  // TODO: Replace with your real email before publishing.
  email: "mcue98@gmail.com",
  // TODO: Point this at your hosted resume PDF (ex: /resume.pdf in public or a cloud link).
  resumeUrl: "/matthew-cue_resume.pdf",
  aboutShort:
    "Entry-level IT support / sysadmin, focused on making systems usable and learning cloud and security as I go.",
  social: [
    { label: "GitHub", url: "https://github.com/matthewcue" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/matthew-cue-09b100167" }
  ]
};

export default profile;
