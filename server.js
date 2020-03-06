const express = require('express');

const S = require('./models/shortUrl');
const ShortUrls = S.m;

const app = express();

//'mongodb://localhost/urlShortener'

//below
const mongoose = require('mongoose');

const uri = 'mongodb://localhost/urlShortener';
// Prints "MongoError: bad auth Authentication failed."
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch(err => console.log('This is the reason : ', err));

//above

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  const shortUrls = await ShortUrls.find();
  res.render('index', { shortUrls: shortUrls });
  console.log('course: ', S.c.me.generate());
});

app.post('/shortUrls', async (req, res) => {
  await ShortUrls.create({ full: req.body.fullUrl });
});

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrls.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);
  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.full);
});

app.listen(process.env.PORT || 5000);
