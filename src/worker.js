const PERSIAN_DEFAULT_COUNTRY = "IR";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

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
