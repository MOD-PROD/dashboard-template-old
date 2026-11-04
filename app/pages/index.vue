<script setup lang="ts">
const apps = [
  { name: 'QuantiX 3D', detail: 'Impression 3D et gestion de stock', icon: 'i-lucide-printer', url: 'https://quantix3d.modprod.app/' },
  { name: 'APK Factory', detail: 'Création et gestion des APK', icon: 'i-lucide-smartphone', url: 'https://apk-factory.modprod.app/' },
  { name: 'Asset Library', detail: 'Bibliothèque d’icônes, polices et textures', icon: 'i-lucide-library', url: 'https://asset-library.modprod.app/' },
  { name: 'Asset Studio', detail: 'Création et préparation des assets', icon: 'i-lucide-palette', url: 'https://asset-studio.modprod.app/' }
]
</script>

<template>
  <UDashboardPanel id="home">
    <template #header>
      <UDashboardNavbar title="MOD-PROD · Control Center">
        <template #leading><UDashboardSidebarCollapse /></template>
      </UDashboardNavbar>
    </template>
    <template #body>
      <div class="space-y-8">
        <div class="rounded-2xl bg-gradient-to-br from-primary/15 via-primary/5 to-transparent p-6 ring-1 ring-default sm:p-8">
          <UBadge color="primary" variant="subtle" label="Nouvelle génération" />
          <h1 class="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Bienvenue dans MOD-PROD</h1>
          <p class="mt-3 max-w-2xl text-muted">Un seul espace pour retrouver vos applications. Les outils d'administration seront transférés progressivement depuis AppMod.</p>
          <div class="mt-6 flex flex-wrap gap-3">
            <UButton to="/applications" icon="i-lucide-layout-grid" label="Explorer les applications" />
            <UButton to="https://admin.modprod.app" target="_blank" color="neutral" variant="outline" icon="i-lucide-external-link" label="Ouvrir AppMod" />
          </div>
        </div>
        <div>
          <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 class="text-xl font-semibold">Applications MOD-PROD</h2>
            <UButton to="/applications" color="neutral" variant="ghost" trailing-icon="i-lucide-arrow-right" label="Toutes les applications" />
          </div>
          <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <UCard v-for="app in apps" :key="app.name" class="transition hover:-translate-y-1 hover:shadow-lg">
              <div class="flex items-start gap-3">
                <div class="rounded-xl bg-primary/10 p-3"><UIcon :name="app.icon" class="size-6 text-primary" /></div>
                <div class="min-w-0"><h3 class="font-semibold">{{ app.name }}</h3><p class="mt-1 text-sm text-muted">{{ app.detail }}</p></div>
              </div>
              <template #footer><UButton :to="app.url" target="_blank" variant="ghost" color="neutral" trailing-icon="i-lucide-external-link" label="Ouvrir" block /></template>
            </UCard>
          </div>
        </div>
        <UAlert color="info" variant="subtle" icon="i-lucide-info" title="Migration progressive" description="Cette première interface présente un catalogue de liens statiques. Elle n'affiche pas encore de données de monitoring ou de statut en temps réel. AppMod reste l'outil d'administration actif." />
      </div>
    </template>
  </UDashboardPanel>
</template>
