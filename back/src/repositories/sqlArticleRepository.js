import { pool } from "../utils/database.js";
//
//  This repository shall:
//  - Connect to the database (using the pool provided by the database.js)
// -  Perfrom the SQL querries to implement the bellow API
//

// Get all articles
export async function getArticles() {
  const [rows] = await pool.query(`
    SELECT a.*, 
           j.name AS journalist, 
           j.id AS journalist_id,
           c.name AS category
    FROM articles a
    LEFT JOIN journalists j ON a.journalist_id = j.id
    LEFT JOIN categories c ON a.category_id = c.id
  `);
  return rows;
}

// Get one article by ID
export async function getArticleById(id) {
  const [rows] = await pool.query(`
    SELECT a.*, 
           j.name AS journalist, 
           j.id AS journalist_id,
           c.name AS category
    FROM articles a
    LEFT JOIN journalists j ON a.journalist_id = j.id
    LEFT JOIN categories c ON a.category_id = c.id
    WHERE a.id = ?
  `, [id]);
  return rows[0];
}

// Create a new article
export async function createArticle(article) {
    // TODO
  const { title, content, journalist, category } = article;
  const [result] = await pool.query(
    "INSERT INTO articles (title, content, journalist_id, category_id) VALUES (?, ?, ?, ?)",
    [title, content, journalist, category]
  );
    return { id: result.insertId, ...article };
}

// Update an article by ID
export async function updateArticle(id, updatedData) {
    // TODO
    const { title, content } = updatedData;
    const [result] = await pool.query("UPDATE articles SET title = ?, content = ? WHERE id = ?", [title, content, id]);
    return result.affectedRows > 0 ? { id, ...updatedData } : null;
}

// Delete an article by ID
export async function deleteArticle(id) {
    // TODO
    const [result] = await pool.query("DELETE FROM articles WHERE id = ?", [id]);
    return result.affectedRows > 0;
}

export async function getArticleWithJournalists() {
  const [rows] = await pool.query(`
    SELECT a.*, j.name AS journalist, j.email, j.bio
    FROM articles a
    JOIN journalists j ON a.journalist_id = j.id
  `);
  return rows;
}

export async function getArticlesByJournalistId(journalistId) {
  const [rows] = await pool.query(`
    SELECT a.*, j.name AS journalist
    FROM articles a
    JOIN journalists j ON a.journalist_id = j.id
    WHERE j.id = ?
  `, [journalistId]);
  return rows;
}

// Get all categories
export async function getAllCategories() {
  const [rows] = await pool.query("SELECT * FROM categories");
  return rows;
}

// Get articles by category ID
export async function getArticlesByCategoryId(categoryId) {
  const [rows] = await pool.query(`
    SELECT a.*, j.name AS journalist, c.name AS category
    FROM articles a
    JOIN journalists j ON a.journalist_id = j.id
    JOIN categories c ON a.category_id = c.id
    WHERE c.id = ?
  `, [categoryId]);
  return rows;
}
