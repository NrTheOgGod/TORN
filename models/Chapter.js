const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  mangaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Manga', required: true },
  chapterNumber: { type: Number, required: true },
  title: String,
  // Array of image paths in order: ['page1.jpg', 'page2.jpg']
  pages: [String], 
  // Path to the downloadable zip file
  downloadUrl: String, 
  releaseDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chapter', chapterSchema);