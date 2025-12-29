const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeOldArticles() {
  const { data } = await axios.get("https://beyondchats.com/blogs/");
  const $ = cheerio.load(data);

  const articles = [];

  $(".blog-card").slice(-5).each((i, el) => {
    articles.push({
      title: $(el).find("h2").text(),
      sourceUrl: $(el).find("a").attr("href")
    });
  });

  return articles;
}

module.exports = scrapeOldArticles;
