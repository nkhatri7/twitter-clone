const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoute = require('./routes/Auth');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoute);

app.get('/', (req, res) => {
  res.json('Hello');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
