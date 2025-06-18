import * as sqlArticleRepository from "../repositories/sqlArticleRepository.js";

export async function getCategories(req, res) {
  try {
    const categories = await sqlArticleRepository.getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    res.status(500).json({ message: "Server error" });
  }
}