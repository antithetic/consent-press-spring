import {defineField, defineType} from 'sanity'
import {Tags} from 'lucide-react'

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
    ],
})