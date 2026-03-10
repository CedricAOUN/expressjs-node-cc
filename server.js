const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8000;
const ejs = require('ejs');
const path = require('path');
const { formidable } = require('formidable');

const cfg = {
  dir: {
    uploads: path.join(__dirname, 'uploads'),
  },
}

app.set('view engine', 'ejs');
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use(express.urlencoded({ extended: true }));


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
  res.render('form', { title: "Form Test", data: req.query });
});

app.post('/form', (req, res, next) => {
  const data = {};
  const form = formidable({
    uploadDir: cfg.dir.uploads,
    keepExtensions: true,
  });
  form.parse(req, (err, fields, files) => {
    data.name = fields?.name[0];
    data.email = fields?.email[0];
    if (err) {
      next(err);
      return;
    }
    if (files && files.image && files.image[0] && files.image[0].size > 0) {
      const img = files.image[0];
      console.dir(files, { depth: null, color: true });
      data.filename = img.originalFilename;
      data.filetype = img.mimetype;
      data.filesize = Math.ceil(img.size / 1024) + 'KB';
      data.uploadto = img.filepath;
      data.imageurl = '/' + path.basename(img.filepath);
    }
    res.render('form', { title: 'Parse Form after image upload', data });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});