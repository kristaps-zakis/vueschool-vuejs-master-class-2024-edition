<script setup lang="ts">
import Button from '../ui/button/Button.vue'

const props = defineProps<{
  message: string
  customCode?: number
  statusCode?: number
  isCustomError: boolean
}>()

const error = ref({
  code: 500,
  msg: 'Ops, something went wrong!',
})

if (props.isCustomError) {
  error.value.code = props.customCode || 500
  error.value.msg = props.message
}

if (props.statusCode === 406) {
  error.value.code = 404
  error.value.msg = "Sorry, we couldn't find this page."
}
</script>

<template>
  <div>
    <iconify-icon icon="lucide:triangle-alert" class="error__icon" />
    <h1 class="error__code">{{ error.code }}</h1>

    <p class="error__msg">{{ error.msg }}</p>

    <div class="error-footer">
      <p class="error-footer__text">You'll find lots to explore on the home page.</p>
      <RouterLink to="/">
        <Button class="max-w-36"> Back to homepage </Button>
      </RouterLink>
    </div>
  </div>
</template>
