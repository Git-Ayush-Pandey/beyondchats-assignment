import { useEffect, useState } from "react";
import { fetchArticles } from "../api/articles";
import ArticleCard from "../components/ArticleCard";
import { useNavigate } from "react-router-dom";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles().then(res => setArticles(res.data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      {articles.map(article => (
        <ArticleCard
          key={article._id}
          article={article}
          onClick={() => navigate(`/articles/${article._id}`)}
        />
      ))}
    </div>
  );
}
