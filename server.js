const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const items = require('./routes/api/items');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Bodyparser Middleware
app.use(bodyParser.json());

// DB config
const uri = process.env.mongoURI;

// Connect to Mongo
mongoose
    .connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/items', items);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Server started on port ${port}`));
