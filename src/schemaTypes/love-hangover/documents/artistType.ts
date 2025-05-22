import {User} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const artistType = defineType({
  name: 'artist',
  title: 'Artist',
  type: 'document',
  icon: User,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
  ],
})
