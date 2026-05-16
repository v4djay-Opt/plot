import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'redirect',
  title: 'Redirect',
  type: 'document',
  fields: [
    defineField({
      name: 'from',
      title: 'From Path',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g. "/old-page"',
    }),
    defineField({
      name: 'to',
      title: 'To Path',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g. "/new-page"',
    }),
    defineField({
      name: 'statusCode',
      title: 'Status Code',
      type: 'number',
      options: {
        list: [
          { title: '301 Permanent', value: 301 },
          { title: '302 Temporary', value: 302 },
        ],
      },
      initialValue: 301,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'note',
      title: 'Note',
      type: 'string',
      description: 'Internal note for team',
    }),
  ],
  preview: {
    select: {
      title: 'from',
      subtitle: 'to',
    },
  },
});
