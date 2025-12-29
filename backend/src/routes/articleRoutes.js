const router = require("express").Router();
const ctrl = require("../controllers/articleController");

router.post("/", ctrl.createArticle);
router.get("/", ctrl.getArticles);
router.put("/:id", ctrl.updateArticle);
router.get("/:id", ctrl.getArticleById);

module.exports = router;
