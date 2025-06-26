import type { ColumnDef } from '@tanstack/vue-table'
import type { Projects } from '../supaQueries'
import { RouterLink } from 'vue-router'
import type { Ref } from 'vue'
import type { GroupedCollabs } from '@/types/GroupedCollabs'
import Avatar from '@/components/ui/avatar/Avatar.vue'
import AvatarFallback from '@/components/ui/avatar/AvatarFallback.vue'
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue'
import AppInPlaceEditStatus from '@/components/AppInPlaceEdit/AppInPlaceEditStatus.vue'

export const projectsColumns = (collabs: Ref<GroupedCollabs>): ColumnDef<Projects[0]>[] => [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-start' }, 'Name'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/projects/${row.original.slug}`,
          class: 'text-start font-medium hover:bg-muted block w-full',
        },
        () => row.original.name,
      )
    },
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-start' }, 'Status'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-start font-medium' },
        h(AppInPlaceEditStatus, { modelValue: row.original.status, readonly: true }),
      )
    },
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-start font-medium' }, 'Collaborators'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-start font-medium' },
        collabs.value[row.original.id]
          ? collabs.value[row.original.id].map((collab) => {
              return h(
                RouterLink,
                {
                  to: `/users/${collab.username}`,
                },
                () => {
                  return h(Avatar, { class: 'flex hover:scale-110 transition-transform' }, () =>
                    h(AvatarImage, { src: collab.avatar_url || '' }),
                  )
                },
              )
              //
            })
          : row.original.collaborators.map(() => {
              return h(Avatar, { class: 'animate-pulse' }, () => h(AvatarFallback))
            }),
      )
    },
  },
]

//  return h(Avatar, () => h(AvatarFallback, { class: 'bg-muted' }, ''))
