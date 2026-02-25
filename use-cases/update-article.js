class UpdateArticleUseCase {
  constructor(articleRepository) {
    this.articleRepository = articleRepository;
  }

  async execute({ id, topic, content, author, date }) {
    if (!id || typeof id !== 'string' || id.trim() === '') {
      throw new Error('Article ID is required');
    }

    const updates = {};
    if (topic !== undefined) updates.topic = topic.trim();
    if (content !== undefined) updates.content = content.trim();
    if (author !== undefined) updates.author = author.trim();
    if (date !== undefined) updates.date = new Date(date);

    if (updates.topic && updates.topic.length < 3) {
      throw new Error('Topic must be at least 3 characters');
    }
    if (updates.content && updates.content.length < 20) {
      throw new Error('Content must be at least 20 characters');
    }

    const updated = await this.articleRepository.updateById(id.trim(), updates);

    return updated;
  }
}

module.exports = UpdateArticleUseCase;