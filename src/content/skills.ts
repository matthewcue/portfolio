// Edit this file to update skills or the roadmap. Keep entries short and focused.

export type SkillLevel = "beginner" | "intermediate" | "advanced";

export interface Skill {
  name: string;
  level: SkillLevel;
  years?: number;
  notes?: string;
  tags?: string[];
}

export interface SkillArea {
  id: string;
  title: string;
  description?: string;
  skills: Skill[];
}

export interface RoadmapItem {
  id: string;
  title: string;
  description?: string;
  targetDate?: string;
  status: "planning" | "in-progress" | "completed";
  category: "certification" | "lab" | "course" | "project" | "other";
}

export const skillAreas: SkillArea[] = [
  {
    id: "support",
    title: "Support & Troubleshooting",
    description: "Day-to-day support fundamentals and diagnostics.",
    skills: [
      {
        name: "Windows 10/11 troubleshooting",
        level: "intermediate",
        notes: "Driver issues, event logs, user profiles",
        tags: ["windows", "support"]
      },
      {
        name: "Ticketing workflows",
        level: "beginner",
        notes: "Documenting issues and solutions",
        tags: ["process"]
      }
    ]
  },
  {
    id: "networking",
    title: "Networking & OS",
    description: "Core networking and server administration practice.",
    skills: [
      {
        name: "TCP/IP fundamentals",
        level: "intermediate",
        notes: "Subnetting, DNS, DHCP",
        tags: ["networking"]
      },
      {
        name: "Linux administration",
        level: "beginner",
        notes: "Users, permissions, systemd",
        tags: ["linux"]
      }
    ]
  },
  {
    id: "automation",
    title: "Automation & Scripting",
    description: "Using scripts to reduce repetitive tasks.",
    skills: [
      {
        name: "PowerShell automation",
        level: "intermediate",
        notes: "Backup scripts, reporting",
        tags: ["scripting", "windows"]
      },
      {
        name: "Bash basics",
        level: "beginner",
        notes: "File operations, cron",
        tags: ["linux", "automation"]
      }
    ]
  }
];

export const roadmapItems: RoadmapItem[] = [
  {
    id: "secplus",
    title: "CompTIA Security+",
    description: "Study labs + practice exams",
    targetDate: "2025-06-01",
    status: "planning",
    category: "certification"
  },
  {
    id: "cloud-lab",
    title: "AWS free tier lab",
    description: "Deploy a small VPC with EC2 + S3 backups",
    status: "in-progress",
    category: "lab"
  }
];

export default { skillAreas, roadmapItems };
