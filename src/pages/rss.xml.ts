import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '@/config/site';

export const GET: APIRoute = async (context) => {
  const articles = await getCollection('articles', ({ data }) => !data.draft);

  const sorted = articles.sort(
    (a, b) =>
      new Date(b.data.publishedDate).getTime() - new Date(a.data.publishedDate).getTime()
  );

  return rss({
    title: `${SITE.name} — Science & Space Education`,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: sorted.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: new Date(article.data.publishedDate),
      link: `/articles/${article.slug}/`,
      categories: [article.data.category, ...article.data.tags],
      author: article.data.author,
    })),
    customData: `<language>${SITE.locale}</language>`,
  });
};
