const mongoose = require('mongoose');

const mangaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  coverImage: String, // Path to public/uploads/covers/
  author: String,
  artist: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Manga', mangaSchema);