import type { GroupedCollabs } from '@/types/GroupedCollabs'
import { groupedProfileQueries } from '@/utils/supaQueries'
import type { Projects, TasksWithProjects } from '@/utils/supaQueries'

export const useCollabs = () => {
  const groupedCollabs = ref<GroupedCollabs>({})

  const getProfilesByIds = async (uderIds: string[]) => {
    const { data, error } = await groupedProfileQueries(uderIds)

    if (error || !data) return []

    return data
  }

  const getGroupedCollabs = async (items: Projects | TasksWithProjects) => {
    const filtredItems = items.filter((item) => item.collaborators.length)

    const promises = filtredItems.map((item) => getProfilesByIds(item.collaborators))

    const results = await Promise.all(promises)

    filtredItems.forEach((item, index) => {
      groupedCollabs.value[item.id] = results[index]
    })
  }

  return {
    getProfilesByIds,
    getGroupedCollabs,
    groupedCollabs,
  }
}
