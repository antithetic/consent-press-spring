import {defineField, defineType} from 'sanity'
import {User} from 'lucide-react'

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