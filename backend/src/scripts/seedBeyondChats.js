require("dotenv").config();
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const Article = require("../models/Article");

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("DB Name:", mongoose.connection.name);

  console.log("MongoDB connected");
}

async function scrapeOldestArticles() {
  const { data } = await axios.get("https://beyondchats.com/post-sitemap.xml");
  const $ = cheerio.load(data, { xmlMode: true });

  const blogUrls = [];

  $("url > loc").each((_, el) => {
    const url = $(el).text().trim();
    if (url.includes("/blogs/")) {
      blogUrls.push(url);
    }
  });

  console.log("Total blog URLs found:", blogUrls.length);

  const oldestFive = blogUrls.slice(-5);

  for (const url of oldestFive) {
    const articlePage = await axios.get(url);
    const $$ = cheerio.load(articlePage.data);

    const title = $$("h1").first().text().trim();

    let content =
      $$("main").html() ||
      $$("article").html() ||
      $$("div[class*='content']").html();

    if (!content) {
      content = $$("body").html();
    }

    console.log("Extracted:", title, "Length:", content.length);

    if (!title || !content) {
      console.log(`Skipped: ${url}`);
      continue;
    }

    const exists = await Article.findOne({ title });
    if (exists) {
      console.log(`Already exists: ${title}`);
      continue;
    }

    await Article.create({
      title,
      content,
      sourceUrl: url,
      isUpdated: false,
      references: [],
    });

    console.log(`Saved: ${title}`);
  }
}

(async function run() {
  try {
    await connectDB();
    await scrapeOldestArticles();
    console.log("Phase 1 complete");
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    process.exit(0);
  }
})();
