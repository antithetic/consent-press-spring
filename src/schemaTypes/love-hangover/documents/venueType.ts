import {defineField, defineType} from 'sanity'
import {MapPin} from 'lucide-react'

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