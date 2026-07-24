import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    seoTitle: z.string(),
    description: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    author: z.string(),
    reviewer: z.string().optional(),
    featuredImage: z.string(),
    imageAttribution: z.string(),
    imageSource: z.string(),
    publishedDate: z.string(),
    updatedDate: z.string(),
    readingTime: z.number(),
    scienceFacts: z.array(z.string()),
    faqs: z.array(z.object({ question: z.string(), answer: z.string() })),
    references: z.array(z.object({ title: z.string(), url: z.string() })),
    relatedArticles: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
