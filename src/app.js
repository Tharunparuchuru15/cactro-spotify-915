const express = require('express');
const cors = require('cors');
const spotifyRouter = require('./routes/spotify');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/spotify', spotifyRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Spotify API Integration!' });
});

module.exports = app; 