import { defineType, defineField } from 'sanity'
import {ScanEye} from 'lucide-react'

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