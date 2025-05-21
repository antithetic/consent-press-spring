import {defineField, defineType} from 'sanity'
import {Link} from 'lucide-react'

export const linkType = defineType({
    name: 'link',
  title: 'Link',
  type: 'document',
  icon: Link,
  fields: [
    defineField({
        name: 'title',
        title: 'Title',
        description: 'Title displayed on profile',
        type: 'string',
        validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'url',
        title: 'URL',
        description: 'Valid URL for this link',
        type: 'url',
        validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'description',
        title: 'Description',
        description: 'Short description for this link',
        type: 'text',
        rows: 2,
    })
]  
})
