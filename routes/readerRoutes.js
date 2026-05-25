const express = require('express');
const router = express.Router();
const Manga = require('../models/Manga');
const Chapter = require('../models/Chapter');
const path = require('path');

// 1. HOME PAGE - Shows the Latest Releases hero banner
router.get('/', async (req, res) => {
  try {
    // Fetch chapters sorted by latest release date
    const latestChapters = await Chapter.find().sort({ releaseDate: -1 }).limit(5);
    
    // Fallback logic to grab the single latest item for your home hero layout panel
    const latestChapter = latestChapters[0] || null;
    
    res.render('home', { latestChapter });
  } catch (err) {
    res.status(500).send("Error loading home page");
  }
});

// 2. READ CHAPTERS PAGE - Index of all available chapters in a 4-column matrix
router.get('/chapters', async (req, res) => {
  try {
    const chapters = await Chapter.find().sort({ chapterNumber: 1 });
    res.render('manga', { chapters });
  } catch (err) {
    res.status(500).send("Error loading chapters list");
  }
});

// 3. READER PAGE - Webtoon/Comic reader view showing pages sequentially downwards
router.get('/read/ch/:num', async (req, res) => {
  try {
    const chapter = await Chapter.findOne({ chapterNumber: req.params.num });
    if (!chapter) return res.status(404).send("Chapter not found");
    
    res.render('reader', { chapter });
  } catch (err) {
    res.status(500).send("Error loading reader");
  }
});

// 4. DOWNLOAD ROUTE - Safely streams and downloads the zipped file bundle
router.get('/download/ch/:num', async (req, res) => {
  try {
    const chapter = await Chapter.findOne({ chapterNumber: req.params.num });
    if (!chapter || !chapter.downloadUrl) return res.status(404).send("Download unavailable");

    // Resolve absolute path to file inside your static public directory folder system
    const filePath = path.join(__dirname, '../public', chapter.downloadUrl);
    res.download(filePath, `TORN_Ch_${chapter.chapterNumber}.zip`);
  } catch (err) {
    res.status(500).send("Error processing download file pipeline");
  }
});

module.exports = router;