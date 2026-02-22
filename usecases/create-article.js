const Article = require('../entities/article');

class CreateArticle {
    constructor(articleRepository){
        this.articleRepository = articleRepository
    }

    async execute({topic , content , author , date}) {
        const article = new Article(null , topic , content , author , date)   
        article.validate()

    try {

      const savedArticle = await this.articleRepository.save(article);
      return savedArticle;

    } catch (err) {
      throw new Error(`خطا در ذخیره مقاله: ${err.message}`);
    }    
    
    }
}

module.exports = CreateArticle;