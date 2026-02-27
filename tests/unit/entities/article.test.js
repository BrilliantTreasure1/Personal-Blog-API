const Article = require('../../../entities/article');

describe('Article Entity', () => {
  const VALID_LONG_CONTENT =
    'This is a valid long content for testing purposes. ' +
    'It definitely exceeds the minimum 20 character requirement.';

  describe('validate()', () => {

    it('should throw when topic is missing or empty string', () => {
      expect(() => {
        new Article(null, '', VALID_LONG_CONTENT, 'Ali', new Date()).validate();
      }).toThrow('Article title (topic) is required and must be a valid string');
    });

    it('should throw when topic is only whitespace', () => {
      expect(() => {
        new Article(null, '   ', VALID_LONG_CONTENT, 'Ali', new Date()).validate();
      }).toThrow('Article title (topic) is required and must be a valid string');
    });

    it('should throw when topic length < 3 after trim', () => {
      expect(() => {
        new Article(null, 'ab', VALID_LONG_CONTENT, 'Ali', new Date()).validate();
      }).toThrow('Article title is too short (minimum 3 characters)');
    });

    it('should throw when content is missing or empty', () => {
      expect(() => {
        new Article(null, 'Valid Topic', '', 'Ali', new Date()).validate();
      }).toThrow('Article content is required and cannot be empty');
    });

    it('should throw when content is only whitespace', () => {
      expect(() => {
        new Article(null, 'Valid Topic', '   ', 'Ali', new Date()).validate();
      }).toThrow('Article content is required and cannot be empty');
    });

    it('should throw when content length < 20 after trim', () => {
      expect(() => {
        new Article(null, 'Valid Topic', 'short content', 'Ali', new Date()).validate();
      }).toThrow('Article content is too short (minimum 20 characters)');
    });

    it('should throw when author is missing or empty', () => {
      expect(() => {
        new Article(null, 'Valid Topic', VALID_LONG_CONTENT, '', new Date()).validate();
      }).toThrow('Author name is required and must be a valid string');
    });

    it('should throw when author is only whitespace', () => {
      expect(() => {
        new Article(null, 'Valid Topic', VALID_LONG_CONTENT, '   ', new Date()).validate();
      }).toThrow('Author name is required and must be a valid string');
    });

    it('should throw when date is neither string nor Date', () => {
      expect(() => {
        new Article(null, 'Valid Topic', VALID_LONG_CONTENT, 'Ali', 12345).validate();
      }).toThrow('Article date must be a valid string or Date object');
    });

    it('should throw when date string is invalid', () => {
      expect(() => {
        new Article(null, 'Valid Topic', VALID_LONG_CONTENT, 'Ali', 'invalid-date').validate();
      }).toThrow('Invalid date format');
    });

    // ────────────────────────────────────────────────
    // تست‌های موفقیت (positive cases)
    // ────────────────────────────────────────────────

    it('should accept valid input and normalize date from string', () => {
      const article = new Article(
        null,
        'Valid Topic',
        VALID_LONG_CONTENT,
        'Ali',
        '2025-10-15'
      );

      expect(() => article.validate()).not.toThrow();
      expect(article.date instanceof Date).toBe(true);
      expect(article.date.toISOString().startsWith('2025-10-15')).toBe(true);
    });

    it('should accept Date object directly without changing it', () => {
      const originalDate = new Date('2025-10-15T10:00:00Z');
      const article = new Article(
        null,
        'Valid Topic',
        VALID_LONG_CONTENT,
        'Ali',
        originalDate
      );

      expect(() => article.validate()).not.toThrow();
      expect(article.date).toBe(originalDate); // همان شیء بدون تغییر
      expect(article.date instanceof Date).toBe(true);
    });

    it('should trim all string fields correctly', () => {
      const article = new Article(
        null,
        'Valid Topic with spaces',
        VALID_LONG_CONTENT,
        'Ali',
        new Date()
      );

      expect(() => article.validate()).not.toThrow();

      expect(article.topic).toBe('Valid Topic with spaces');
      expect(article.topic.startsWith(' ')).toBe(false);
      expect(article.topic.endsWith(' ')).toBe(false);

      expect(article.content.startsWith(' ')).toBe(false);
      expect(article.content.endsWith(' ')).toBe(false);

      expect(article.author).toBe('Ali');
      expect(article.author.startsWith(' ')).toBe(false);
    });

    it('should not throw for minimum valid lengths', () => {
      const minTopic = 'abc'; // دقیقاً 3 کاراکتر
      const minContent = 'This content is exactly 20 chars long'; // دقیقاً 20 کاراکتر

      const article = new Article(null, minTopic, minContent, 'Ali', new Date());

      expect(() => article.validate()).not.toThrow();
    });
  });
});