// Edit this file to add or update projects.
// Each object must match the Project interface so pages can render safely.

export type ProjectCategory = "it-ops" | "security" | "dev" | "data" | "other";

export interface ProjectLink {
  label: string;
  url: string;
  kind?: "github" | "demo" | "doc" | "other";
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  description: string[];
  role: string;
  startDate?: string;
  endDate?: string;
  date?: string;
  stack: string[];
  skillsDemonstrated: string[];
  outcome?: string;
  highlights?: string[];
  links?: ProjectLink[];
  featured?: boolean;
  status?: "completed" | "in-progress" | "planned";
}

export const projects: Project[] = [
  {
    slug: "homelab-siem",
    title: "Home Lab SIEM for Windows Event Logs",
    category: "security",
    summary:
      "Built a small SIEM pipeline to collect, parse, and alert on Windows event logs in a homelab.",
    description: [
      "I wanted hands-on practice with log collection and alerting, so I built a mini SIEM stack using open-source tools.",
      "The lab simulated common Windows security events and sent alerts to a dashboard so I could practice triage."
    ],
    role: "Solo project",
    startDate: "2024-11-01",
    endDate: "2024-12-15",
    stack: ["Windows", "Linux", "Wazuh", "Elastic Stack"],
    skillsDemonstrated: ["Log analysis", "Security monitoring", "Networking"],
    outcome: "Documented repeatable steps and built a reusable alert template library.",
    highlights: [
      "Created custom rules for failed logins and suspicious PowerShell usage.",
      "Mapped alerts to MITRE ATT&CK techniques for practice."
    ],
    links: [
      {
        label: "Project notes",
        url: "https://github.com/username/homelab-siem",
        kind: "github"
      }
    ],
    featured: true,
    status: "completed"
  },
  {
    slug: "automated-backups",
    title: "Automated NAS Backups with PowerShell",
    category: "it-ops",
    summary:
      "Automated weekly backups from a Windows file server to a NAS share with reporting and verification.",
    description: [
      "This project focused on reliable backup automation and clear reporting for non-technical stakeholders.",
      "I created scripts to verify checksums and send summary emails after each run."
    ],
    role: "Solo project",
    startDate: "2025-01-05",
    stack: ["PowerShell", "Windows Server", "Synology NAS"],
    skillsDemonstrated: ["Automation", "Scripting", "Backup strategy"],
    highlights: [
      "Used robocopy with logging and retry logic.",
      "Added checksum verification and summary reporting."
    ],
    links: [
      {
        label: "Script repo",
        url: "https://github.com/username/automated-backups",
        kind: "github"
      }
    ],
    featured: true,
    status: "in-progress"
  }
];

export default projects;
