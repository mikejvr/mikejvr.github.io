# Copilot Instructions for `my-portfolio`

This is a **static Astro site** serving a personal/portfolio case-study collection. The codebase is minimal but has a few patterns you'll need to be aware of when making changes or adding new content.

## Project Overview

- Built with [Astro](https://astro.build) (v4), using the default `minimal` starter.
- All routes come from `src/pages` and markdown content under `src/content`.
- Two content collections are defined: `pillars` and `projects`. Each collection has a schema in `src/content.config.ts`.
  - Files that begin with an underscore (`_`) are ignored by the glob loader.
  - `projects` entries reference a `pillar` by slug, and the slug of a project is the markdown filename (no `.md`).
- Layout is handled by `src/layouts/MainLayout.astro`. Components live in `src/components`.
- Assets such as images are placed in `public/assets` and referenced directly from markdown using `<NexusImage src="/assets/…" />`.

## Key Patterns

- **Dynamic pages**: `src/pages/projects/[slug].astro` uses `getStaticPaths` with `getCollection('projects')` to generate routes. It renders the markdown content with `render(project)` and passes `NexusImage` as a custom component.
- **Frontmatter properties**: markdown files for both collections must satisfy the Zod schemas defined in `content.config.ts`. Typical fields you will see:
  ```yaml
  ---
  title: "Some Title"
  pillar: "brand-identity"    # for projects
  description: "..."
  date: 2021-01-15            # for projects
  tags: ["EnvironmentalDesign"]
  order: 1                    # sorting order
  ---
  ```
- **Styling**: global styles are in `src/styles/global.css`. Inline styles are used heavily in pages for layout; avoid moving CSS unless you're refactoring the design.
- **Modal/telemetry code**: `MainLayout.astro` includes a small script for handling image expansion (`.expand-trigger`) and telemetry logging. Keep that in sync if you add another interactive element.

## Developer Workflow

Commands should be run from workspace root (`my-portfolio`):

```sh
npm install              # install deps
npm run dev              # development server at http://localhost:4321
npm run build            # produce production files in ./dist
npm run preview          # preview built site locally
npm run astro -- --help  # run Astro CLI commands (add/check etc.)
```

- Node version is pinned to 20 in GitHub Actions. The `.vscode/launch.json` also shows how to start the dev server for debugging.
- There are no automated tests in the repo; modifications are validated by running the dev server and visual inspection.

## Deployment

The `main` branch triggers `.github/workflows/deploy.yml` which:

1. Checks out the repo, installs Node 20, installs dependencies.
2. Runs `npm run build`.
3. Uploads `./dist` as an artifact and deploys to GitHub Pages.

No environment variables are required.

## Conventions

- Always keep markdown frontmatter in sync with the Zod schemas. A schema violation will fail the build.
- Use kebab-case slugs for both pillars and projects. Filenames drive the route names (`/pillars/environmental-design` etc.).
- Put reusable UI elements in `src/components`. The existing components (Footer, NexusImage) show the pattern: props are destructured at the top, and styling is often scoped with classes.
- Use the `NexusImage` component when embedding images in markdown; it contains accessibility and lazy-loading defaults.
- The project uses global CSS variables (e.g. `--nexus-orange`) defined in `global.css`. Refer to them for colors and fonts.

## Helpful File References

- `astro.config.mjs` – standard Astro config, nothing special.
- `src/content.config.ts` – defines collections + schemas.
- `src/pages/**` – top-level route logic, especially `[slug].astro` for dynamic pages.
- `src/layouts/MainLayout.astro` – wrapper for all pages with modal logic.
- `src/styles/global.css` – global resets and theme variables.
- `public/assets` – static image assets referenced from markdown.

> **Note**: This repo is intentionally small; most work involves authoring or tweaking markdown case studies. When adding new components or routes, follow the established file layout and naming.

Feel free to ask if anything is unclear or if you need more context on any part!  
Once you review, let me know if you'd like more detail anywhere or if I missed an important pattern.