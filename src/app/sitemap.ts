import type { MetadataRoute } from "next";
import { POSTS } from "@/lib/blog";

const SITE_URL = "https://www.resumejp.com";

/** Per-route social/share image — also serves as the image-search asset. */
const og = (path: string) => `${SITE_URL}${path === "/" ? "" : path}/opengraph-image`;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const blogPosts: MetadataRoute.Sitemap = POSTS.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.7,
    images: [og(`/blog/${p.slug}`)],
  }));

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      images: [og("/")],
    },
    {
      url: `${SITE_URL}/editor`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/templates`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [og("/templates")],
    },
    {
      url: `${SITE_URL}/arubaito-resume`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [og("/arubaito-resume")],
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
      images: [og("/blog")],
    },
    ...blogPosts,
    {
      url: `${SITE_URL}/guide/how-to-write-a-japanese-resume`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      images: [og("/guide/how-to-write-a-japanese-resume")],
    },
    {
      url: `${SITE_URL}/guide/rirekisho-vs-shokumukeirekisho`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      images: [og("/guide/rirekisho-vs-shokumukeirekisho")],
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
