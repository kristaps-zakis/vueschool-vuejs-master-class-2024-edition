<script setup lang="ts">
import { useErrorStore } from '@/stores/error'
// import AppErrorDevSection from './AppErrorDevSection.vue'
// import AppErrorProdSection from './AppErrorProdSection.vue'

const router = useRouter()

const errorStore = useErrorStore()
const error = ref(errorStore.activeError)

const message = ref('')
const customCode = ref(0)
const details = ref('')
const code = ref('')
const hint = ref('')
const statusCode = ref(0)

if (error.value && !('code' in error.value)) {
  message.value = error.value.message
  customCode.value = error.value.customCode ?? 0
}

if (error.value && 'code' in error.value) {
  message.value = error.value.message
  // customCode.value = error.value.code
  details.value = error.value.details
  code.value = error.value.code
  hint.value = error.value.hint
  statusCode.value = Number(error.value.statusCode) ?? 0
}
// else {
//   message.value = 'Something went wrong'
//   customCode.value = 500
// }

const hook = router.afterEach(() => {
  // errorStore.activeError = null
  errorStore.clearError()
})

const ErrorTemplate = import.meta.env.DEV
  ? defineAsyncComponent(() => import('./AppErrorDevSection.vue'))
  : defineAsyncComponent(() => import('./AppErrorProdSection.vue'))

onBeforeUnmount(() => {
  hook()
})
</script>

<template>
  <section class="error">
    <!-- <AppErrorDevSection :message :customCode :details :code :hint :status-code /> -->
    <ErrorTemplate
      :message
      :customCode
      :details
      :code
      :hint
      :status-code
      :isCustomError="errorStore.isCustomError"
    />
  </section>
</template>

<style scoped>
@reference "@/assets/globals.css";

.error {
  @apply mx-auto flex justify-center items-center flex-1 p-10 text-center -mt-20 min-h-[90vh];
}

:deep(.error__icon) {
  @apply text-7xl text-destructive;
}

:deep(.error__code) {
  @apply font-extrabold text-7xl text-secondary;
}

:deep(.error__msg) {
  @apply text-3xl font-extrabold text-primary;
}

:deep(.error-footer) {
  @apply flex flex-col items-center justify-center gap-5 mt-6 font-light;
}

:deep(.error-footer__text) {
  @apply text-lg text-muted-foreground;
}

:deep(p) {
  @apply my-2;
}
</style>
