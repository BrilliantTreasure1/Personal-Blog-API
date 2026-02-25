// src/controllers/article-controller.js
const CreateArticle = require('../use-cases/create-article');
const DeleteArticle = require('../use-cases/delete-article');
const UpdateArticle = require('../use-cases/update-article');
const GetArticleById = require('../use-cases/get-article-by-id');
const GetAllArticles = require('../use-cases/get-all-articles');
const ArticleRepository= require('../repositories/json/article-repository');

const createArticle = new CreateArticle(new ArticleRepository());
const deleteArticle = new DeleteArticle(new ArticleRepository());
const updateArticle = new UpdateArticle(new ArticleRepository());
const getArticleById = new GetArticleById(new ArticleRepository());
const getAllArticles = new GetAllArticles(new ArticleRepository());

module.exports = {
  async create(req, res) {
    const {topic , content , author , date} = req.body
    try {
      const article = await createArticle.execute({topic, content , author , date});
      res.status(201).json(article);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async remove(req, res) {   
    const { id } = req.params; 
    try {
      const result = await deleteArticle.execute({ id });
      res.status(200).json(result);
    } catch (err) {
      if (err.message.includes('not found')) {
        res.status(404).json({ error: err.message });
      } else {
        res.status(400).json({ error: err.message });
      }
    }
  },

  async update(req, res) {
  const { id } = req.params;
  const { topic, content, author, date } = req.body;

  try {
    const updatedArticle = await updateArticle.execute({
      id,
      topic,
      content,
      author,
      date,
    });

    res.status(200).json(updatedArticle);
  } catch (err) {
    if (err.message.includes('not found')) {
      res.status(404).json({ error: err.message });
    } else {
      res.status(400).json({ error: err.message });
    }
  }
},

async getById(req, res) {
  const { id } = req.params;

  try {
    const article = await getArticleById.execute({ id });
    res.status(200).json(article);
  } catch (err) {
    if (err.message.includes('not found')) {
      res.status(404).json({ error: err.message });
    } else {
      res.status(400).json({ error: err.message });
    }
  }
},

async list(req, res) {
  try {

    const articles = await getAllArticles.execute();

    res.status(200).json(articles);
  } catch (err) {
    console.error('Error fetching articles:', err);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
}

};