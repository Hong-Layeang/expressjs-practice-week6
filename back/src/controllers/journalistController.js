import * as sqlArticleRepository from "../repositories/sqlArticleRepository.js";

export async function getArticlesByJournalist(req, res) {
    try {
        const journalistId = req.params.id;
        const artcles = await sqlArticleRepository.getArticlesByJournalistId(journalistId);
        res.json(artcles);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "Server Error" });
    }
}