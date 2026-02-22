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

}

module.exports = ArticleRepository;