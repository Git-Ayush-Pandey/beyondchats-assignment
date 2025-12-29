import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../api/articles";

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetchArticleById(id).then(res => setArticle(res.data));
  }, [id]);

  if (!article) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {article.references?.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold">References</h3>
          <ul className="list-disc ml-5">
            {article.references.map((ref, i) => (
              <li key={i}>
                <a href={ref} className="text-blue-600" target="_blank">
                  {ref}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
