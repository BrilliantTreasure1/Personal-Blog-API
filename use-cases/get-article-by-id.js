class GetArticleByIdUseCase {
  constructor(articleRepository) {
    this.articleRepository = articleRepository;
  }

  async execute({ id }) {
    if (!id || typeof id !== 'string' || id.trim() === '') {
      throw new Error('Article ID is required');
    }

    const article = await this.articleRepository.findById(id.trim());

    if (!article) {
      throw new Error('Article not found');
    }

    return article;
  }
}

module.exports = GetArticleByIdUseCase;