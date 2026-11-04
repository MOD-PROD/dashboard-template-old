<script setup lang="ts">
const apps = [
  { name: 'QuantiX 3D', url: 'https://quantix3d.modprod.app/', detail: 'Gestion de l’impression 3D et des consommables', icon: 'i-lucide-printer' },
  { name: 'APK Factory', url: 'https://apk-factory.modprod.app/', detail: 'Outils de création d’applications Android', icon: 'i-lucide-smartphone' },
  { name: 'Asset Library', url: 'https://asset-library.modprod.app/', detail: 'Icônes, polices et textures', icon: 'i-lucide-library' },
  { name: 'Asset Studio', url: 'https://asset-studio.modprod.app/', detail: 'Création et export d’assets', icon: 'i-lucide-palette' }
]
</script>
<template>
  <UDashboardPanel id="applications">
    <template #header><UDashboardNavbar title="Applications"><template #leading><UDashboardSidebarCollapse /></template></UDashboardNavbar></template>
    <template #body>
      <div class="space-y-6">
        <div><h1 class="text-2xl font-bold">Écosystème MOD-PROD</h1><p class="mt-2 text-muted">Accès rapide aux applications. Catalogue statique pendant la migration.</p></div>
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <UCard v-for="app in apps" :key="app.name" class="transition hover:shadow-lg">
            <div class="flex gap-4"><div class="rounded-xl bg-primary/10 p-3"><UIcon :name="app.icon" class="size-7 text-primary" /></div><div><h2 class="font-semibold">{{ app.name }}</h2><p class="mt-1 text-sm text-muted">{{ app.detail }}</p></div></div>
            <template #footer><UButton :to="app.url" target="_blank" trailing-icon="i-lucide-external-link" label="Ouvrir l’application" block /></template>
          </UCard>
        </div>
        <UAlert icon="i-lucide-shield-check" color="info" variant="subtle" title="Administration" description="Les réglages, publications et retours arrière restent disponibles dans AppMod jusqu'à leur migration sécurisée." />
        <UButton to="https://admin.modprod.app" target="_blank" color="neutral" variant="outline" icon="i-lucide-sliders-horizontal" label="Accéder à AppMod" />
      </div>
    </template>
  </UDashboardPanel>
</template>
