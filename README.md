# nickdoran.dev

Personal portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Font**: IBM Plex Mono
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── app/
│   ├── api/contact/    # Contact form API route (rate-limited)
│   ├── blog/           # Blog listing and post pages
│   ├── layout.tsx      # Root layout with nav, footer, theme
│   ├── page.tsx        # Home page
│   ├── not-found.tsx   # 404 page
│   ├── robots.ts       # robots.txt generation
│   └── sitemap.ts      # sitemap.xml generation
├── components/         # React components
├── content/blog/       # Markdown blog posts
├── lib/
│   ├── blog.ts         # Blog post parsing utilities
│   └── constants.ts    # Site data and project info
└── public/             # Static assets (resume.pdf, favicon, etc.)
```

## Blog

To add a blog post, create a markdown file in `content/blog/`:

```markdown
---
title: "Your Post Title"
date: "2025-01-15"
description: "A short description for previews."
---

Your content here.
```

The file name becomes the URL slug (e.g., `my-post.md` → `/blog/my-post`).

## Contact Form

The contact form uses a server-side API route with:

- Input validation and sanitization
- Rate limiting (3 requests per minute per IP)
- No external dependencies

Currently logs submissions to console. To send emails, integrate a service like Resend — add your API key to `.env.local` (see `.env.example`).

## Customization

- **Site info**: Edit `lib/constants.ts` for name, links, projects, and experience
- **Styling**: Edit `app/globals.css` for colors and theme variables
- **Resume**: Drop your `resume.pdf` into `public/`

## Deploying to Vercel

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Set the root directory to `frontend`
4. Deploy

## Security

- HTTP security headers configured in `next.config.ts`
- Server-side input validation and rate limiting on the contact API
- No client-side API keys or secrets
- HTTPS enforced by Vercel
