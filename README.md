# Lien Son Bedding Storefront

A multilingual Next.js 15 (App Router) storefront for Lien Son bedding products. The project ships with Tailwind CSS, Framer Motion micro animations, next-intl internationalisation (vi/zh/ko), MDX driven content, a Decap CMS admin, and a contact form that emails purchase requests via Resend.

## Tech Stack
- Next.js 15 App Router with TypeScript
- Tailwind CSS 4 + custom design tokens
- Framer Motion animations with reduced-motion awareness
- next-intl routing middleware with locale-prefixed paths
- MDX content for products & blog posts
- Decap CMS admin at `/admin`
- Resend email integration via `/api/contact`

## Getting Started
```bash
pnpm install
pnpm dev
```
The app runs at http://localhost:3000. Routes are prefixed with the chosen locale, e.g. `/vi`, `/zh`, `/ko`.

### Production build
```bash
pnpm build
pnpm start
```

## Environment Variables
Create a `.env.local` (or use the provided `.env.example`) with:
```
RESEND_API_KEY=your-resend-key
RESEND_FROM_EMAIL=notifications@yourdomain.com
ADMIN_EMAIL=orders@yourdomain.com
NEXT_PUBLIC_SITE_URL=https://your-production-domain
```
If `RESEND_API_KEY` or `ADMIN_EMAIL` are missing, the contact endpoint logs the request but skips sending email.

## Content & CMS
- Products: `content/products/*.mdx`
- Blog posts: `content/posts/*.mdx`
- Media uploads: `public/uploads`
- Decap CMS: `public/admin/index.html` + `public/admin/config.yml`

Updating content via Decap commits directly to the repository (Git-based backend).

## Scripts
- `pnpm dev` - start dev server
- `pnpm build` - create production build
- `pnpm start` - run production build
- `pnpm lint` - run ESLint

## Deployment
Deploy on Vercel or any Node.js host. Remember to configure the environment variables and enable git-backed Decap CMS (GitHub repo + branch values in `public/admin/config.yml`).
