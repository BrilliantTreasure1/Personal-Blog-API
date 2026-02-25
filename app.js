const express = require('express');
const articleController = require('./controllers/article-controller');

const app = express();
app.use(express.json());

app.post('/articles', articleController.create);
app.delete('/articles/:id', articleController.remove);
app.put('/articles/:id', articleController.update);
app.get('/articles/:id', articleController.getById);
app.get('/articles', articleController.list);


app.listen(3000, () => console.log('Server running'));