import express from 'express';
import { getArticlesByJournalist } from '../controllers/journalistController.js';

const journalistRouter = express.Router();

journalistRouter.get("/:id/articles", getArticlesByJournalist)

export default journalistRouter;