import { SITE } from '@/config/site';
import { absoluteUrl } from '@/utils/helpers';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  publishedDate?: string;
  updatedDate?: string;
  author?: string;
  canonical?: string;
  noindex?: boolean;
}

export function generateSEO(props: SEOProps) {
  const {
    title,
    description,
    image = '/images/og-default.svg',
    type = 'website',
    publishedDate,
    updatedDate,
    author,
    canonical,
    noindex = false,
  } = props;

  const fullTitle = title.includes(SITE.name) ? title : `${title} | ${SITE.name}`;
  const canonicalUrl = canonical ? absoluteUrl(canonical, SITE.url) : undefined;
  const imageUrl = image.startsWith('http') ? image : absoluteUrl(image, SITE.url);

  return {
    title: fullTitle,
    description,
    canonical: canonicalUrl,
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE.name,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
      type,
      locale: SITE.locale,
      ...(publishedDate && { publishedTime: publishedDate }),
      ...(updatedDate && { modifiedTime: updatedDate }),
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: fullTitle,
      description,
      images: [imageUrl],
      site: SITE.twitter,
    },
    robots: noindex ? 'noindex, nofollow' : 'index, follow',
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    logo: absoluteUrl('/images/logo.svg', SITE.url),
    description: SITE.description,
    email: SITE.email,
    sameAs: [`https://twitter.com/${SITE.twitter.replace('@', '')}`],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function articleSchema(props: {
  title: string;
  description: string;
  image: string;
  publishedDate: string;
  updatedDate: string;
  author: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: props.title,
    description: props.description,
    image: props.image.startsWith('http') ? props.image : absoluteUrl(props.image, SITE.url),
    datePublished: props.publishedDate,
    dateModified: props.updatedDate,
    author: {
      '@type': 'Person',
      name: props.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/images/logo.svg', SITE.url),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': props.url,
    },
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { item: item.url.startsWith('http') ? item.url : absoluteUrl(item.url, SITE.url) }),
    })),
  };
}
