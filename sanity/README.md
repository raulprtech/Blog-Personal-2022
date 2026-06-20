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
