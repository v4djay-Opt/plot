import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { presentationTool } from 'sanity/presentation';
import { seoMetaFields } from 'sanity-plugin-seo';
import { schemaTypes } from './schemas';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'plotsgurgaon-studio',
  title: 'PlotsGurgaon Studio',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings'))
              .icon(() => '⚙️'),
            S.divider(),
            S.documentTypeListItem('property').title('Properties'),
            S.documentTypeListItem('city').title('Cities'),
            S.documentTypeListItem('microLocation').title('Micro Locations'),
            S.documentTypeListItem('redirect').title('Redirects'),
          ]),
    }),
    presentationTool({
      previewUrl: {
        origin: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
    }),
    visionTool(),
    seoMetaFields(),
  ],
  schema: {
    types: schemaTypes,
  },
});
