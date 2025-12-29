import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchArticles } from "../api/articles";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles()
      .then(setArticles)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center fw-bold">Articles</h1>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          {articles.length === 0 && (
            <p className="text-center text-muted">No articles found.</p>
          )}

          {articles.map((article) => (
            <div
              key={article._id}
              className="card mb-4 shadow-sm article-card"
              onClick={() => navigate(`/articles/${article._id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="card-body">
                <h5 className="card-title mb-2">
                  {article.title}
                </h5>

                {article.isUpdated && (
                  <span className="badge bg-success mb-2">
                    Updated
                  </span>
                )}

                <p className="text-muted mt-3 mb-0">
                  Click to read →
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
