import { defineField, defineType } from 'sanity'
import { CircleUser } from 'lucide-react'

export const profileType = defineType({
    name: 'profile',
    title: 'Profile',
    type: 'document',
    icon: CircleUser,
    fields: [
    // General profile information
      defineField({
        name: 'name',
        title: 'Profile Name',
        description: 'To be displayed as the page header.',
        type: 'string',
      }),
      defineField({
        name: 'slug',
        title: 'Slug',
        description: 'Unique URL where profile will be displayed.',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 96,
        },
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'profileImage',
        title: 'Profile Image',
        description: 'Upload a profile image for this profile.',
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
        name: 'bio',
        title: 'Bio',
        description: 'A short one line bio.',
        type: 'pt-string'
      }),
      defineField({
        name: 'pronouns',
        type: 'array',
        description: 'Select the pronouns that apply to profile.',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'type',
                title: 'Pronoun Type',
                type: 'string',
                options: {
                  list: [
                    { title: 'He/Him', value: 'he/him' },
                    { title: 'She/Her', value: 'she/her' },
                    { title: 'They/Them', value: 'they/them' },
                    { title: 'Other', value: 'other' },
                  ],
                  layout: 'dropdown',
                },
                validation: (Rule) =>
                  Rule.required().error('Please select a pronoun type'),
              },
              {
                name: 'customPronouns',
                title: 'Custom Pronouns',
                type: 'string',
                description: 'Enter custom pronouns if you selected "Other"',
                hidden: ({ parent }) => parent?.type !== 'other',
                validation: (Rule) =>
                  Rule.custom((value, context) => {
                    const parent = context.parent as { type?: string };
                    if (parent?.type === 'other' && !value) {
                      return 'Please enter the custom pronouns';
                    }
                    return true;
                  }),
              },
            ],
          },
        ],
      }),
    //   Links configuration: split into two groups
        // Social Media links displayed below header
      defineField({
        name: 'socialLinks',
        title: 'Links to social media profiles',
        type: 'string'
      }),
        // General Links added by user
    // Profile customization

    // SEO / Meta
    ],
    preview: {
        select: {
          title: 'name',
          media: 'avatar'
        }
      }
  })

export const linksSchemaTypes = [ profileType ]
