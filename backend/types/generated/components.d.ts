import type { Schema, Struct } from '@strapi/strapi';

export interface BlogSection extends Struct.ComponentSchema {
  collectionName: 'components_blog_sections';
  info: {
    description: 'A blog post section. Its title appears in the table of contents and links to the section.';
    displayName: 'section';
    icon: 'bulletList';
  };
  attributes: {
    content: Schema.Attribute.Blocks & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface EventVideo extends Struct.ComponentSchema {
  collectionName: 'components_event_videos';
  info: {
    description: 'A video card shown under an event.';
    displayName: 'video';
    icon: 'play';
  };
  attributes: {
    thumbnail: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    videoUrl: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'blog.section': BlogSection;
      'event.video': EventVideo;
    }
  }
}
