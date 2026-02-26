const Article = require('./article-model');

class ArticleRepository {
  async save(articleData) {
    const article = new Article(articleData);
    return await article.save();
  }

  async findById(id) {
    return await Article.findById(id);
  }

  async findAll() {
    return await Article.find().sort({ date: -1 }); 
  }

  async updateById(id, updates) {
    return await Article.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );
  }

  async deleteById(id) {
    return await Article.findByIdAndDelete(id);
  }
}

module.exports = ArticleRepository;