const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeExternalArticle(url) {
  const { data } = await axios.get(url, {
    headers: { "User-Agent": "Mozilla/5.0" }
  });

  const $ = cheerio.load(data);

  let content =
    $("article").text() ||
    $("main").text() ||
    $("div[class*='content']").text();

  return content.replace(/\s+/g, " ").trim().slice(0, 5000);
}

module.exports = scrapeExternalArticle;
