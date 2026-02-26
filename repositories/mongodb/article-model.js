const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  content: {
    type: String,
    required: true,
    minlength: 20,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
}, {
  timestamps: true, // به‌طور خودکار createdAt و updatedAt می‌سازه
});

module.exports = mongoose.model('Article', articleSchema);