const Article = require("../../models/Article");

async function publishUpdatedArticle(original, updatedContent, references) {
  return Article.create({
    title: original.title,
    content: `
${updatedContent}

<h3>References</h3>
<ul>
  ${references.map(r => `<li><a href="${r}">${r}</a></li>`).join("")}
</ul>
`,
    sourceUrl: original.sourceUrl,
    isUpdated: true,
    references,
  });
}

module.exports = publishUpdatedArticle;
