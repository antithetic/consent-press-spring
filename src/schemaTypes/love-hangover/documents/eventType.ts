import { Disc3 } from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: Disc3,
  groups: [
    {name: 'details', title: 'Details'},
    {name: 'editorial', title: 'Editorial'},
  ],
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      group: ['details', 'editorial'],
    }),
    defineField({
        name: 'slug',
        type: 'slug',
        group: 'details',
        options: {source: 'name'},
        validation: (rule) => rule
        .required()
        .error(`Required to generate a page on the website`), 
        hidden: ({document}) => !document?.name,
    }),
    defineField({
        name: 'eventType',
        type: 'string',
        group: 'details',
        options: {
          list: ['in-person', 'virtual'],
          layout: 'radio',
        },
    }),   
    defineField({
      name: 'date',
      type: 'datetime',
      group: 'details',
    }),
    defineField({
      name: 'doorsOpen',
      type: 'number',
      group: 'details',
    }),
    defineField({
        name: 'venue',
        type: 'reference',
        group: 'details',
        to: [{type: 'venue'}],
        readOnly: ({value, document}) => !value && document?.eventType === 'virtual',
        validation: (rule) =>
          rule.custom((value, context) => {
            if (value && context?.document?.eventType === 'virtual') {
              return 'Only in-person events can have a venue'
            }
      
            return true
          }),
      }),
    defineField({
      name: 'headline',
      type: 'reference',
      to: [{type: 'artist'}],
    }),
    defineField({
      name: 'image',
      type: 'image',
      group: ['details', 'editorial'],
    }),
    defineField({
      name: 'details',
      type: 'array',
      of: [{type: 'block'}],
      group: ['details', 'editorial'],
    }),
    defineField({
      name: 'tickets',
      type: 'url',
      group: 'details',
    }),
  ],
})