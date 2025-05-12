const express = require('express');
const router = express.Router();
const db = require('../db');
//get albums 
router.get('/albums', async (req, res) => {
  try {
    const { orderBy = 'rank_score', orderDir = 'DESC', list = 1 } = req.query;

    // Explicit mapping to avoid ambiguity
    const fieldMapping = {
      rank_score: 'albums.rank_score',
      release_date: 'albums.release_date',
      name: 'albums.name', // If you later want artist name sorting, you could map that too
    };

    const allowedDirections = ['ASC', 'DESC'];
    const orderField = fieldMapping[orderBy] || 'albums.rank_score';
    const orderDirection = allowedDirections.includes(orderDir.toUpperCase()) ? orderDir.toUpperCase() : 'DESC';
    // Add list filter
    let listFilter = 'albums.rank_score IS NOT NULL AND albums.lists = 1';
    if(list==1){
      listFilter = 'albums.lists = 1';
    }
    if (list === '2') {
      listFilter = 'albums.lists = 2';
    }
    const [rows] = await db.query(` 
      SELECT 
        albums.rank_score,
        albums.name, 
        albums.link,
        albums.release_date,
        albums.cover_image_url,
        albums.description_text, 
        a.name AS artist_name,
        GROUP_CONCAT(genres.name ORDER BY genres.name SEPARATOR ', ') AS genre_names 
      FROM albums 
      JOIN artists a ON a.id = albums.artist_id 
      LEFT JOIN genre_map ON albums.id = genre_map.album_id 
      LEFT JOIN genres ON genres.id = genre_map.genre_id 
      WHERE ${listFilter}
      GROUP BY 
        albums.rank_score,
        albums.name,
        albums.link, 
        albums.release_date,
        albums.cover_image_url,
        albums.description_text, 
        a.name
      ORDER BY ${orderField} ${orderDirection}
    `);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch albums' });
  }
});

module.exports = router;
