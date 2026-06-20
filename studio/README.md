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

## Content types

- `Update`: career updates, talks, papers, announcements.
- `Project`: projects with image, role, tags, status and link.
- `Resource`: curated links to papers, blogs, books, repos and datasets.
- `Trajectory item`: education, work, teaching, editorial and research milestones.
