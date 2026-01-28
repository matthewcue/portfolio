// Update this profile data to personalize the site.

export interface SocialLink {
  label: string;
  url: string;
  icon?: string;
}

export interface Profile {
  fullName: string;
  headline: string;
  location: string;
  heroIntro: string;
  heroSubcopy: string;
  email: string;
  social: SocialLink[];
  resumeUrl: string;
  shortBio: string;
  interests?: string[];
}

const profile: Profile = {
  fullName: "Matthew Cue",
  headline: "Entry-Level IT Support / Sysadmin",
  location: "California, USA",
  heroIntro: "Hands-on IT support candidate focused on reliable systems and calm troubleshooting.",
  heroSubcopy:
    "Building homelab projects to sharpen networking, security monitoring, and automation skills.",
  email: "matthew.cue@example.com",
  social: [
    { label: "GitHub", url: "https://github.com/username" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/username" }
  ],
  resumeUrl: "https://example.com/resume.pdf",
  shortBio:
    "I enjoy solving day-to-day IT problems, documenting fixes, and learning cloud fundamentals through small lab projects.",
  interests: ["Homelab automation", "Cloud backups", "Security basics"]
};

export default profile;
