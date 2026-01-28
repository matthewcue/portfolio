// Edit this file to add homelab or security lab entries.

export type LabCategory =
  | "networking"
  | "security"
  | "os"
  | "automation"
  | "cloud"
  | "other";

export interface LabEntry {
  slug: string;
  title: string;
  category: LabCategory;
  date: string;
  summary: string;
  context: string;
  steps: string[];
  lessons: string[];
  relatedProjects?: string[];
}

export const labEntries: LabEntry[] = [
  {
    slug: "pfsense-home-gateway",
    title: "pfSense Home Gateway + VLAN Segmentation",
    category: "networking",
    date: "2024-10-20",
    summary: "Configured pfSense with VLANs to separate lab, guest, and IoT devices.",
    context: "Built to practice firewall rules, routing, and monitoring at home.",
    steps: [
      "Installed pfSense on a mini PC with dual NICs.",
      "Created VLANs for lab, guest, and IoT.",
      "Applied firewall rules and tested connectivity between segments."
    ],
    lessons: [
      "VLAN tagging is easiest to validate with a managed switch and clear naming.",
      "Logging early helps confirm rules are working as intended."
    ],
    relatedProjects: ["homelab-siem"]
  },
  {
    slug: "linux-hardening-baseline",
    title: "Linux Hardening Baseline",
    category: "security",
    date: "2024-12-02",
    summary: "Created a checklist to harden Ubuntu servers for small lab workloads.",
    context: "Wanted a repeatable baseline before hosting services.",
    steps: [
      "Disabled unused services and removed default accounts.",
      "Configured UFW and SSH key-based auth.",
      "Added unattended updates and log monitoring."
    ],
    lessons: [
      "Automating the checklist saves time when rebuilding lab servers.",
      "Documenting defaults prevents missed steps."
    ]
  }
];

export default labEntries;
