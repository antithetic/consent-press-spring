import {defineField, defineType} from 'sanity'

export const socialLinksType = defineType({
    name: 'socialLinks',
    title: 'Social Links',
    type: 'object',
    fields: [
        defineField({
          name: 'platform',
          title: 'Platform',
          type: 'string',
          options: {
            list: [
              { title: 'Website', value: 'website' },
              { title: 'LinkedIn', value: 'linkedin' },
              { title: 'Instagram', value: 'instagram' },
              { title: 'Facebook', value: 'facebook' },
              { title: 'Twitter/X', value: 'twitter' },
              { title: 'TikTok', value: 'tiktok' },
              { title: 'YouTube', value: 'youtube' },
              { title: 'GitHub', value: 'github' },
              { title: 'Bluesky', value: 'bluesky' },
              { title: 'Soundcloud', value: 'soundcloud' },
              { title: 'Mixcloud', value: 'mixcloud' },
              { title: 'Spotify', value: 'spotify' },
              { title: 'Other', value: 'other' },
            ],
            layout: 'dropdown',
          },
          validation: (Rule) =>
            Rule.required().error('Please select a platform'),
        }),
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

})