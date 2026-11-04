<script setup lang="ts">
const route = useRoute()
const id = computed(() => String(route.params.id || ''))
const { data: app, status, error } = await useFetch(() => `/api/applications/${encodeURIComponent(id.value)}`)
const statusNames: Record<string, string> = { stable: 'Stable', beta: 'Bêta', bientot: 'Bientôt', masque: 'Masquée' }
</script>

<template>
  <UDashboardPanel id="application-detail">
    <template #header>
      <UDashboardNavbar :title="app?.name || 'Fiche application'">
        <template #leading><UDashboardSidebarCollapse /></template>
        <template #right><UButton to="/applications" color="neutral" variant="ghost" icon="i-lucide-arrow-left" label="Applications" /></template>
      </UDashboardNavbar>
    </template>
    <template #body>
      <div class="mx-auto w-full max-w-4xl space-y-6">
        <div v-if="status === 'pending'" class="text-muted">Chargement de la fiche…</div>
        <UAlert v-else-if="error" color="error" icon="i-lucide-alert-circle" title="Fiche indisponible" description="Cette application n'est pas accessible dans le registre public." />
        <template v-else-if="app">
          <div class="rounded-2xl bg-gradient-to-br from-primary/15 via-primary/5 to-transparent p-6 ring-1 ring-default">
            <div class="flex flex-wrap items-center gap-3">
              <div class="rounded-xl bg-primary/10 p-4"><UIcon name="i-lucide-boxes" class="size-8 text-primary" /></div>
              <div>
                <h1 class="text-3xl font-bold">{{ app.name }}</h1>
                <p v-if="app.tagline" class="mt-1 text-muted">{{ app.tagline }}</p>
              </div>
            </div>
            <p class="mt-5 text-muted">{{ app.description || 'Application de la suite MOD-PROD.' }}</p>
            <div class="mt-5 flex flex-wrap gap-2">
              <UBadge v-if="app.status" color="neutral" variant="subtle">{{ statusNames[app.status] || app.status }}</UBadge>
              <UBadge v-if="app.version" color="primary" variant="subtle">Version {{ app.version }}</UBadge>
            </div>
            <div class="mt-6 flex flex-wrap gap-3">
              <UButton :to="app.url" target="_blank" icon="i-lucide-external-link" label="Ouvrir l'application" />
              <UButton to="https://admin.modprod.app" target="_blank" color="neutral" variant="outline" icon="i-lucide-sliders-horizontal" label="Gérer dans AppMod" />
            </div>
          </div>
          <UCard>
            <template #header><h2 class="font-semibold">Migration de l'administration</h2></template>
            <p class="text-sm text-muted">Cette fiche affiche uniquement les informations du catalogue public. Les paramètres internes, les testeurs, les secrets et les actions de publication ne sont pas exposés dans le nouveau dashboard.</p>
            <p class="mt-3 text-sm text-muted">Les futurs onglets de réglages et de publication seront activés après mise en place de Cloudflare Access et des contrôles d'autorisation côté serveur.</p>
          </UCard>
        </template>
      </div>
    </template>
  </UDashboardPanel>
</template>
