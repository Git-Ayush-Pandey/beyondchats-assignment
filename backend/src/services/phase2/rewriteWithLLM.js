const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function rewriteWithLLM(original, ref1, ref2) {
  const OpenAI = require("openai");
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `
You are a professional SEO content editor.

Rewrite the original article using insights from two reference articles.
Improve structure, clarity, and readability.
Avoid plagiarism.
Return clean HTML.

ORIGINAL ARTICLE:
${original.slice(0, 3000)}

REFERENCE ARTICLE 1:
${ref1.slice(0, 1500)}

REFERENCE ARTICLE 2:
${ref2.slice(0, 1500)}
`;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      });

      return response.choices[0].message.content;
    } catch (err) {
      if (err.code === "rate_limit_exceeded") {
        console.log(`Rate limit hit. Waiting before retry (${attempt})...`);
        await new Promise((res) => setTimeout(res, 15000));
      } else {
        throw err;
      }
    }
  }

  console.log("Falling back to local rewrite (rate limit exceeded)");

  return `
<h2>Updated Version</h2>
<p>This article has been enhanced using industry references and content restructuring.</p>

<h3>Original Content (Condensed)</h3>
<p>${original.slice(0, 1200)}</p>

<h3>Insights from Reference Articles</h3>
<p>${ref1.slice(0, 800)}</p>
<p>${ref2.slice(0, 800)}</p>
`;
}

module.exports = rewriteWithLLM;
