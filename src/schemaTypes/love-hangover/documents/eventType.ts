import { defineField, defineType } from 'sanity'
import { Disc3 } from 'lucide-react'

export const eventType = defineType({
    name: "event",
    title: "Event",
    type: "document",
    icon: Disc3,
    fields: [
        defineField({
            name: 'name',
            title: 'Event Name',
            type: 'string',
        })
    ],
})