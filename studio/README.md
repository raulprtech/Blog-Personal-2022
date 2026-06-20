# Sanity Studio

This folder contains the Sanity Studio for editing the site content.

## Local setup

```bash
cd studio
npm install
npm run dev
```

The Studio will open locally, usually at `http://localhost:3333`.

## Deploy Studio

```bash
cd studio
npm run deploy
```

Sanity will ask for a Studio hostname the first time you deploy. A good option is:

```txt
raul-pacheco
```

That would create a Studio URL similar to:

```txt
https://raul-pacheco.sanity.studio
```

## Content types

- `Update`: career updates, talks, papers, announcements.
- `Project`: projects with image, role, tags, status and link.
- `Resource`: curated links to papers, blogs, books, repos and datasets.
- `Trajectory item`: education, work, teaching, editorial and research milestones.
