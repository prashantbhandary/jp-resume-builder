import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { POSTS, getPost } from "@/lib/blog";

export const alt = "ResumeJP guide";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Prerender one share image per article.
export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return renderOgImage({
    eyebrow: post?.category ?? "Guide",
    title: post?.cardTitle ?? "Japanese resume guide",
    subtitle: post ? post.readingTime : undefined,
  });
}
