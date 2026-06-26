# Sanity setup notes

These schemas mirror the local data files used by the site today:

- `update` -> `data/updatesData.js`
- `project` -> `data/projectsData.js`
- `resource` -> `data/resourcesData.js`
- `trajectoryItem` -> `data/trajectoryData.js`

The Next.js site already knows how to read from Sanity through `lib/content.js` and falls back to local files when Sanity env vars are missing.

To connect it later, create a Sanity project and add these environment variables:

```txt
NEXT_PUBLIC_SANITY_PROJECT_ID=a668buu6
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
SANITY_API_READ_TOKEN=
```

A token is optional for public datasets. Use `SANITY_API_READ_TOKEN` only if the dataset is private. Do not commit the token; add it only to `.env.local` and to your hosting provider environment variables.

## English content and legacy blog migration

The site supports optional English fields through the `english` object in Sanity documents.

Useful commands from the `studio` folder:

```txt
pnpm run patch:english-content
pnpm run generate:legacy-blog
pnpm run import:legacy-blog:missing
pnpm run import:legacy-blog:replace
```

- `patch:english-content` updates only the `english` fields for the main editable pages. It preserves the rest of each document.
- `generate:legacy-blog` converts local Markdown posts from `data/blog` into `studio/import/legacy-blog-notes.ndjson`.
- `import:legacy-blog:missing` imports only notes that do not already exist in Sanity.
- `import:legacy-blog:replace` replaces matching note documents, useful when you want to update existing migrated notes with the generated English drafts.

For `patch:english-content`, set a write token only in your local shell:

```txt
SANITY_API_WRITE_TOKEN=your_write_token_here
```

Do not commit this token. The migration files contain content only, not secrets.

## Spanish accent fixes and referenced draft cleanup

If Sanity shows broken accents such as `t??cnicas`, apply the Spanish fixes patch from the `studio` folder:

```txt
pnpm run patch:spanish-fixes
```

This patch also removes the reference from `paper-anti-leakage-medical-ai` to `drafts.project-histology-ml`. Sanity blocks deleting a document while another document references it, so this unlink step lets you delete the histology draft project if you no longer want it.

You still need a local write token in your shell:

```txt
SANITY_API_WRITE_TOKEN=your_write_token_here
```
