class Article{
    constructor(id , topic , content , author , date ) {
        this.id = id;
        this.topic = topic;
        this.content = content;
        this.author = author; 
        this.date = date
    }

    validate() {
      // topic
        if (typeof this.topic !== 'string' || !this.topic.trim()) {
            throw new Error('Article title (topic) is required and must be a valid string');
        }
        if (this.topic.trim().length < 3) {
            throw new Error('Article title is too short (minimum 3 characters)');
        }

        // content
        if (typeof this.content !== 'string' || !this.content.trim()) {
            throw new Error('Article content is required and cannot be empty');
        }
        if (this.content.trim().length < 20) {
            throw new Error('Article content is too short (minimum 20 characters)');
        }

        // author
        if (typeof this.author !== 'string' || !this.author.trim()) {
            throw new Error('Author name is required and must be a valid string');
        }

        // date
        let parsedDate;

        if (this.date instanceof Date) {
            parsedDate = this.date;
        } else if (typeof this.date === 'string') {
            parsedDate = new Date(this.date);
        } else {
            throw new Error('Article date must be a valid string or Date object');
        }

        if (isNaN(parsedDate.getTime())) {
            throw new Error('Invalid date format (example: 2025-10-15 or ISO string)');
        }

        // Normalize date 
        this.date = parsedDate;
    }
}

module.exports = Article;