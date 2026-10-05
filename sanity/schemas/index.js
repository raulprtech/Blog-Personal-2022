import collaborator from './collaborator'
import credential from './credential'
import note from './note'
import pageContent from './pageContent'
import paper from './paper'
import project from './project'
import resource from './resource'
import researchItem from './researchItem'
import siteSettings from './siteSettings'
import talk from './talk'
import trajectoryItem from './trajectoryItem'
import update from './update'
import venture from './venture'
import { safeHref } from '../../lib/security.cjs'

function validateLinks(schema) {
  const result = { ...schema }
  if (schema.fields) result.fields = schema.fields.map(validateLinks)
  if (schema.of) result.of = schema.of.map(validateLinks)
  if (schema.marks?.annotations) {
    result.marks = { ...schema.marks, annotations: schema.marks.annotations.map(validateLinks) }
  }
  if (['string', 'url'].includes(schema.type) && /(?:href|url)$/i.test(schema.name || '')) {
    result.validation = (Rule) => [
      ...(schema.validation ? [schema.validation(Rule)].flat() : []),
      Rule.custom(
        (value) =>
          !value ||
          Boolean(safeHref(value)) ||
          'Usa una ruta interna o un enlace http, https, mailto o tel.'
      ),
    ]
  }
  return result
}

export const schemaTypes = [
  siteSettings,
  pageContent,
  update,
  note,
  collaborator,
  credential,
  paper,
  project,
  resource,
  researchItem,
  trajectoryItem,
  talk,
  venture,
].map(validateLinks)
