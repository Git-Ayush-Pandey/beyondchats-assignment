const { getJson } = require("serpapi");

async function googleSearch(query) {
  const result = await getJson({
    q: query,
    engine: "google",
    api_key: process.env.SERPAPI_KEY,
  });

  return result.organic_results
    .filter(
      r =>
        r.link &&
        !r.link.includes("beyondchats.com") &&
        !r.link.includes("medium.com")
    )
    .slice(0, 2)
    .map(r => r.link);
}

module.exports = googleSearch;
