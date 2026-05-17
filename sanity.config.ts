import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { seoMetaFields } from 'sanity-plugin-seo';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  name: 'plotsgurgaon-studio',
  title: 'PlotsGurgaon Studio',
  projectId: '76tdcxev',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings'))
              .icon(() => 'âš™ï¸'),
            S.divider(),
            S.documentTypeListItem('property').title('Properties'),
            S.documentTypeListItem('blogPost').title('Blog Posts'),
            S.documentTypeListItem('city').title('Cities'),
            S.documentTypeListItem('microLocation').title('Micro Locations'),
            S.documentTypeListItem('redirect').title('Redirects'),
          ]),
    }),
    visionTool(),
    seoMetaFields(),
  ],
  schema: {
    types: schemaTypes,
  },
});
