import { defineCollection, z } from 'astro:content';

const pillarsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    focus: z.string(),
    tags: z.array(z.string()),
    order: z.number(),
  }),
});

export const collections = {
  'pillars': pillarsCollection,
};