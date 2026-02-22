// src/controllers/UserController.js
const CreateArticle = require('../usecases/create-article');
const ArticleRepository= require('../repositories/json/article-repository');

const createArticle = new CreateArticle(new ArticleRepository());

module.exports = {
  async post(req, res) {
    const {topic , content , author , date} = req.body
    try {
      const article = await createArticle.execute({topic, content , author , date});
      res.status(201).json(article);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};