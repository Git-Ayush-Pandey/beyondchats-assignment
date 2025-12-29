require("dotenv").config();
const axios = require("axios");
const mongoose = require("mongoose");
const { getJson } = require("serpapi");
const cheerio = require("cheerio");
const OpenAI = require("openai");
const Article = require("../models/Article");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function scrapeArticle(url) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  return $("article").text().slice(0, 4000);
}

async function googleSearch(query) {
  const result = await getJson({
    q: query,
    engine: "google",
    api_key: process.env.SERP_API_KEY
  });

  return result.organic_results
    .filter(r => r.link && !r.link.includes("beyondchats"))
    .slice(0, 2)
    .map(r => r.link);
}

async function rewriteArticle(original, ref1, ref2) {
  const prompt = `
Rewrite the original article using insights from two reference articles.
Improve structure, clarity, and formatting.
Avoid plagiarism.
Return valid HTML.

ORIGINAL:
${original}

REFERENCE 1:
${ref1}

REFERENCE 2:
${ref2}
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  return completion.choices[0].message.content;
}

async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  const articles = await Article.find({ isUpdated: false });

  for (const article of articles) {
    console.log(`Processing: ${article.title}`);

    const links = await googleSearch(article.title);
    if (links.length < 2) continue;

    const refContent1 = await scrapeArticle(links[0]);
    const refContent2 = await scrapeArticle(links[1]);

    const updatedContent = await rewriteArticle(
      article.content,
      refContent1,
      refContent2
    );

    await Article.create({
      title: article.title,
      content: updatedContent + `
        <h3>References</h3>
        <ul>
          <li><a href="${links[0]}">${links[0]}</a></li>
          <li><a href="${links[1]}">${links[1]}</a></li>
        </ul>
      `,
      sourceUrl: article.sourceUrl,
      isUpdated: true,
      references: links
    });

    console.log(`Updated article published: ${article.title}`);
  }

  process.exit(0);
}

run();
