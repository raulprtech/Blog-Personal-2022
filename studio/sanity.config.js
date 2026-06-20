import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from '../sanity/schemas'

export default defineConfig({
  name: 'raul_pacheco_studio',
  title: 'Raul Pacheco',
  projectId: 'a668buu6',
  dataset: 'production',
  basePath: '/',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
