import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Sold', value: 'sold' },
        ],
        layout: 'radio',
      },
      initialValue: 'available',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'plotType',
      title: 'Plot Type',
      type: 'string',
      options: {
        list: [
          { title: 'Corner Plot', value: 'corner' },
          { title: 'Park Facing', value: 'park-facing' },
          { title: 'Main Road', value: 'main-road' },
          { title: 'Regular', value: 'regular' },
        ],
        layout: 'radio',
      },
      initialValue: 'regular',
    }),
    defineField({
      name: 'price',
      title: 'Price (in Rupees)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'pricePerSqYd',
      title: 'Price per Sq Yd',
      type: 'number',
    }),
    defineField({
      name: 'area',
      title: 'Plot Area (Sq Yd)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{ type: 'microLocation' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.max(10),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Road Access', value: 'Road Access' },
          { title: 'Electricity', value: 'Electricity' },
          { title: 'Water Supply', value: 'Water Supply' },
          { title: 'Boundary Wall', value: 'Boundary Wall' },
          { title: 'Park Nearby', value: 'Park Nearby' },
          { title: 'School Nearby', value: 'School Nearby' },
          { title: 'Metro Nearby', value: 'Metro Nearby' },
        ],
      },
    }),
    defineField({
      name: 'reraNumber',
      title: 'RERA Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'seoImage',
      title: 'SEO Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      status: 'status',
      price: 'price',
      location: 'location.name',
      media: 'images.0',
    },
    prepare(selection) {
      const { title, status, price, location } = selection;
      return {
        title,
        subtitle: `${status === 'available' ? 'Available' : 'Sold'} • ₹${price?.toLocaleString('en-IN')} • ${location || ''}`,
        media: selection.media,
      };
    },
  },
});
