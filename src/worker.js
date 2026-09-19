const PERSIAN_DEFAULT_COUNTRY = "IR";
const YOUTUBE_STATS_PATH = "/api/youtube-channel";
const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@EiliyaAbediniPersian";
const YOUTUBE_CACHE_SECONDS = 30 * 60;

const jsonResponse = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": status === 200 ? `public, max-age=${YOUTUBE_CACHE_SECONDS}` : "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });

const parseSubscriberCount = (html) => {
  const match = html.match(/"content":"([0-9][0-9.,]*[KMB]?) subscribers"/i)
    ?? html.match(/"simpleText":"([0-9][0-9.,]*[KMB]?) subscribers"/i);

  if (!match) return null;

  const formattedSubscriberCount = match[1];
  const subscriberCount = /^[0-9.,]+$/.test(formattedSubscriberCount)
    ? Number(formattedSubscriberCount.replace(/[.,]/g, ""))
    : null;

  return { formattedSubscriberCount, subscriberCount };
};

const fetchYoutubeStats = async (request, context) => {
  const cache = caches.default;
  const cacheKey = new Request(request.url, { method: "GET" });
  const cached = await cache.match(cacheKey);

  if (cached) return cached;

  try {
    const youtubeResponse = await fetch(YOUTUBE_CHANNEL_URL, {
      headers: {
        "Accept-Language": "en-US,en;q=0.9",
        "User-Agent": "Mozilla/5.0 (compatible; EiliyaAbedini.com/1.0)",
      },
    });

    if (!youtubeResponse.ok) throw new Error(`YouTube returned ${youtubeResponse.status}`);

    const statistics = parseSubscriberCount(await youtubeResponse.text());
    if (!statistics) throw new Error("Subscriber count was not present in the public channel page");

    const response = jsonResponse({ ...statistics, fetchedAt: new Date().toISOString() });
    context.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  } catch {
    return jsonResponse({ error: "subscriber_count_unavailable" }, 503);
  }
};

export default {
  async fetch(request, env, context) {
    const url = new URL(request.url);

    if (url.pathname === YOUTUBE_STATS_PATH && request.method === "GET") {
      return fetchYoutubeStats(request, context);
    }

    if (url.pathname !== "/" && url.pathname !== "/index.html") {
      return env.ASSETS.fetch(request);
    }

    const country = request.headers.get("CF-IPCountry") ?? request.cf?.country;

    if (country === PERSIAN_DEFAULT_COUNTRY) {
      return Response.redirect(new URL("/fa/", url), 302);
    }

    const englishUrl = new URL("/en/", url);
    return env.ASSETS.fetch(new Request(englishUrl, request));
  },
};
