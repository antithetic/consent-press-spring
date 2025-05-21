import {defineField, defineType} from 'sanity'

export const linkType = defineType({
    name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
        name: 'url',
        title: 'URL',
        type: 'url',
        validation: Rule => Rule.required()
      },
    {
        name: 'altText',
        title: 'Alt Text',
        type: 'string',
        validation: Rule => Rule.required()
    },
]  
})
