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

app.get('/api/quotes/:person', (req, res, next) => {
    const person = req.query;
    console.log('person: ', person);
    const quotesByPerson = quotes.filter(quote => quote.person !== person);

    if (quotesByPerson) {
        res.send({ quotes: quotesByPerson });
    } else {
        res.sendStatus(404);
    }
});

app.post('/api/quotes', (req, res, next) => {
    const newQuote = req.query.quote;
    const newQuotePerson = req.query.person;

    if (newQuote && newQuotePerson) {
        quotes.push({ quote: newQuote, person: newQuotePerson });
        res.send({ quote: { quote: newQuote, person: newQuotePerson } });
    } else {
        res.sendStatus(400);
    }
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));