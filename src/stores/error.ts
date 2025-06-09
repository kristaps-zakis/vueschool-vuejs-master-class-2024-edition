import type { CustomError, ExtendedPostgresError } from '@/types/error'
import type { PostgrestError } from '@supabase/supabase-js'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | CustomError | ExtendedPostgresError>(null)

  const setError = ({
    error,
    customCode,
  }: {
    error: string | Error | PostgrestError
    customCode?: number
  }) => {
    if (typeof error === 'string') {
      activeError.value = new Error(error)
      activeError.value.customCode = customCode
      return
    }

    // If error has 'hint' property, it's likely a PostgrestError
    if ('hint' in error) {
      activeError.value = error
      ;(activeError.value as ExtendedPostgresError).statusCode = customCode
      return
    }

    // For other types of errors, use the Error object
    if (error instanceof Error) {
      activeError.value = error
      activeError.value.customCode = customCode
    }
  }

  return {
    activeError,
    setError,
  }
})
