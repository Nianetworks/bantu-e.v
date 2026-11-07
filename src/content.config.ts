import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Projects: one Markdown file per language with the same file name,
 * e.g. src/content/projects/de/p26-224-erde-saat-erbe.md + .../en/p26-224-erde-saat-erbe.md
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    summary: z.string(),
    code: z.string().optional(),
    programme: z.enum(['international', 'inland']),
    status: z.enum(['active', 'completed', 'planned']),
    country: z.string(),
    location: z.string().optional(),
    period: z.string(),
    start: z.coerce.date().optional(),
    end: z.coerce.date().optional(),
    partners: z.array(z.string()).default([]),
    funders: z.array(z.string()).default([]),
    /** Exact funding sentence required by the funder (shown in a box at the end of the page) */
    fundingNote: z.string().optional(),
    fundingLogos: z.array(z.object({ src: z.string(), alt: z.string(), width: z.number().default(160) })).default([]),
    disclaimer: z.string().optional(),
    sdgs: z.array(z.number()).default([]),
    stats: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    /** Shown on the placeholder until a real photo exists (see docs/04_Foto-Briefing.md) */
    photoBrief: z.string().optional(),
    featured: z.boolean().default(false),
    successStory: z.boolean().default(false),
    order: z.number().default(100),
    draft: z.boolean().default(false),
    /** Internal: documents the text is based on. Not rendered. */
    sources: z.array(z.string()).default([]),
  }),
});

/** News, events and announcements (same idea: de/ + en/ folders). */
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    type: z.enum(['news', 'event', 'announcement']),
    summary: z.string(),
    eventStart: z.coerce.date().optional(),
    eventEnd: z.coerce.date().optional(),
    eventTime: z.string().optional(),
    location: z.string().optional(),
    registration: z.string().optional(),
    registrationLabel: z.string().optional(),
    cost: z.string().optional(),
    /** Show in the bar at the top of every page until this date */
    pinUntil: z.coerce.date().optional(),
    project: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    attachment: z.object({ href: z.string(), label: z.string() }).optional(),
    draft: z.boolean().default(false),
    sources: z.array(z.string()).default([]),
  }),
});

export const collections = { projects, news };
