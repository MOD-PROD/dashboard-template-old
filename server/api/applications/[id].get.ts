import { createError, getRouterParam } from 'h3'

type PublicApp = {
  id: string
  name: string
  url: string
  description?: string
  tagline?: string
  version?: string
  status?: string
  order?: number
}

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id || !/^[a-z0-9-]{1,64}$/.test(id)) {
    throw createError({ statusCode: 400, statusMessage: 'Identifiant invalide' })
  }

  // Public catalog only: no private AppMod settings, testers or GitHub credentials.
  const registry = await $fetch<{ apps: PublicApp[] }>('/api/registry', {
    headers: { accept: 'application/json' },
    timeout: 6000
  })
  const app = registry.apps.find(item => item.id === id)
  if (!app) throw createError({ statusCode: 404, statusMessage: 'Application inconnue' })
  return app
})
