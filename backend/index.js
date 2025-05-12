// index.js
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors()); // allow all origins (you can restrict later)
const albumRoutes = require('./routes/albums');

app.use(express.json());
app.use('/api', albumRoutes);    

app.get('/', (req, res) => {
    console.log('Root route hit');
    res.send('Server is live');
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));