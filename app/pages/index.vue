<script setup lang="ts">
const { data, status, error } = await useFetch('/api/registry')
const featured = computed(() => (data.value?.apps ?? []).slice(0, 4))
</script>
<template>
  <UDashboardPanel id="home">
    <template #header><UDashboardNavbar title="MOD-PROD · Control Center"><template #leading><UDashboardSidebarCollapse /></template></UDashboardNavbar></template>
    <template #body>
      <div class="space-y-8">
        <div class="rounded-2xl bg-gradient-to-br from-primary/15 via-primary/5 to-transparent p-6 ring-1 ring-default sm:p-8">
          <UBadge color="primary" variant="subtle" label="Nouvelle génération" />
          <h1 class="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Bienvenue dans MOD-PROD</h1>
          <p class="mt-3 max-w-2xl text-muted">Votre écosystème d'applications, rassemblé dans une console moderne. Migration progressive depuis AppMod.</p>
          <div class="mt-6 flex flex-wrap gap-3">
            <UButton to="/applications" icon="i-lucide-layout-grid" label="Explorer les applications" />
            <UButton to="https://admin.modprod.app" target="_blank" color="neutral" variant="outline" icon="i-lucide-external-link" label="Ouvrir AppMod" />
          </div>
        </div>
        <div>
          <div class="mb-4 flex flex-wrap items-center justify-between gap-3"><h2 class="text-xl font-semibold">Applications MOD-PROD</h2><UButton to="/applications" color="neutral" variant="ghost" trailing-icon="i-lucide-arrow-right" label="Voir le catalogue" /></div>
          <UAlert v-if="error" color="error" variant="subtle" icon="i-lucide-alert-circle" title="Registre indisponible" description="Les applications ne peuvent pas être chargées actuellement." />
          <div v-else-if="status === 'pending'" class="text-muted">Chargement des applications…</div>
          <div v-else class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <UCard v-for="app in featured" :key="app.id" class="transition hover:-translate-y-1 hover:shadow-lg">
              <div class="flex items-start gap-3"><div class="rounded-xl bg-primary/10 p-3"><UIcon name="i-lucide-boxes" class="size-6 text-primary" /></div><div class="min-w-0"><h3 class="font-semibold">{{ app.name }}</h3><p class="mt-1 text-sm text-muted">{{ app.description || app.tagline || 'Application MOD-PROD' }}</p><p v-if="app.version" class="mt-2 text-xs text-dimmed">Version {{ app.version }}</p></div></div>
              <template #footer><UButton :to="app.url" target="_blank" variant="ghost" color="neutral" trailing-icon="i-lucide-external-link" label="Ouvrir" block /></template>
            </UCard>
          </div>
        </div>
        <UAlert color="info" variant="subtle" icon="i-lucide-info" title="Lecture seule" description="Le catalogue provient de modprod.app/modprod.json. Les réglages et les publications restent gérés par AppMod jusqu'à leur migration sécurisée." />
      </div>
    </template>
  </UDashboardPanel>
</template>
