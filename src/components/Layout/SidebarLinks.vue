<script setup lang="ts">
type LinkProp = {
  title: string
  to?: string
  icon: string
}

const props = defineProps<{
  links: LinkProp[] | []
}>()

const filtredLinks = props.links.filter((link): link is LinkProp & { to: string } => !!link.to)
</script>

<template>
  <RouterLink
    exact-active-class="text-primary bg-muted"
    v-for="link in filtredLinks"
    :key="link.title"
    :to="link.to"
    class="link"
  >
    <iconify-icon :icon="link.icon"></iconify-icon>
    <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
  </RouterLink>

  <div class="nav-link cursor-pointer">
    <!-- <iconify-icon :icon="link.icon"></iconify-icon>
    <span class="hidden lg:block text-nowrap">{{ link.title }}</span> -->
  </div>
</template>

<style scoped>
@reference "@/assets/globals.css";

:deep(.nav-link) {
  @apply flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground;
}
</style>
