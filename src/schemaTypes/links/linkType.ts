import {defineField, defineType} from 'sanity'
import {Link} from 'lucide-react'

export const linkType = defineType({
    name: 'link',
  title: 'Link',
  type: 'document',
  icon: Link,
  groups: [
    {
        default: true,
        name: 'link',
        title: 'Link',
    },
    {
        name: 'style',
        title: 'Style Settings',
    }
  ],
  fields: [
    //  Basic Link info
    defineField({
        name: 'title',
        title: 'Title',
        description: 'Title displayed on profile',
        group: 'link',
        type: 'string',
        validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'url',
        title: 'URL',
        description: 'Valid URL for this link',
        group: 'link',
        type: 'url',
        validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'description',
        title: 'Description',
        description: 'Short description for this link',
        group: 'link',
        type: 'text',
        rows: 2,
        validation: (Rule) => Rule.required(),
    })
    // Customization for link
]  
})
