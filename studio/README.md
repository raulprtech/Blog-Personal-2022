# Sanity Studio

This folder contains the Sanity Studio for editing the site content.

## Local setup

```bash
cd studio
pnpm install
pnpm run dev
```

The Studio will open locally, usually at `http://localhost:3333`.

From the repository root you can also run:

```bash
npm run studio:install
npm run studio:dev
```

## Deploy Studio

First log in with the Sanity account that owns the project:

```bash
cd studio
pnpm exec sanity login
```

Then deploy the hosted Studio:

```bash
pnpm exec sanity deploy --url raul-pacheco --yes
```

This publishes the panel at:

```txt
https://raul-pacheco.sanity.studio
```

## Import initial content

After logging in, you can load the curated starter content with:

```bash
cd studio
pnpm run import:initial
```

The import includes published examples for each section and draft documents for future or in-progress work. Drafts use Sanity IDs that start with `drafts.` and are excluded from the public site queries.

## Content types

- `Update`: career updates, talks, papers, announcements.
- `Project`: projects with image, role, tags, status and link.
- `Resource`: curated links to papers, blogs, books, repos and datasets.
- `Trajectory item`: education, work, teaching, editorial and research milestones.
