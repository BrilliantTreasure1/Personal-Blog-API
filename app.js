const express = require('express');
const articleController = require('./controllers/article-controller');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());

app.post('/articles', articleController.create);
app.delete('/articles/:id', articleController.remove);
app.put('/articles/:id', articleController.update);
app.get('/articles/:id', articleController.getById);
app.get('/articles', articleController.list);


connectDB()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to start server due to DB connection error');
  });