const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);

    res.send({ quote: randomQuote });
});

app.get('/api/quotes', (req, res, next) => {
    res.send({ quotes: quotes });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));