<script setup lang="ts">
type RegistryApp = {
  id: string
  name: string
  url: string
  description?: string
  tagline?: string
  version?: string
  status?: string
}
const { data, status, error, refresh } = await useFetch('/api/registry')
const search = ref('')
const visibleApps = computed(() => (data.value?.apps ?? []).filter(app =>
  (app.name + ' ' + (app.description ?? '') + ' ' + (app.tagline ?? '')).toLocaleLowerCase('fr').includes(search.value.toLocaleLowerCase('fr'))
))
const statusLabel: Record<string, string> = { stable: 'Stable', beta: 'Bêta', bientot: 'Bientôt', masque: 'Masquée' }
const statusColor = (app: RegistryApp) => app.status === 'stable' ? 'success' : app.status === 'beta' ? 'warning' : 'neutral'
</script>

<template>
  <UDashboardPanel id="applications">
    <template #header>
      <UDashboardNavbar title="Applications">
        <template #leading><UDashboardSidebarCollapse /></template>
        <template #right><UButton icon="i-lucide-refresh-cw" color="neutral" variant="ghost" aria-label="Actualiser le registre" :loading="status === 'pending'" @click="refresh()" /></template>
      </UDashboardNavbar>
    </template>
    <template #body>
      <div class="space-y-6">
        <div>
          <h1 class="text-2xl font-bold">Écosystème MOD-PROD</h1>
          <p class="mt-2 text-muted">Catalogue en lecture seule issu du registre officiel publié par AppMod.</p>
        </div>
        <UInput v-model="search" icon="i-lucide-search" placeholder="Rechercher une application..." class="w-full max-w-md" />
        <UAlert v-if="error" color="error" icon="i-lucide-alert-circle" title="Impossible de charger les applications" description="Le registre officiel est momentanément indisponible. Aucun statut n'est inventé." />
        <div v-else-if="status === 'pending'" class="flex items-center gap-3 text-muted"><UIcon name="i-lucide-loader-circle" class="size-5 animate-spin" /> Chargement du registre…</div>
        <div v-else-if="visibleApps.length === 0" class="rounded-xl border border-default p-6 text-muted">Aucune application correspondante.</div>
        <div v-else class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <UCard v-for="app in visibleApps" :key="app.id" class="transition hover:-translate-y-0.5 hover:shadow-lg">
            <div class="flex items-start gap-4">
              <div class="rounded-xl bg-primary/10 p-3"><UIcon name="i-lucide-boxes" class="size-6 text-primary" /></div>
              <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-center gap-2">
                  <h2 class="font-semibold">{{ app.name }}</h2>
                  <UBadge v-if="app.status" :color="statusColor(app)" variant="subtle" size="sm">{{ statusLabel[app.status] ?? app.status }}</UBadge>
                </div>
                <p v-if="app.tagline" class="mt-1 text-sm text-highlighted">{{ app.tagline }}</p>
                <p class="mt-2 text-sm text-muted">{{ app.description || 'Application MOD-PROD' }}</p>
                <p v-if="app.version" class="mt-3 text-xs text-dimmed">Version {{ app.version }}</p>
              </div>
            </div>
            <template #footer><UButton :to="app.url" target="_blank" color="neutral" variant="outline" trailing-icon="i-lucide-external-link" label="Ouvrir l’application" block /></template>
          </UCard>
        </div>
        <UAlert color="info" variant="subtle" icon="i-lucide-shield-check" title="Migration en lecture seule" description="Les statuts affichés proviennent du registre publié par AppMod, pas d'une mesure de disponibilité en temps réel. Les modifications et publications restent dans AppMod." />
        <UButton to="https://admin.modprod.app" target="_blank" color="neutral" variant="outline" icon="i-lucide-sliders-horizontal" label="Administrer dans AppMod" />
      </div>
    </template>
  </UDashboardPanel>
</template>
