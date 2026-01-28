// This file is a read-only view over the Projects and Lab content.
// To add or edit work, update src/content/projects.ts or src/content/labEntries.ts only.
// Optional fields like featured/status can be filled in gradually without breaking the UI.

import { projects, Project } from "./projects";
import { labEntries, LabEntry } from "./labEntries";

export type WorkKind = "project" | "lab";

// High-level track for grouping.
// These should map cleanly to the IT-ish buckets we want to show.
export type WorkTrack =
  | "support"
  | "systems"
  | "networking"
  | "automation"
  | "cloud"
  | "other";

export interface WorkItemBase {
  kind: WorkKind;
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  date?: string;
  skills: string[];
  track: WorkTrack;
  status?: "completed" | "in-progress" | "planned";
  featured?: boolean;
}

export interface WorkProjectItem extends WorkItemBase {
  kind: "project";
  source: "projects";
  project: Project;
}

export interface WorkLabItem extends WorkItemBase {
  kind: "lab";
  source: "lab";
  lab: LabEntry;
}

export type WorkItem = WorkProjectItem | WorkLabItem;

// Map categories/tags into one of the high-level tracks.
// This gives us a single place to tweak grouping behavior later.
function inferTrackFromProject(p: Project): WorkTrack {
  // naive mapping based on category/stack/skills; adjust as needed
  const text = [p.category, ...(p.stack ?? []), ...(p.skillsDemonstrated ?? [])]
    .join(" ")
    .toLowerCase();

  if (text.match(/network|dns|wifi|wi-fi|router|switch/)) return "networking";
  if (text.match(/script|automation|powershell|bash|python/)) return "automation";
  if (text.match(/cloud|aws|azure|gcp/)) return "cloud";
  if (text.match(/server|vm|virtual|linux|windows/)) return "systems";
  if (text.match(/support|help desk|desktop|endpoint/)) return "support";

  return "other";
}

function inferTrackFromLab(entry: LabEntry): WorkTrack {
  switch (entry.category) {
    case "networking":
      return "networking";
    case "automation":
      return "automation";
    case "cloud":
      return "cloud";
    case "os":
      return "systems";
    case "security":
      return "cloud";
    default:
      return "other";
  }
}

function normalizeTagsFromProject(p: Project): string[] {
  const tags = new Set<string>();

  (p.stack ?? []).forEach((tag) => tags.add(tag));
  (p.skillsDemonstrated ?? []).forEach((tag) => tags.add(tag));

  if (p.category) tags.add(p.category);

  return Array.from(tags);
}

function normalizeTagsFromLab(entry: LabEntry): string[] {
  const tags = new Set<string>();

  if (entry.category) tags.add(entry.category);
  (entry.skillsUsed ?? []).forEach((tag) => tags.add(tag));

  return Array.from(tags);
}

const getProjectDate = (project: Project) =>
  project.endDate ?? project.startDate ?? project.date;

export const workItems: WorkItem[] = [
  ...projects.map<WorkProjectItem>((project) => {
    const tags = normalizeTagsFromProject(project);
    const track = inferTrackFromProject(project);

    return {
      kind: "project",
      source: "projects",
      slug: project.slug,
      title: project.title,
      summary: project.summary,
      date: getProjectDate(project),
      status: project.status,
      featured: project.featured,
      tags,
      skills: project.skillsDemonstrated ?? tags,
      track,
      project
    };
  }),
  ...labEntries.map<WorkLabItem>((lab) => {
    const tags = normalizeTagsFromLab(lab);
    const track = inferTrackFromLab(lab);

    return {
      kind: "lab",
      source: "lab",
      slug: lab.slug,
      title: lab.title,
      summary: lab.summary,
      date: lab.date,
      status: lab.status,
      featured: lab.featured,
      tags,
      skills: lab.skillsUsed ?? tags,
      track,
      lab
    };
  })
];
