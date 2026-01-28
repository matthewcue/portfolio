// Add new writing entries here. Keep body as an array of short paragraphs.

export type PostCategory =
  | "lab-note"
  | "how-to"
  | "reflection"
  | "career"
  | "other";

export interface Post {
  slug: string;
  title: string;
  category: PostCategory;
  date: string;
  summary: string;
  tags?: string[];
  body: string[];
}

export const posts: Post[] = [
  {
    slug: "debugging-wifi-like-an-it-tech",
    title: "Debugging Wi-Fi Like an IT Tech",
    category: "how-to",
    date: "2024-09-14",
    summary:
      "A short checklist for diagnosing weak Wi-Fi before escalating to a router swap.",
    tags: ["wifi", "support"],
    body: [
      "I start by confirming the issue is isolated to a single device or the entire network.",
      "Then I gather signal strength, check channel congestion, and validate firmware versions.",
      "Finally, I document the steps taken so the next tech can pick up quickly."
    ]
  },
  {
    slug: "first-homelab-lessons",
    title: "First Homelab Lessons",
    category: "reflection",
    date: "2024-12-20",
    summary: "Three small mistakes I made while building my first homelab.",
    tags: ["homelab", "learning"],
    body: [
      "I underestimated how much time labeling cables would save.",
      "I skipped monitoring at first, which made troubleshooting harder.",
      "Now I write a short runbook after each lab experiment."
    ]
  }
];

export default posts;
