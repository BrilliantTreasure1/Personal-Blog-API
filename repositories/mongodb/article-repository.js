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

  async findAllPaginated({ page = 1, limit = 10, sort = 'date-desc' } = {}) {
    const query = Article.find();

  // sorting
  if (sort === 'date-asc') {
    query.sort({ date: 1 });
  } else {
    query.sort({ date: -1 }); 
  }

  // pagination
  const skip = (page - 1) * limit;
  query.skip(skip).limit(limit);

  return await query.exec();
}

  async totalCountOfArticles() {
   return await Article.countDocuments();
 }
}

module.exports = ArticleRepository;