import type { Core } from '@strapi/strapi';
import termsSeed from './api/terms-and-conditions/content/seed.json';

const PUBLIC_READ: Record<string, string[]> = {
  'api::blog-post.blog-post': ['find', 'findOne'],
  'api::blog-category.blog-category': ['find', 'findOne'],
  'api::author.author': ['find', 'findOne'],
  'api::privacy-policy.privacy-policy': ['find'],
  'api::terms-and-conditions.terms-and-conditions': ['find'],
  'api::event.event': ['find', 'findOne'],
  'api::press-item.press-item': ['find', 'findOne'],
};

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await seedTermsAndConditions(strapi);

    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });
    if (!publicRole) return;

    for (const [uid, actions] of Object.entries(PUBLIC_READ)) {
      for (const action of actions) {
        const name = `${uid}.${action}`;
        const exists = await strapi
          .query('plugin::users-permissions.permission')
          .findOne({ where: { action: name, role: publicRole.id } });
        if (!exists) {
          await strapi
            .query('plugin::users-permissions.permission')
            .create({ data: { action: name, role: publicRole.id } });
        }
      }
    }
  },
};

/** Creates and publishes the Terms and Conditions from the signed-off document, once, if none exist yet. */
async function seedTermsAndConditions(strapi: Core.Strapi) {
  const terms = strapi.documents('api::terms-and-conditions.terms-and-conditions');
  const existing = await terms.findFirst({ status: 'draft' });
  if (existing) return;
  await terms.create({ data: termsSeed as never, status: 'published' });
  strapi.log.info('Seeded Terms and Conditions from content/seed.json');
}
