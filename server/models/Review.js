const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  title: String,
  url: String,
  summary: String,
  sentiment: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);