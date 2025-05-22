import {Link, Palette} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const linkType = defineType({
  name: 'link',
  title: 'Link',
  type: 'document',
  icon: Link,
  groups: [
    {
      name: 'link',
      title: 'Link',
      icon: Link,
    },
    {
      name: 'style',
      title: 'Style Settings',
      icon: Palette,
    },
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
    }),
    defineField({
      name: 'linkTags',
      title: 'Link Tags',
      description: 'Tags for this link',
      type: 'tags',
      options: {
        allowCreate: true,
      },
    }),
    // Customization for link
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      description: 'Select custom background color',
      group: 'style',
      type: 'simplerColor',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      description: 'Add a background image for this link',
      group: 'style',
      type: 'image',
    }),
  ],
})
