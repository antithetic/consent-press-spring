import {CircleSmall, Link, ScanEye} from 'lucide-react'
import {defineField, defineType} from 'sanity'

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
      name: 'role',
      title: 'Role',
      description: "This team member's role",
      type: 'string',
      validation: (Rule) => Rule.required(),
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
          hidden: ({parent}) => !parent?.asset?._ref,
        }),
      ],
    }),
    // social links
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      description: "Add links to this member's social media profiles and website",
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
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'Facebook', value: 'facebook'},
                  {title: 'Twitter/X', value: 'twitter'},
                  {title: 'TikTok', value: 'tiktok'},
                  {title: 'YouTube', value: 'youtube'},
                  {title: 'GitHub', value: 'github'},
                  {title: 'Bluesky', value: 'bluesky'},
                  {title: 'Soundcloud', value: 'soundcloud'},
                  {title: 'Mixcloud', value: 'mixcloud'},
                  {title: 'Spotify', value: 'spotify'},
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
                      twitter: /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/.+/,
                      tiktok: /^https?:\/\/(www\.)?tiktok\.com\/.+/,
                      facebook: /^https?:\/\/(www\.)?facebook\.com\/.+/,
                      youtube: /^https?:\/\/(www\.)?youtube\.com\/.+/,
                      github: /^https?:\/\/(www\.)?github\.com\/.+/,
                      bluesky: /^https?:\/\/(www\.)?bsky\.app\/.+/,
                      soundcloud: /^https?:\/\/(www\.)?soundcloud\.com\/.+/,
                      mixcloud: /^https?:\/\/(www\.)?mixcloud\.com\/.+/,
                      spotify: /^https?:\/\/(open\.)?spotify\.com\/.+/,
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
              const title = ['website', 'other'].includes(platform)
                ? name
                : platform === 'twitter'
                  ? 'Twitter/X'
                  : platform
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

    // email
    defineField({
      type: 'string',
      name: 'ContactEmail',
      title: 'Contact Email',
    }),
  ],
  // preview
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      pronouns: 'pronouns',
    },
    prepare({title, subtitle, pronouns}) {
      const pronounText = pronouns?.length
        ? pronouns
            .map((p: {type: string; customPronouns?: string}) =>
              p.type === 'other' ? p.customPronouns : p.type,
            )
            .join(', ')
        : ''
      return {
        title,
        subtitle: `${subtitle}${pronounText ? ` (${pronounText})` : ''}`,
      }
    },
  },
})
