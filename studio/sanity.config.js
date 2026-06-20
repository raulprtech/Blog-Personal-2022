import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from '../sanity/schemas'
import { structure } from './structure'

export default defineConfig({
  name: 'raul_pacheco_studio',
  title: 'Raul Pacheco',
  projectId: 'a668buu6',
  dataset: 'production',
  basePath: '/',
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
