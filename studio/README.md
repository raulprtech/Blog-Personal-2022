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
- `Project`: projects with image, role, tags, status, optional external link and an editable page on this site.
- `Resource`: curated links to papers, blogs, books, repos and datasets.
- `Trajectory item`: education, work, teaching, editorial and research milestones.

## Project pages

Update and redeploy the Studio to see the new fields. Open or create a `Project`, enable
`Publish a project page on this site`, and generate its `Project page URL` from the title.
Use `Project page content` for headings, text, images with captions and code blocks. Add
buttons such as a repository, demo or dataset in `Project page buttons`.

Publishing creates `/projects/your-slug` and `/en/projects/your-slug`. The English version
uses the fields in `English version` with Spanish fallback. Existing project cards and
related-project links automatically open the internal page. An existing external website
remains available as a separate link. Leave the toggle off to keep the current link behavior.
Draft projects do not get public pages. Disable the toggle or unpublish the project to remove
its page. Pages refresh automatically within the existing 60-second regeneration interval;
the revalidation webhook also refreshes project URLs when it receives the project slug.
