import { projectsQuery, singleProjectQuery } from '@/utils/supaQueries'
import type { Projects, SingleProject } from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'

export const useProjectStore = defineStore('projcets-store', () => {
  const projects = ref<Projects | null>(null)
  const project = ref<SingleProject | null>(null)

  const loadProjects = useMemoize(async (_key: string) => await projectsQuery)
  const loadProject = useMemoize(async (slug: string) => await singleProjectQuery(slug))

  interface ValidateCache {
    ref: typeof project | typeof projects
    query: typeof projectsQuery | typeof singleProjectQuery
    key: string
    loaderfn: typeof loadProjects | typeof loadProject
  }

  const validateCache = ({ ref, query, key, loaderfn }: ValidateCache) => {
    if (ref.value) {
      const finalQuery = typeof query === 'function' ? query(key) : query

      finalQuery.then(({ data, error }) => {
        if (JSON.stringify(ref.value) === JSON.stringify(data)) {
          console.log('Čached and fresh data matched!')
        } else {
          console.log('šomething has changed')
          loaderfn.delete(key)

          if (!error && data) {
            ref.value = data
          }
        }
      })
    }
  }

  const getProjects = async () => {
    const { data, error, status } = await loadProjects('projects')

    if (error) useErrorStore().setError({ error, customCode: status })

    if (data) {
      projects.value = data
    }

    validateCache({
      ref: projects,
      query: projectsQuery,
      key: 'projects',
      loaderfn: loadProjects,
    })
  }

  const getProject = async (slug: string) => {
    const { data, error, status } = await loadProject(slug)

    if (error) useErrorStore().setError({ error, customCode: status })

    if (data) {
      project.value = data
    }

    validateCache({
      ref: project,
      query: singleProjectQuery,
      key: slug,
      loaderfn: loadProject,
    })
  }

  return {
    projects,
    project,
    getProject,
    getProjects,
  }
})
