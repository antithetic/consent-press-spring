import {MapPin} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const venueType = defineType({
  name: 'venue',
  title: 'Venue',
  type: 'document',
  icon: MapPin,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
  ],
})
