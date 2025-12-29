require("dotenv").config();
const mongoose = require("mongoose");
const Article = require("../models/Article");

const googleSearch = require("../services/phase2/googleSearch");
const scrapeExternalArticle = require("../services/phase2/scrapeExternalArticle");
const rewriteWithLLM = require("../services/phase2/rewriteWithLLM");
const publishUpdatedArticle = require("../services/phase2/publishUpdatedArticle");

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected (Phase 2)");

  const originals = await Article.find({ isUpdated: false });

  for (const article of originals) {
  try {
    console.log("Processing:", article.title);

    const links = await googleSearch(article.title);
    if (links.length < 2) continue;

    const ref1 = await scrapeExternalArticle(links[0]);
    const ref2 = await scrapeExternalArticle(links[1]);

    const updatedContent = await rewriteWithLLM(
      article.content,
      ref1,
      ref2
    );

    await publishUpdatedArticle(article, updatedContent, links);

    console.log("Updated article published:", article.title);
    console.log("Waiting before next article...");
    await new Promise(res => setTimeout(res, 12000));

  } catch (err) {
    console.error("Skipping article due to error:", article.title);
    console.error(err.message);
  }
}


  process.exit(0);
}

run();
