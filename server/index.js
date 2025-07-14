const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // <- CORS header
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Import routes
const newsRoutes = require('./routes/news');
const reviewRoutes = require('./routes/reviews');
app.use('/api/news', newsRoutes);
app.use('/api/reviews', reviewRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  }))
  .catch(err => console.log(err));