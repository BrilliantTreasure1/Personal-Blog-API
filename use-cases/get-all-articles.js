class GetAllArticlesUseCase {
  constructor(articleRepository) {
    this.articleRepository = articleRepository;
  }

  async execute({ page = 1, limit = 10, sort = 'date-desc' } = {}) {
   
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit))); //max 50

    const articles = await this.articleRepository.findAllPaginated({
      page: pageNum,
      limit: limitNum,
      sort,
    });

    const total = await this.articleRepository.totalCountOfArticles();

    return {
      data: articles,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
        hasNext: pageNum * limitNum < total,
        hasPrev: pageNum > 1,
      },
    };
  }
}

module.exports = GetAllArticlesUseCase;