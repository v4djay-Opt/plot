import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'page',
  title: 'Landing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Used in the browser tab and SEO metadata.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'e.g. "plots-in-jhajjar"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cityName',
      title: 'City Name',
      type: 'string',
      description: 'Short display name, e.g. "Jhajjar"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'h1Title',
      title: 'Hero H1 Heading',
      type: 'string',
      description: 'Main headline displayed in the page hero.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Hero Intro Text',
      type: 'text',
      rows: 2,
      description: 'Short paragraph below the H1 in the hero.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body Description',
      type: 'text',
      rows: 5,
      description: 'Longer paragraph used in the page body / about section.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'region',
      title: 'State / Region',
      type: 'string',
      options: {
        list: [
          { title: 'Haryana', value: 'Haryana' },
          { title: 'Uttar Pradesh', value: 'Uttar Pradesh' },
        ],
      },
      initialValue: 'Haryana',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sectors',
      title: 'Sectors / Micro-locations',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Sector names used for the filter chips.',
    }),
    defineField({
      name: 'bullets',
      title: 'Key Bullets',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'desc', title: 'Description', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Shield / Trust', value: 'shield' },
                  { title: 'Trend / Growth', value: 'trend' },
                  { title: 'Pin / Location', value: 'pin' },
                ],
              },
              initialValue: 'shield',
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'nearby',
      title: 'Nearby Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'href', title: 'URL', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'detail', title: 'Detail Text', type: 'string', validation: (Rule) => Rule.required() }),
          ],
        },
      ],
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'q', title: 'Question', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'a', title: 'Answer', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
          ],
        },
      ],
    }),
    defineField({
      name: 'priceTable',
      title: 'Price Table Rows',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'sector', title: 'Sector / Area', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'size', title: 'Plot Size Range', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'priceRange', title: 'Price Range', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'approval', title: 'Approval Type', type: 'string', initialValue: 'RERA' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'investorPoints',
      title: 'Investor Bullet Points',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'homebuyerPoints',
      title: 'Homebuyer Bullet Points',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'siteVisitSteps',
      title: 'Site Visit Steps',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'seoPriceRange',
      title: 'SEO Price Range',
      type: 'object',
      fields: [
        defineField({ name: 'low', title: 'Low Price (INR)', type: 'number', initialValue: 0 }),
        defineField({ name: 'high', title: 'High Price (INR)', type: 'number', initialValue: 0 }),
      ],
    }),
    defineField({
      name: 'locationMatchPattern',
      title: 'Location Match Pattern',
      type: 'string',
      description: 'Regex pattern to match plots, e.g. "jhajjar"',
      validation: (Rule) => Rule.required(),
    }),
    // SEO
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
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt Text' }),
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Disable to hide this page from the site.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      cityName: 'cityName',
      isActive: 'isActive',
    },
    prepare(selection) {
      const { title, cityName, isActive } = selection;
      return {
        title: title || 'Untitled Page',
        subtitle: `${cityName || ''} ${isActive ? '' : '(inactive)'}`,
      };
    },
  },
});
