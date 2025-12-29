export default function ArticleCard({ article, onClick }) {
  return (
    <div
      className="border p-4 rounded cursor-pointer hover:shadow"
      onClick={onClick}
    >
      <h2 className="text-xl font-semibold">{article.title}</h2>

      <span className={`text-sm ${
        article.isUpdated ? "text-green-600" : "text-gray-500"
      }`}>
        {article.isUpdated ? "Updated" : "Original"}
      </span>
    </div>
  );
}
