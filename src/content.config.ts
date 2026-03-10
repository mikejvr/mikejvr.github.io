// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pillars = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/pillars" }),
  schema: z.object({
    title: z.string(),
    focus: z.string(),
    order: z.number(),
    tags: z.array(z.string()),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    pillar: z.string(),
    date: z.date(),
  }),
});

export const collections = { pillars, projects };