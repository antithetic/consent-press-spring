import {UserRound, CircleSmall, Link} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const artistType = defineType({
  name: 'artist',
  title: 'Artist',
  type: 'document',
  icon: UserRound,
  groups: [
    { name: 'editorial', title: 'Editorial', default: true },
    { name: 'details', title: 'Details' },
    { name: 'metadata', title: 'Metadata' },
  ],
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      group: 'editorial',
      validation: (Rule) => Rule.required().error('Name is required'),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      description: 'How this event will be referenced on the website',
      group: 'metadata',
      options: {source: 'name'},
      validation: (Rule) => Rule.required().error('Required to generate a page on the website'),
      hidden: ({document}) => !document?.name,
    }),
    defineField({
      name: 'profilePicture',
      title: 'Artist Portrait',
      description: 'Upload a portrait photo of the artist',
      type: 'image',
      group: 'editorial',
    }),
    defineField({
      name: 'bio',
      title: 'Artist Bio',
      description: 'Add a bio for the artist',
      type: 'text',
      group: 'editorial',
    }),
    // pronouns
    defineField({
      name: 'pronouns',
      title: 'Pronouns',
      group: 'details',
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
      name: 'tags',
      title: 'Artist Tags',
      description: 'Tags for the artist',
      type: 'tags',
      group: 'metadata',
      options: {
        allowCreate: true,
        includeFromRelated: 'tags',
      }
    }),

    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      group: 'details',
      type: 'array',
      description: "Add links to the venue's social media profiles and website",
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'Website', value: 'website'},
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'Twitter', value: 'twitter'},
                  {title: 'TikTok', value: 'tiktok'},
                  {title: 'Facebook', value: 'facebook'},
                  {title: 'YouTube', value: 'youtube'},
                  // { title: 'LinkedIn', value: 'linkedin' },
                  {title: 'Other', value: 'other'},
                ],
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.required().error('Please select a platform'),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              description: 'Full URL to the social media profile or website',
              validation: (Rule) =>
                Rule.required()
                  .error('A valid URL is required')
                  .custom((value, context) => {
                    if (!value || typeof value !== 'string') return true
                    const parent = context.parent as {
                      platform: string
                    } | null
                    if (!parent) return true

                    const platform = parent.platform
                    const urlPatterns = {
                      website: /^https?:\/\/.+/,
                      instagram: /^https?:\/\/(www\.)?instagram\.com\/.+/,
                      twitter: /^https?:\/\/(www\.)?twitter\.com\/.+/,
                      tiktok: /^https?:\/\/(www\.)?tiktok\.com\/.+/,
                      facebook: /^https?:\/\/(www\.)?facebook\.com\/.+/,
                      youtube: /^https?:\/\/(www\.)?youtube\.com\/.+/,
                      other: /^https?:\/\/.+/,
                    }

                    if (
                      platform &&
                      platform !== 'other' &&
                      !urlPatterns[platform as keyof typeof urlPatterns].test(value)
                    ) {
                      return `Please enter a valid ${platform} URL`
                    }

                    return true
                  }),
            },
            {
              name: 'name',
              title: 'Website Name',
              type: 'string',
              description: 'Name of the website (required for Website and Other platforms)',
              hidden: ({parent}) => !['website', 'other'].includes(parent?.platform),
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as {platform: string} | null
                  if (
                    parent?.platform &&
                    ['website', 'other'].includes(parent.platform) &&
                    !value
                  ) {
                    return 'Please enter a name for this website'
                  }
                  return true
                }),
            },
            {
              name: 'customPlatform',
              title: 'Custom Platform Name',
              type: 'string',
              description: 'Enter the name of the platform if you selected "Other"',
              hidden: ({parent}) => parent?.platform !== 'other',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as {platform?: string}
                  if (parent?.platform === 'other' && !value) {
                    return 'Please enter the platform name'
                  }
                  return true
                }),
            },
          ],
          preview: {
            select: {
              platform: 'platform',
              name: 'name',
              url: 'url',
            },
            prepare({platform, name, url}) {
              const title = ['website', 'other'].includes(platform) ? name : platform
              return {
                title: title ? title.charAt(0).toUpperCase() + title.slice(1) : 'Untitled',
                subtitle: url,
                media: Link,
              }
            },
          },
        },
      ],
    }),
    
  ],
})
