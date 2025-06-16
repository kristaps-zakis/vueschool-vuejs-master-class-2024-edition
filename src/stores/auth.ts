import { supabase } from '@/lib/supabaseClient'
import { profileQuery } from '@/utils/supaQueries'
import type { Session, User } from '@supabase/supabase-js'
import type { Tables } from 'database/types'

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref<null | User>(null)
  const profile = ref<null | Tables<'profiles'>>(null)
  const isTrackingAuthChange = ref(false)

  const setProfile = async () => {
    if (!user.value) {
      profile.value = null
      return
    }

    if (!profile.value || profile.value.id !== user.value.id) {
      const { data, error } = await profileQuery({
        column: 'id',
        value: user.value.id,
      })

      if (error) {
        console.error(error)
      }

      profile.value = data || null
    }
  }

  const setAuth = async (userSession: null | Session = null) => {
    if (!userSession) {
      user.value = null
      profile.value = null
      return
    }

    user.value = userSession.user
    await setProfile()
  }

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession()

    if (data.session?.user) {
      await setAuth(data.session)
    }

    if (error) {
      console.error(error)
    }
  }

  const trackAuthChanges = () => {
    // supabase.auth.onAuthStateChange((event, session) => {
    //   if (event === 'SIGNED_OUT') {
    //     setAuth(null)
    //   }

    //   if (event === 'SIGNED_IN') {
    //     setAuth(session)
    //   }
    // })

    if (isTrackingAuthChange.value) return

    isTrackingAuthChange.value = true

    supabase.auth.onAuthStateChange((event, session) => {
      setTimeout(async () => {
        await setAuth(session)
      }, 0)
    })
  }

  return {
    user,
    profile,
    setAuth,
    getSession,
    trackAuthChanges,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
