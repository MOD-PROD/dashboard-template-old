import { defineEventHandler, createError } from 'h3'

type RegistryApp = {
  id: string
  name: string
  url: string
  description?: string
  tagline?: string
  version?: string
  status?: string
  order?: number
}

const SOURCE = 'https://modprod.app/modprod.json'

function isModprodUrl(value: unknown): value is string {
  if (typeof value !== 'string') return false
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && (url.hostname === 'modprod.app' || url.hostname.endsWith('.modprod.app'))
  } catch {
    return false
  }
}

export default defineEventHandler(async () => {
  let raw: unknown
  try {
    raw = await $fetch<unknown>(SOURCE, { timeout: 5000 })
  } catch {
    throw createError({ statusCode: 503, statusMessage: 'Registre MOD-PROD indisponible' })
  }

  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    throw createError({ statusCode: 502, statusMessage: 'Registre invalide' })
  }

  const data = raw as Record<string, unknown>
  if (data['modprod-suite'] !== 1 || !Array.isArray(data.apps)) {
    throw createError({ statusCode: 502, statusMessage: 'Format de registre incompatible' })
  }

  const apps: RegistryApp[] = data.apps
    .filter((item): item is Record<string, unknown> => !!item && typeof item === 'object' && !Array.isArray(item))
    .filter(item => typeof item.id === 'string' && /^[a-z0-9-]{1,64}$/.test(item.id) && typeof item.name === 'string' && isModprodUrl(item.url))
    .slice(0, 100)
    .map(item => ({
      id: item.id as string,
      name: (item.name as string).slice(0, 120),
      url: item.url as string,
      description: typeof item.description === 'string' ? item.description.slice(0, 240) : undefined,
      tagline: typeof item.tagline === 'string' ? item.tagline.slice(0, 120) : undefined,
      version: typeof item.version === 'string' ? item.version.slice(0, 40) : undefined,
      status: typeof item.status === 'string' && ['stable', 'beta', 'bientot', 'masque'].includes(item.status) ? item.status : undefined,
      order: typeof item.order === 'number' && Number.isFinite(item.order) ? item.order : undefined
    }))
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.name.localeCompare(b.name, 'fr'))

  return { source: 'modprod-suite', updated: typeof data.updated === 'string' ? data.updated : null, apps }
})
