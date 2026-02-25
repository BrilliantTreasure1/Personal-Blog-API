class GetAllArticlesUseCase {
  constructor(articleRepository) {
    this.articleRepository = articleRepository;
  }

  async execute() {
    const articles = await this.articleRepository.findAll();
    return articles;
  }
}

module.exports = GetAllArticlesUseCase;