# eiliyaabedini.com

The bilingual personal website of [Eiliya Abedini](https://eiliyaabedini.com) — Senior Android Engineer, AI Builder, and Creator.

- `/` and `/en/` — English home
- `/en/experience/`, `/en/work/`, `/en/content/` — English résumé, projects, and content
- `/fa/` — Persian home
- `/fa/experience/`, `/fa/work/`, `/fa/content/` — Persian résumé, projects, and content
- `/links/` — compact bilingual link hub

Cloudflare serves the English portfolio directly at `/` and redirects visitors from Iran to `/fa/` using request-country metadata. The explicit language routes always remain available.

## Local development

```bash
npm install
npm run dev
```

The site is intentionally built as a restrained, content-first multi-page portfolio using semantic HTML, a shared responsive design system, a small amount of vanilla JavaScript, and a minimal Cloudflare Worker for country-aware root routing. There is no client framework or production JavaScript dependency.

## Deployment

The project is configured for [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/). Cloudflare's Git integration deploys the `main` branch with:

```bash
npm run deploy
```

The public site lives in `public/`, with the edge-routing entry point in `src/worker.js`. No secrets or environment variables are required.

## License

© Eiliya Abedini. All rights reserved.
