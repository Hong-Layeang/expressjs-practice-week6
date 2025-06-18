import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticlesByJournalist } from "../services/api";

export default function JournalistArticles() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const data = await getArticlesByJournalist(id);
      setArticles(data);
    } catch (err) {
      setError("Failed to load articles.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const journalistName = articles.length > 0 ? articles[0].journalist : "Unknown";

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "steelblue" }}>{journalistName}</h2>

      <div className="article-list">
        {articles.map((article) => (
          <div key={article.id} className="article-card">
            <div className="article-title">{article.title}</div>
            <div className="article-author">
              By{" "}
              <span
                style={{
                  color: "gray",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() =>
                  navigate(`/journalists/${article.journalist_id}/articles`)
                }
              >
                {article.journalist}
              </span>
            </div>
            <div className="article-actions">
              <button
                className="button-secondary"
                onClick={() => navigate(`/articles/${article.id}`)}
              >
                VIEW
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
