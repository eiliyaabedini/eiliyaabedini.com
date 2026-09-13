# eiliyaabedini.com

The bilingual personal website of [Eiliya Abedini](https://eiliyaabedini.com) — Senior Android Engineer, AI Builder, and Creator.

- `/en/` — English engineering portfolio
- `/fa/` — Persian creator-first portfolio
- `/links/` — compact bilingual social link hub
- `/` — remembers or infers the visitor's language, with a visible manual choice

## Local development

```bash
npm install
npm run dev
```

The site is intentionally built with semantic HTML, modern CSS, and a small amount of vanilla JavaScript. There is no client framework or production JavaScript dependency.

## Deployment

The project is configured for [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/). Cloudflare's Git integration deploys the `main` branch with:

```bash
npm run deploy
```

The public site lives in `public/`. No secrets or environment variables are required.

## License

© Eiliya Abedini. All rights reserved.
