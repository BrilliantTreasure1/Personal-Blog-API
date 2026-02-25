// src/repositories/article-repository.js
const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', '..', 'data', 'articles.json');

async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2), 'utf8');
  }
}

class ArticleRepository {
  async save(article) {
    await ensureDataFile();

    let articles = [];
    try {
      const data = await fs.readFile(DATA_FILE, 'utf8');
      articles = JSON.parse(data);
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
      articles = [];
    }

    if (!article.id) {
      article.id = Date.now().toString() + '-' + Math.random().toString(36).slice(2, 8);
    }

    articles.push(article);

    await fs.writeFile(DATA_FILE, JSON.stringify(articles, null, 2), 'utf8');

    console.log(`مقاله ذخیره شد: ${article.topic} (id: ${article.id})`);

    return article;
  }

  
async deleteById(id) {
    let articles = [];

    try {
      const data = await fs.readFile(DATA_FILE, 'utf8');
      articles = JSON.parse(data);
    } catch (err) {
      if (err.code === 'ENOENT') {
        throw new Error('No articles exist yet');
      }
      throw err;
    }

    const initialLength = articles.length;

    // Find the article to be deleted
    const articleIndex = articles.findIndex(article => article.id === id);
    
    if (articleIndex === -1) {
      throw new Error('Article with this ID not found');
    }

    // Remove and get the deleted article
    const deletedArticle = articles.splice(articleIndex, 1)[0];

    // Write updated list back to file
    await fs.writeFile(DATA_FILE, JSON.stringify(articles, null, 2), 'utf8');

    return deletedArticle;
  }

  async updateById(id, updates) {
  let articles = [];

  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    articles = JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error('No articles exist yet');
    }
    throw err;
  }

  const articleIndex = articles.findIndex(a => a.id === id);
  if (articleIndex === -1) {
    throw new Error('Article with this ID not found');
  }

  const updatedArticle = {
    ...articles[articleIndex],
    ...updates,
    updatedAt: new Date().toISOString(), 
  };

  articles[articleIndex] = updatedArticle;

  await fs.writeFile(DATA_FILE, JSON.stringify(articles, null, 2), 'utf8');

  return updatedArticle;
}

async findById(id) {
  let articles = [];

  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    articles = JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return null; 
    }
    throw err;
  }

  const article = articles.find(a => a.id === id);
  return article || null;
}

}

module.exports = ArticleRepository;