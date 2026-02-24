class DeleteArticleUseCase {
  constructor(articleRepository) {
    this.articleRepository = articleRepository;
  }

  async execute({ id }) {
    if (!id || typeof id !== 'string' || id.trim() === '') {
      throw new Error('Article ID is required and must be a non-empty string');
    }

    const deleted = await this.articleRepository.deleteById(id.trim());

    if (!deleted) {
      throw new Error('Article not found');
    }

    return {
      message: 'Article deleted successfully',
      id: deleted.id,          
    };
  }
}

module.exports = DeleteArticleUseCase;