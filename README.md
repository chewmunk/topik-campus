# TOPIK Campus

The global learning community for TOPIK learners.

**Learn. Practice. Pass Together.**

Independent TOPIK learning platform. Not affiliated with, endorsed by, or connected to the official TOPIK administering organization.

- Site: [topikcampus.com](https://topikcampus.com)
- Preview: [topikcampus.vercel.app](https://topikcampus.vercel.app)

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4
- next-intl (`/en`, `/ko`, `/vi`, `/id`, `/zh`)
- TanStack Query, Table, and Form

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root path redirects to `/en`.

Copy `.env.example` to `.env.local` if you need to override the public site URL.

## Notes

Community posts are one shared dataset. Locale prefixes change how pages are rendered for SEO, not which community you are in. User-generated translations will be stored in the database later; this release is the marketing shell, SEO, and language switcher.
