const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8000;
const ejs = require('ejs');
const path = require('path');

app.set('view engine', 'ejs');
app.use('/styles', express.static(path.join(__dirname, 'styles')));

app.get('/home', (req, res) => {
    res.render('home', { contactUrl: '/contact', aboutUrl: '/about' });
});

app.get('/about', (req, res) => {
  res.render('about', { currentYear: new Date().getFullYear() });
});

app.get('/contact', (req, res) => {
  res.render('contact', { contactEmail: 'info@example.com', contactPhone: '06 00 00 00 00' });
});

app.get('/form', (req, res) => {
  console.dir(req, { depth: null, color: true });
  res.render('form', { title: "Form Test", data: req.query });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});