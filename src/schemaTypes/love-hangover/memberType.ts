import { defineType, defineField } from 'sanity'
import {ScanEye, CircleSmall} from 'lucide-react'

export const memberType = defineType({
    name: 'member',
    title: 'Member',
    type: 'document',
    icon: ScanEye,
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (e) => e.required(),
        }),
        defineField({
            name: 'bio',
            title: 'Member Bio',
            type: 'text',
            rows: 3,
            validation: (e) => e.required(),
            
        }),

        // pronouns
        defineField({
            name: 'pronouns',
            title: 'Pronouns',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  {
                    name: 'type',
                    title: 'Type',
                    type: 'string',
                    options: {
                      list: [
                        {title: 'He/Him', value: 'he-him'},
                        {title: 'She/Her', value: 'she-her'},
                        {title: 'They/Them', value: 'they-them'},
                        {title: 'Custom', value: 'custom'},
                      ],
                      layout: 'dropdown',
                    },
                    validation: (Rule) => Rule.required().error('Please select a pronoun type'),
                  },
                  {
                    name: 'custom',
                    title: 'Custom Pronouns',
                    type: 'string',
                    description: 'Enter custom pronouns',
                    hidden: ({parent}) => parent?.type !== 'custom',
                    validation: (Rule) =>
                      Rule.custom((value, context) => {
                        const parent = context.parent as {type?: string}
                        if (parent?.type === 'custom' && !value) {
                          return 'Please enter custom pronouns'
                        }
                        return true
                      }),
                  },
                ],
                preview: {
                  select: {
                    type: 'type',
                    custom: 'custom',
                  },
                  prepare({type, custom}) {
                    // Define the type for our pronounMap
                    const pronounMap: Record<string, string> = {
                      'he-him': 'He/Him',
                      'she-her': 'She/Her',
                      'they-them': 'They/Them',
                      custom: custom || 'Custom',
                    }
      
                    // Use type checking to ensure the key exists
                    const title = type && pronounMap[type] ? pronounMap[type] : 'Unspecified'
      
                    return {
                      title,
                      media: CircleSmall,
                    }
                  },
                },
              },
            ],
          }),

        defineField({
            name: 'image',
            title: 'Profile Image',
            description: 'Upload a profile image for this team member',
            type: 'image',
            options: {
              hotspot: true,
            },
            fields: [
              defineField({
                name: 'alt',
                type: 'string',
                title: 'Alternative text',
                description: 'Important for SEO and accessibility',
                validation: (Rule) => Rule.required().error('Alt text is required'),
                hidden: ({ parent }) => !parent?.asset?._ref,
              }),
            ],
          }),
        defineField({ 
            type: "string", 
            name: "Website", 
            title: "Website" 
        }),
        defineField({
            type: "string",
            name: "ContactEmail",
            title: "Contact Email",
        }),
    ],
})