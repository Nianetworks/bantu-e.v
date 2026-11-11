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
    /** Organisation that carried out the project when Bantu e.V. acted as Trägerverein (fiscal sponsor) */
    implementer: z.string().optional(),
    fiscalSponsorship: z.boolean().default(false),
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
    /** Heading above the photo gallery (default: "N Fotos aus dem Austausch") */
    galleryTitle: z.string().optional(),
    /** Downloadable project report (PDF in public/downloads/berichte/): button under the stats and in the side column */
    report: z.object({ href: z.string(), label: z.string(), note: z.string().optional(), alternates: z.array(z.object({ lang: z.string(), name: z.string(), href: z.string() })).default([]) }).optional(),
    /** Photo gallery under the project text, shown as even tiles; a click opens the whole photo in the viewer.
     *  `section`: heading of a themed group (consecutive photos with the same value form one group).
     *  `focus`: CSS object-position for cropping the tile (e.g. "50% 35%"); without it, photos far from 3:2 are shown whole. */
    gallery: z.array(z.object({ src: z.string(), thumb: z.string(), width: z.number(), height: z.number(), thumbWidth: z.number().optional(), thumbHeight: z.number().optional(), alt: z.string(), caption: z.string().optional(), section: z.string().optional(), focus: z.string().optional() })).default([]),
    /** Self-hosted films (no embeds): native players, no autoplay, preload none. `video` = standard film in the large media box
     *  at the top; `video.narrated` = version with spoken photo descriptions (accessibility version) right below it. */
    video: z.object({
      src: z.string(),
      poster: z.string().optional(),
      width: z.number().default(1920),
      height: z.number().default(1080),
      title: z.string(),
      label: z.string(),
      duration: z.string(),
      intro: z.string().optional(),
      tracks: z.array(z.object({ src: z.string(), srclang: z.string(), label: z.string(), default: z.boolean().default(false) })).default([]),
      /** VTT file whose cues are shown on the page as the film's photo descriptions (when there is no narrated version). */
      transcript: z.string().optional(),
      narrated: z.object({
        src: z.string(),
        poster: z.string().optional(),
        heading: z.string(),
        label: z.string(),
        text: z.string(),
        link: z.string(),
        tracks: z.array(z.object({ src: z.string(), srclang: z.string(), label: z.string(), default: z.boolean().default(false) })).default([]),
        transcript: z.string().optional(),
        transcriptLabel: z.string().optional(),
      }).optional(),
    }).optional(),
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
    /** Events page: short name for the agenda ("Ubuntu Talks") and format tag (labels in src/data/events.ts). */
    eventName: z.string().optional(),
    eventKind: z.enum(['training', 'community', 'workshop', 'conference', 'exchange', 'culture', 'tasting', 'celebration', 'art', 'school']).optional(),
    /** Single dates of a series (e.g. four training Saturdays), each listed in the events agenda. */
    sessions: z.array(z.object({ date: z.coerce.date(), title: z.string(), time: z.string().optional() })).default([]),
    /** Show in the bar at the top of every page until this date */
    pinUntil: z.coerce.date().optional(),
    project: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    /** Extra photos below the text. src = path without extension: <src>.jpg (width px) plus <src>-800.webp and <src>-<width>.webp. No EXIF/GPS. */
    photos: z.array(z.object({ src: z.string(), width: z.number(), height: z.number(), alt: z.string(), caption: z.string().optional() })).default([]),
    /** Event flyer/poster shown in the side column with a link to the full image (same file scheme as photos). */
    poster: z.object({ src: z.string(), width: z.number(), height: z.number(), alt: z.string() }).optional(),
    attachment: z.object({ href: z.string(), label: z.string() }).optional(),
    /** Event flyer shown in the main column of an event page: page images (same file scheme as photos) + PDF link. */
    flyer: z.object({
      pdf: z.string(),
      pdfLabel: z.string(),
      pages: z.array(z.object({ src: z.string(), width: z.number(), height: z.number(), alt: z.string(), caption: z.string() })),
    }).optional(),
    draft: z.boolean().default(false),
    sources: z.array(z.string()).default([]),
  }),
});

export const collections = { projects, news };
