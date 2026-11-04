<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const open = ref(false)

const links = [[{
  label: 'Accueil',
  icon: 'i-lucide-house',
  to: '/',
  onSelect: () => {
    open.value = false
  }
}, {
  label: 'Applications',
  icon: 'i-lucide-layout-grid',
  to: '/applications',
  onSelect: () => {
    open.value = false
  }
}, {
  label: 'Console AppMod',
  icon: 'i-lucide-sliders-horizontal',
  to: 'https://admin.modprod.app',
  onSelect: () => {
    open.value = false
  }
}]], [{
  label: 'GitHub MOD-PROD',
  icon: 'i-lucide-message-circle',
  to: 'https://github.com/MOD-PROD/dashboard',
  target: '_blank'
}, {
  label: 'Site MOD-PROD',
  icon: 'i-lucide-info',
  to: 'https://modprod.app',
  target: '_blank'
}]] satisfies NavigationMenuItem[][]

const groups = computed(() => [{
  id: 'links',
  label: 'Navigation',
  items: links.flat()
}, {
  id: 'code',
  label: 'Code source',
  items: [{
    id: 'source',
    label: 'Voir le code de la page',
    icon: 'i-simple-icons-github',
    to: `https://github.com/MOD-PROD/dashboard/blob/main/app/pages${route.path === '/' ? '/index' : route.path}.vue`,
    target: '_blank'
  }]
}])

</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="default"
      v-model:open="open"
      collapsible
      resizable
      class="bg-elevated/25"
      :ui="{ footer: 'lg:border-t lg:border-default' }"
    >
      <template #header="{ collapsed }">
        <TeamsMenu :collapsed="collapsed" />
      </template>

      <template #default="{ collapsed }">
        <UDashboardSearchButton :collapsed="collapsed" class="bg-transparent ring-default" />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[0]"
          orientation="vertical"
          tooltip
          popover
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[1]"
          orientation="vertical"
          tooltip
          class="mt-auto"
        />
      </template>

      <template #footer="{ collapsed }">
        <UserMenu :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>

    <UDashboardSearch :groups="groups" />

    <slot />

    <NotificationsSlideover />
  </UDashboardGroup>
</template>
