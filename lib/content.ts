import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { cache } from "react";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const PRODUCTS_DIR = path.join(CONTENT_ROOT, "products");
const POSTS_DIR = path.join(CONTENT_ROOT, "posts");

const DEFAULT_IMAGE = "/uploads/placeholder-product.jpg";

export type ProductFrontMatter = {
  name: string;
  category: string;
  description: string;
  specs?: string;
  materials?: string;
  warranty?: string;
  dimensions?: string;
  images?: string[];
  featured?: boolean;
  order?: number;
};

export type ProductSummary = {
  slug: string;
  name: string;
  category: string;
  excerpt: string;
  coverImage: string;
  featured: boolean;
};

export type ProductDetail = ProductSummary & {
  materials?: string;
  warranty?: string;
  dimensions?: string;
  specs?: string;
  gallery: string[];
  body: React.ReactElement;
};

export type PostFrontMatter = {
  title: string;
  date: string;
  cover?: string;
  excerpt: string;
  author?: string;
  tags?: string[];
};

export type PostSummary = {
  slug: string;
  title: string;
  date: string;
  displayDate: string;
  excerpt: string;
  coverImage: string;
};

export type PostDetail = PostSummary & {
  body: React.ReactElement;
  author?: string;
  tags?: string[];
};

const formatter = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function formatDate(dateInput: string) {
  const date = new Date(dateInput);
  return formatter.format(date);
}

async function listMarkdownFiles(dir: string) {
  const files = await fs.readdir(dir);
  return files.filter((file) => file.endsWith(".mdx"));
}

async function readFile<T extends ProductFrontMatter | PostFrontMatter>(
  directory: string,
  slug: string
) {
  const filePath = path.join(directory, `${slug}.mdx`);
  const file = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(file);
  return { data: data as T, content };
}

function ensureImage(image?: string) {
  if (!image) return DEFAULT_IMAGE;
  if (image.startsWith("http") || image.startsWith("/")) return image;
  return `/uploads/${image}`;
}

export const listProducts = cache(async (): Promise<ProductSummary[]> => {
  const files = await listMarkdownFiles(PRODUCTS_DIR);
  const products = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const { data } = await readFile<ProductFrontMatter>(PRODUCTS_DIR, slug);

      return {
        slug,
        name: data.name,
        category: data.category,
        excerpt: data.description,
        coverImage: ensureImage(data.images?.[0]),
        order: data.order ?? 999,
        featured: data.featured ?? false,
      };
    })
  );

  return products
    .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
    .map(({ order, ...rest }) => {
      void order;
      return rest;
    });
});

export const listFeaturedProducts = cache(async () => {
  const all = await listProducts();
  const featured = all.filter((item) => item.featured);
  if (featured.length >= 4) {
    return featured.slice(0, 6);
  }
  return all.slice(0, 6);
});

export const getProductCategories = cache(async (): Promise<string[]> => {
  const all = await listProducts();
  const set = new Set(all.map((item) => item.category));
  return Array.from(set);
});

export const getProductBySlug = cache(
  async (slug: string): Promise<ProductDetail | undefined> => {
    try {
      const { data, content } = await readFile<ProductFrontMatter>(
        PRODUCTS_DIR,
        slug
      );

      const { content: body } = await compileMDX({
        source: content,
        options: {
          parseFrontmatter: false,
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [
                rehypeAutolinkHeadings,
                {
                  properties: {
                    className: ["heading-anchor"],
                  },
                },
              ],
            ],
          },
        },
      });

      const gallery = data.images?.map((img) => ensureImage(img)) ?? [
        ensureImage(undefined),
      ];

      return {
        slug,
        name: data.name,
        category: data.category,
        excerpt: data.description,
        coverImage: gallery[0],
        materials: data.materials,
        warranty: data.warranty,
        dimensions: data.dimensions,
        specs: data.specs,
        gallery,
        featured: data.featured ?? false,
        body,
      };
    } catch (error) {
      console.error(`Failed to load product ${slug}`, error);
      return undefined;
    }
  }
);

export const listPosts = cache(async (): Promise<PostSummary[]> => {
  const files = await listMarkdownFiles(POSTS_DIR);

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const { data } = await readFile<PostFrontMatter>(POSTS_DIR, slug);
      return {
        slug,
        title: data.title,
        date: data.date,
        displayDate: formatDate(data.date),
        excerpt: data.excerpt,
        coverImage: ensureImage(data.cover),
      };
    })
  );

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
});

export const listRecentPosts = cache(async (limit = 3) => {
  const posts = await listPosts();
  return posts.slice(0, limit);
});

export const getPostBySlug = cache(
  async (slug: string): Promise<PostDetail | undefined> => {
    try {
      const { data, content } = await readFile<PostFrontMatter>(
        POSTS_DIR,
        slug
      );

      const { content: body } = await compileMDX({
        source: content,
        options: {
          parseFrontmatter: false,
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [
                rehypeAutolinkHeadings,
                {
                  properties: {
                    className: ["heading-anchor"],
                  },
                },
              ],
            ],
          },
        },
      });

      return {
        slug,
        title: data.title,
        date: data.date,
        displayDate: formatDate(data.date),
        excerpt: data.excerpt,
        coverImage: ensureImage(data.cover),
        body,
        author: data.author,
        tags: data.tags ?? [],
      };
    } catch (error) {
      console.error(`Failed to load post ${slug}`, error);
      return undefined;
    }
  }
);

export async function getAllSlugs(directory: string) {
  const files = await listMarkdownFiles(directory);
  return files.map((file) => file.replace(/\.mdx$/, ""));
}
