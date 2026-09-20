import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const gigs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/gigs" }),
  schema: z.object({
    date: z.coerce.date(),
    venue: z.string(),
    location: z.string(),
    ticketUrl: z.string().url().optional(),
  }),
});

export const collections = { gigs };
