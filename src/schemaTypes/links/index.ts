import { defineField, defineType } from 'sanity'
import { CircleUser, Link, CircleSmall } from 'lucide-react'

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
                    { title: 'He/Him', value: 'he-him' },
                    { title: 'She/Her', value: 'she-her' },
                    { title: 'They/Them', value: 'they-them' },
                    { title: 'Custom', value: 'custom' },
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
                hidden: ({ parent }) => parent?.type !== 'custom',
                validation: (Rule) =>
                  Rule.custom((value, context) => {
                    const parent = context.parent as { type?: string };
                    if (parent?.type === 'custom' && !value) {
                      return 'Please enter custom pronouns';
                    }
                    return true;
                  }),
              }
            ],
            preview: {
              select: {
                type: 'type',
                custom: 'custom'
              },
              prepare({ type, custom }) {
                // Define the type for our pronounMap
                const pronounMap: Record<string, string> = {
                  'he-him': 'He/Him',
                  'she-her': 'She/Her',
                  'they-them': 'They/Them',
                  'custom': custom || 'Custom'
                };
                
                // Use type checking to ensure the key exists
                const title = type && pronounMap[type] ? pronounMap[type] : 'Unspecified';
                
                return {
                  title,
                  media: CircleSmall
                };
              }
            }
          }
        ]
      }),
    //   Links configuration: split into two groups
        // Social Media links displayed below header
    //   defineField({
    //     name: 'socialLinks',
    //     title: 'Links to social media profiles',
    //     type: 'string'
    //   }),
      defineField({
        name: 'socialLinks',
        title: 'Social Links',
        type: 'array',
        description:
          "Add links to this member's social media profiles and website",
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
                    { title: 'Website', value: 'website' },
                    { title: 'LinkedIn', value: 'linkedin' },
                    { title: 'Instagram', value: 'instagram' },
                    { title: 'Facebook', value: 'facebook' },
                    { title: 'Twitter', value: 'twitter' },
                    { title: 'TikTok', value: 'tiktok' },
                    { title: 'GitHub', value: 'github' },
                    { title: 'YouTube', value: 'youtube' },
                    { title: 'Bluesky', value: 'bluesky' },
                    { title: 'Other', value: 'other' },
                  ],
                  layout: 'dropdown',
                },
                validation: (Rule) =>
                  Rule.required().error('Please select a platform'),
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
                      if (!value || typeof value !== 'string') return true;
                      const parent = context.parent as {
                        platform: string;
                      } | null;
                      if (!parent) return true;
  
                      const platform = parent.platform;
                      const urlPatterns = {
                        website: /^https?:\/\/.+/,
                        instagram: /^https?:\/\/(www\.)?instagram\.com\/.+/,
                        twitter: /^https?:\/\/(www\.)?twitter\.com\/.+/,
                        tiktok: /^https?:\/\/(www\.)?tiktok\.com\/.+/,
                        facebook: /^https?:\/\/(www\.)?facebook\.com\/.+/,
                        youtube: /^https?:\/\/(www\.)?youtube\.com\/.+/,
                        github: /^https?:\/\/(www\.)?github\.com\/.+/,
                        bluesky: /^https?:\/\/(www\.)?bsky\.app\/.+/,
                        other: /^https?:\/\/.+/,
                      };
  
                      if (
                        platform &&
                        platform !== 'other' &&
                        !urlPatterns[platform as keyof typeof urlPatterns].test(
                          value,
                        )
                      ) {
                        return `Please enter a valid ${platform} URL`;
                      }
  
                      return true;
                    }),
              },
              {
                name: 'name',
                title: 'Website Name',
                type: 'string',
                description:
                  'Name of the website (required for Website and Other platforms)',
                hidden: ({ parent }) =>
                  !['website', 'other'].includes(parent?.platform),
                validation: (Rule) =>
                  Rule.custom((value, context) => {
                    const parent = context.parent as { platform: string } | null;
                    if (
                      parent?.platform &&
                      ['website', 'other'].includes(parent.platform) &&
                      !value
                    ) {
                      return 'Please enter a name for this website';
                    }
                    return true;
                  }),
              },
              {
                name: 'customPlatform',
                title: 'Custom Platform Name',
                type: 'string',
                description:
                  'Enter the name of the platform if you selected "Other"',
                hidden: ({ parent }) => parent?.platform !== 'other',
                validation: (Rule) =>
                  Rule.custom((value, context) => {
                    const parent = context.parent as { platform?: string };
                    if (parent?.platform === 'other' && !value) {
                      return 'Please enter the platform name';
                    }
                    return true;
                  }),
              },
            ],
            preview: {
              select: {
                platform: 'platform',
                name: 'name',
                url: 'url',
              },
              prepare({ platform, name, url }) {
                const title = ['website', 'other'].includes(platform)
                  ? name
                  : platform;
                return {
                  title: title
                    ? title.charAt(0).toUpperCase() + title.slice(1)
                    : 'Untitled',
                  subtitle: url,
                  media: Link,
                };
              },
            },
          },
        ],
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
