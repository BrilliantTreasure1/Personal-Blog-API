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

  async findAllPaginated({ page = 1, limit = 10, sort = 'date-desc' , filter = {} } = {}) {
    const query = Article.find();

  // filtering  
  if (filter.topic) {
    query.where('topic').regex(new RegExp(filter.topic, 'i')); // case-insensitive search
  }
  if (filter.author) {
    query.where('author').regex(new RegExp(filter.author, 'i'));
  }  

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

  async totalCountOfArticles(filter = {}) {
    const query = Article.find();

   if (filter.topic) {
     query.where('topic').regex(new RegExp(filter.topic, 'i'));
   }
    if (filter.author) {
      query.where('author').regex(new RegExp(filter.author, 'i'));
   }

    return await query.countDocuments();
}
}

module.exports = ArticleRepository;