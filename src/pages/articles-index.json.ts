import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { CATEGORY_META, type Category } from '@/config/site';

export const GET: APIRoute = async () => {
  const articles = await getCollection('articles', ({ data }) => !data.draft);

  const index = articles
    .sort(
      (a, b) =>
        new Date(b.data.publishedDate).getTime() - new Date(a.data.publishedDate).getTime()
    )
    .map((article) => ({
      slug: article.slug,
      title: article.data.title,
      description: article.data.description,
      category: article.data.category,
      categoryTitle: CATEGORY_META[article.data.category as Category]?.title ?? article.data.category,
      tags: article.data.tags,
      author: article.data.author,
      publishedDate: article.data.publishedDate,
      readingTime: article.data.readingTime,
      url: `/articles/${article.slug}`,
    }));

  return new Response(JSON.stringify(index), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
