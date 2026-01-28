# Portfolio (IT Support / Sysadmin)

A minimal, professional portfolio skeleton for an entry-level IT support / sysadmin / cloud candidate.

## Requirements

- Node.js LTS (20.x recommended)
- npm

## Quick start

```bash
npm install
npm run dev
```

The dev server will print a local URL (usually `http://localhost:5173`).

## Build & preview

```bash
npm run build
npm run preview
```

## Where to edit content (beginner-friendly)

All the content is plain TypeScript arrays so it is easy to edit:

- Projects: `src/content/projects.ts`
- Lab entries: `src/content/labEntries.ts`
- Skills + roadmap: `src/content/skills.ts`
- Writing / posts: `src/content/posts.ts`
- Profile info + links: `src/content/profile.ts`

Each file includes comments and example entries. Duplicate one of the objects and update the fields.

## How the router/layout/theme work (high level)

- `src/App.tsx` sets up **BrowserRouter** and the route tree.
- `src/layout/SiteLayout.tsx` provides the shared navbar, content container, and footer.
- `src/theme/ThemeProvider.tsx` manages the light/dark mode, saves it in localStorage, and keeps the HTML `data-theme` attribute in sync.

## Deployment (GitHub Pages + Actions)

1. Push to `main`.
2. GitHub Actions runs the workflow in `.github/workflows/deploy.yml`.
3. The build output is uploaded and deployed to GitHub Pages.
4. During build, `scripts/copy-404.js` copies `dist/index.html` to `dist/404.html` so deep links work with BrowserRouter.

If you need to trigger a manual deploy, run the workflow from the Actions tab.

---

**Tip:** Update `src/content/profile.ts` first to personalize your name, email, and social links.
