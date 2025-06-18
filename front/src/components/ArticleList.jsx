import { useEffect, useState } from "react";
import { getArticles, removeArticle, getCategories, getArticlesByCategory, } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getArticles();
      setArticles(data);
    } catch (err) {
      setError("Failed to load articles. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error("Failed to load categories.");
    }
  };

  const handleCategoryChange = async (e) => {
    const catId = e.target.value;
    setSelectedCategory(catId);

    setIsLoading(true);
    setError("");

    try {
      if (!catId) {
        await fetchArticles(); // all articles
      } else {
        const data = await getArticlesByCategory(catId);
        setArticles(data);
      }
    } catch (err) {
      setError("Failed to load filtered articles.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteArticle = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      await removeArticle(id);
      await fetchArticles();
    } catch (err) {
      setError("Failed to delete article.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = (id) => navigate(`/articles/${id}`);
  const handleEdit = (id) => navigate(`/articles/${id}/edit`);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Category Filter Dropdown */}
      <div style={{ marginBottom: "1rem" }}>
        <label>Filter by Category: </label>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Article Cards */}
      <div className="article-list">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={deleteArticle}
          />
        ))}
      </div>
    </>
  );
}

function ArticleCard({ article, onView, onEdit, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="article-card">
      <div className="article-title">{article.title}</div>

      {/* Journalist */}
      <div className="article-author">
        {article.journalist ? (
          <>
            By{" "}
            <span
              onClick={() =>
                navigate(`/journalists/${article.journalist_id}/articles`)
              }
              style={{
                color: "gray",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.target.style.color = "blue")}
              onMouseLeave={(e) => (e.target.style.color = "gray")}
            >
              {article.journalist}
            </span>
          </>
        ) : (
          <span style={{ color: "gray" }}>By Unknown</span>
        )}

        <br />

      {/* Category */}
      <span className="article-category" style={{ color: "gray" }} >
        Category: {article.category || "Uncategorized"}
      </span>
      </div>

      {/* Buttons */}
      <div className="article-actions">
        <button className="button-tertiary" onClick={() => onEdit(article.id)}>
          Edit
        </button>
        <button className="button-tertiary" onClick={() => onDelete(article.id)}>
          Delete
        </button>
        <button className="button-secondary" onClick={() => onView(article.id)}>
          View
        </button>
      </div>
    </div>
  );
}
