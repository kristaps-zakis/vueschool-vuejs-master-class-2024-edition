import type { CustomError } from '@/types/error'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | CustomError>(null)

  const setError = ({ error, customCode }: { error: string; customCode: number }) => {
    // const err = new Error(error) as CustomError
    // err.customCode = customCode
    // activeError.value = err
    activeError.value = Error(error)
    activeError.value.customCode = customCode
  }

  return {
    activeError,
    setError,
  }
})
