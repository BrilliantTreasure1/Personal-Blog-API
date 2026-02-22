class Article{
    constructor(id , topic , content , author , date ) {
        this.id = id;
        this.topic = topic;
        this.content = content;
        this.author = author; 
        this.date = date
    }

    validate() {
        if (!this.topic?.trim()) { throw new Error('تاپیک وجود ندارد') };
        if (!this.content?.trim()) { throw new Error('محتوا وجود ندارد') };
        if (!this.author?.trim()) { throw new Error('نویسنده وجود ندارد') };
        if (!this.date?.trim()) { throw new Error('تاریخ نامعتبر') };
    }
}

module.exports = Article;