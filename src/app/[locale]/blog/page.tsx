import {setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import PixelTag from "@/components/ui/PixelTag";

type BlogPost = {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
};

type Props = {
  params: Promise<{locale: string}>;
};

function getPosts(locale: string): BlogPost[] {
  const dir = path.join(process.cwd(), "src", "content", "blog", locale);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const {data} = matter(raw);
      return {
        slug: data.slug || file.replace(".mdx", ""),
        title: data.title || "",
        date: data.date || "",
        author: data.author || "",
        excerpt: data.excerpt || "",
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default async function BlogPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const posts = getPosts(locale);
  return <BlogContent posts={posts} locale={locale} />;
}

function BlogContent({posts, locale}: {posts: BlogPost[]; locale: string}) {
  const t = useTranslations("blog");
  const isZh = locale === "zh";

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <PixelTag color="yellow">{isZh ? "研究" : "Research"}</PixelTag>
      <h1>{t("title")}</h1>
      <p className="my-4 opacity-70">
        {isZh
          ? "来自 ARC Prize 基金会的最新研究进展、竞赛公告和社区动态。"
          : "Latest research updates, competition announcements, and community news from ARC Prize Foundation."}
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="card-bg rounded-sm p-6 block hover:bg-white/[0.08] transition-colors"
          >
            <div className="text-[10px] uppercase tracking-wider opacity-50 mb-2">
              {post.date}
            </div>
            <h3 className="text-base mb-2">{post.title}</h3>
            <p className="text-sm opacity-70">{post.excerpt}</p>
            <div className="text-[10px] uppercase tracking-wider text-[var(--yellow)] mt-3">
              {isZh ? "阅读全文 →" : "Read more →"}
            </div>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="opacity-50 text-center py-12">
          {isZh ? "暂无博文。" : "No posts yet."}
        </p>
      )}
    </div>
  );
}
