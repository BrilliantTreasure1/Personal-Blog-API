const express = require('express');
const ArticleController = require('./controllers/article-controller');

const app = express();
app.use(express.json());

app.post('/articles', ArticleController.post);

app.listen(3000, () => console.log('Server running'));