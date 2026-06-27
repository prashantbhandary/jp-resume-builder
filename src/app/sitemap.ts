import type { MetadataRoute } from "next";
import { POSTS } from "@/lib/blog";
import { TOOLS } from "@/lib/tools";

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

  const toolPages: MetadataRoute.Sitemap = TOOLS.map((t) => ({
    url: `${SITE_URL}/tools/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
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
      url: `${SITE_URL}/shokumu-keirekisho`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [og("/shokumu-keirekisho")],
    },
    {
      url: `${SITE_URL}/examples`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [og("/examples")],
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
      url: `${SITE_URL}/tools`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...toolPages,
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
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/disclaimer`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
