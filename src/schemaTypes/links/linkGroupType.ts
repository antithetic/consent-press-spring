import {Tags} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const linkGroupType = defineType({
  name: 'linkGroup',
  title: 'Link Group',
  type: 'document',
  icon: Tags,
  fields: [
    defineField({
      name: 'groupName',
      title: 'Group Name',
      description: 'Group name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Group Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Unique URL where category will be displayed.',
      type: 'slug',
      options: {
        source: 'groupName',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
