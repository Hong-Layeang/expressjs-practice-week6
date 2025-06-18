import { Router } from 'express';
import { getArticlesByCategory } from "../controllers/articleController.js";
import { getCategories } from "../controllers/categoryController.js";

const categoryRouter = Router();

categoryRouter.get("/:id", getArticlesByCategory);
categoryRouter.get("/", getCategories);

export default categoryRouter;